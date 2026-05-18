"use client";

export interface CallState {
  status: "idle" | "ringing" | "connecting" | "active" | "ended";
  isMuted: boolean;
  isSpeaker: boolean;
  isOnHold: boolean;
  duration: number;
  remoteNumber?: string;
}

export class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;
  private onStateChange: (state: Partial<CallState>) => void;
  private durationInterval: ReturnType<typeof setInterval> | null = null;
  private duration = 0;

  constructor(onStateChange: (state: Partial<CallState>) => void) {
    this.onStateChange = onStateChange;
  }

  async startCall(remoteNumber: string): Promise<void> {
    try {
      this.onStateChange({ status: "ringing", remoteNumber });

      this.localStream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const config: RTCConfiguration = {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ],
      };

      this.peerConnection = new RTCPeerConnection(config);

      this.localStream.getTracks().forEach((track) => {
        this.peerConnection!.addTrack(track, this.localStream!);
      });

      this.peerConnection.ontrack = (event) => {
        this.remoteStream = event.streams[0];
      };

      this.peerConnection.oniceconnectionstatechange = () => {
        const state = this.peerConnection?.iceConnectionState;
        if (state === "connected") {
          this.onStateChange({ status: "active" });
          this.startDurationTimer();
        } else if (state === "disconnected" || state === "failed") {
          this.endCall();
        }
      };

      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);

      // Simulate connection (in production: send offer via signaling server)
      setTimeout(() => {
        this.onStateChange({ status: "connecting" });
        setTimeout(() => {
          this.onStateChange({ status: "active" });
          this.startDurationTimer();
        }, 1500);
      }, 2000);
    } catch (error) {
      console.error("Call start error:", error);
      this.onStateChange({ status: "ended" });
    }
  }

  toggleMute(): boolean {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        return !audioTrack.enabled;
      }
    }
    return false;
  }

  toggleHold(): void {
    // In production: send hold signal via signaling server
  }

  endCall(): void {
    this.stopDurationTimer();

    if (this.localStream) {
      this.localStream.getTracks().forEach((t) => t.stop());
      this.localStream = null;
    }

    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }

    this.remoteStream = null;
    this.duration = 0;
    this.onStateChange({ status: "ended", duration: 0 });
  }

  private startDurationTimer(): void {
    this.duration = 0;
    this.durationInterval = setInterval(() => {
      this.duration++;
      this.onStateChange({ duration: this.duration });
    }, 1000);
  }

  private stopDurationTimer(): void {
    if (this.durationInterval) {
      clearInterval(this.durationInterval);
      this.durationInterval = null;
    }
  }

  getRemoteStream(): MediaStream | null {
    return this.remoteStream;
  }
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
