"use client";
import { useState } from "react";
import {
  FiPhone, FiPhoneIncoming, FiPhoneOutgoing, FiPhoneMissed, FiPhoneOff,
  FiMic, FiMicOff, FiVolume2, FiVolumeX, FiSettings, FiPlay, FiPause,
  FiUser, FiClock, FiArrowRight, FiPlus, FiTrash2, FiEdit2, FiSave,
  FiX, FiCheckCircle, FiAlertCircle, FiHeadphones, FiZap
} from "react-icons/fi";
import { FaRobot, FaWhatsapp } from "react-icons/fa";

type CallStatus = "ringing" | "in_progress" | "on_hold" | "completed" | "missed" | "failed" | "forwarded" | "ai_handled";

interface VoiceCall {
  id: string;
  contactName: string;
  contactPhone: string;
  contactAvatar: string;
  direction: "inbound" | "outbound";
  status: CallStatus;
  duration: number;
  agentName?: string;
  aiHandled: boolean;
  aiTranscript?: string;
  forwardedTo?: string;
  startedAt: string;
}

interface RoutingRule {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  priority: number;
  condition: string;
  action: string;
  targetNumber?: string;
  aiGreeting?: string;
  maxWaitTime: number;
}

interface AIVoiceSettings {
  isEnabled: boolean;
  voiceModel: string;
  language: string;
  greeting: string;
  personality: string;
  fallbackAction: string;
  maxCallDuration: number;
}

const mockCalls: VoiceCall[] = [
  { id: "1", contactName: "Ali Veli", contactPhone: "+90 535 111 2233", contactAvatar: "", direction: "inbound", status: "completed", duration: 180, agentName: "Çağlayan Kurtoğlu", aiHandled: false, startedAt: "2026-05-11 10:30" },
  { id: "2", contactName: "Zeynep Aksoy", contactPhone: "+90 538 444 5566", contactAvatar: "", direction: "inbound", status: "completed", duration: 120, aiHandled: true, aiTranscript: "Müşteri kargo durumunu sordu. AI asistan kargo takip numarasını ve tahmini teslimat tarihini paylaştı.", startedAt: "2026-05-11 11:15" },
  { id: "3", contactName: "Fatma Kaya", contactPhone: "+90 536 222 3344", contactAvatar: "", direction: "outbound", status: "completed", duration: 90, agentName: "Ayşe Yılmaz", aiHandled: false, startedAt: "2026-05-11 12:00" },
  { id: "4", contactName: "Elif Şahin", contactPhone: "+90 540 666 7788", contactAvatar: "", direction: "inbound", status: "completed", duration: 60, aiHandled: true, aiTranscript: "Müşteri fiyat bilgisi istedi. AI asistan güncel fiyat listesini paylaştı ve insan temsilciye yönlendirdi.", startedAt: "2026-05-11 14:00" },
  { id: "5", contactName: "Ahmet Özkan", contactPhone: "+90 537 333 4455", contactAvatar: "", direction: "inbound", status: "missed", duration: 0, aiHandled: false, startedAt: "2026-05-11 15:30" },
];

const mockRoutingRules: RoutingRule[] = [
  { id: "1", name: "Mesai Saatleri - Temsilciye Yönlendir", description: "Mesai saatlerinde gelen aramaları temsilciye yönlendir", isActive: true, priority: 10, condition: "business_hours", action: "ring_agent", maxWaitTime: 30 },
  { id: "2", name: "Mesai Dışı - AI Asistan", description: "Mesai dışında AI asistan devreye girsin", isActive: true, priority: 20, condition: "after_hours", action: "ai_assistant", aiGreeting: "Merhaba! Şu an mesai saatleri dışındayız. Ben AIZEN yapay zeka asistanıyım.", maxWaitTime: 30 },
  { id: "3", name: "Meşgul - Farklı Numaraya Yönlendir", description: "Tüm temsilciler meşgulse farklı numaraya yönlendir", isActive: true, priority: 5, condition: "busy", action: "forward_number", targetNumber: "+90 533 555 0002", maxWaitTime: 30 },
  { id: "4", name: "Cevapsız - Sesli Mesaj", description: "Cevap verilmezse sesli mesaj bıraktır", isActive: true, priority: 1, condition: "no_answer", action: "voicemail", maxWaitTime: 45 },
];

const mockAISettings: AIVoiceSettings = {
  isEnabled: true,
  voiceModel: "nova",
  language: "tr-TR",
  greeting: "Merhaba! AIZEN Chat yapay zeka asistanına hoş geldiniz. Size nasıl yardımcı olabilirim?",
  personality: "friendly",
  fallbackAction: "transfer_agent",
  maxCallDuration: 300,
};

export default function SesliDestekPage() {
  const [activeTab, setActiveTab] = useState<"calls" | "live" | "routing" | "ai-settings">("calls");
  const [calls] = useState<VoiceCall[]>(mockCalls);
  const [routingRules, setRoutingRules] = useState<RoutingRule[]>(mockRoutingRules);
  const [aiSettings, setAISettings] = useState<AIVoiceSettings>(mockAISettings);
  const [selectedCall, setSelectedCall] = useState<VoiceCall | null>(null);
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callTimer, setCallTimer] = useState(0);
  const [editingRule, setEditingRule] = useState<string | null>(null);
  const [showNewRule, setShowNewRule] = useState(false);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusColor = (status: CallStatus) => {
    const colors: Record<CallStatus, string> = {
      ringing: "text-yellow-400 bg-yellow-500/10",
      in_progress: "text-green-400 bg-green-500/10",
      on_hold: "text-orange-400 bg-orange-500/10",
      completed: "text-blue-400 bg-blue-500/10",
      missed: "text-red-400 bg-red-500/10",
      failed: "text-red-400 bg-red-500/10",
      forwarded: "text-purple-400 bg-purple-500/10",
      ai_handled: "text-cyan-400 bg-cyan-500/10",
    };
    return colors[status];
  };

  const getStatusLabel = (status: CallStatus) => {
    const labels: Record<CallStatus, string> = {
      ringing: "Çalıyor",
      in_progress: "Görüşmede",
      on_hold: "Beklemede",
      completed: "Tamamlandı",
      missed: "Cevapsız",
      failed: "Başarısız",
      forwarded: "Yönlendirildi",
      ai_handled: "AI Yanıtladı",
    };
    return labels[status];
  };

  const getConditionLabel = (condition: string) => {
    const labels: Record<string, string> = {
      all: "Her Zaman",
      business_hours: "Mesai Saatleri",
      after_hours: "Mesai Dışı",
      busy: "Meşgul",
      no_answer: "Cevapsız",
    };
    return labels[condition] || condition;
  };

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      ring_agent: "Temsilciye Yönlendir",
      forward_number: "Numaraya Yönlendir",
      ai_assistant: "AI Asistan",
      voicemail: "Sesli Mesaj",
      queue: "Sıraya Al",
    };
    return labels[action] || action;
  };

  const startCall = () => {
    setIsInCall(true);
    setCallTimer(0);
    const interval = setInterval(() => setCallTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  };

  const endCall = () => {
    setIsInCall(false);
    setCallTimer(0);
  };

  const tabs = [
    { id: "calls" as const, label: "Arama Geçmişi", icon: FiPhone },
    { id: "live" as const, label: "Canlı Destek", icon: FiHeadphones },
    { id: "routing" as const, label: "Yönlendirme", icon: FiArrowRight },
    { id: "ai-settings" as const, label: "AI Ses Ayarları", icon: FaRobot },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sesli Destek</h1>
          <p className="text-gray-400 text-sm mt-1">Sesli aramalar, canlı destek ve AI ses asistanı</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-sm">AI Asistan Aktif</span>
          </div>
          <button onClick={startCall} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <FiPhone size={16} />
            <span>Yeni Arama</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Toplam Arama", value: "47", icon: FiPhone, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "AI Yanıtlanan", value: "18", icon: FaRobot, color: "text-cyan-400", bg: "bg-cyan-500/10" },
          { label: "Cevapsız", value: "3", icon: FiPhoneMissed, color: "text-red-400", bg: "bg-red-500/10" },
          { label: "Ort. Süre", value: "3:24", icon: FiClock, color: "text-yellow-400", bg: "bg-yellow-500/10" },
          { label: "Yönlendirilen", value: "8", icon: FiArrowRight, color: "text-purple-400", bg: "bg-purple-500/10" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#1e1e2e] rounded-xl p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">{stat.label}</span>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={stat.color} size={16} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#1e1e2e] p-1 rounded-xl border border-gray-800 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${
              activeTab === tab.id ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Call Banner */}
      {isInCall && (
        <div className="bg-gradient-to-r from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                <FiPhone className="text-green-400" size={24} />
              </div>
              <div>
                <p className="text-white font-medium">Aktif Görüşme</p>
                <p className="text-green-400 text-sm">{formatDuration(callTimer)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsMuted(!isMuted)} className={`p-3 rounded-full ${isMuted ? "bg-red-500/20 text-red-400" : "bg-gray-700 text-white"}`}>
                {isMuted ? <FiMicOff size={18} /> : <FiMic size={18} />}
              </button>
              <button onClick={() => setIsSpeakerOn(!isSpeakerOn)} className={`p-3 rounded-full ${!isSpeakerOn ? "bg-red-500/20 text-red-400" : "bg-gray-700 text-white"}`}>
                {isSpeakerOn ? <FiVolume2 size={18} /> : <FiVolumeX size={18} />}
              </button>
              <button className="p-3 rounded-full bg-gray-700 text-yellow-400">
                <FiPause size={18} />
              </button>
              <button className="p-3 rounded-full bg-gray-700 text-purple-400">
                <FiArrowRight size={18} />
              </button>
              <button onClick={endCall} className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700">
                <FiPhoneOff size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === "calls" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#1e1e2e] rounded-xl border border-gray-800 overflow-hidden">
            <div className="p-4 border-b border-gray-800">
              <h3 className="text-white font-medium">Arama Geçmişi</h3>
            </div>
            <div className="divide-y divide-gray-800">
              {calls.map((call) => (
                <button key={call.id} onClick={() => setSelectedCall(call)} className={`w-full p-4 flex items-center gap-4 hover:bg-gray-800/50 transition text-left ${selectedCall?.id === call.id ? "bg-gray-800/50" : ""}`}>
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    {call.aiHandled ? <FaRobot className="text-cyan-400" size={18} /> : <FiUser className="text-gray-400" size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium truncate">{call.contactName}</p>
                      {call.aiHandled && <span className="text-xs px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded-full">AI</span>}
                    </div>
                    <p className="text-gray-500 text-sm">{call.contactPhone}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      {call.direction === "inbound" ? <FiPhoneIncoming className="text-green-400" size={14} /> : <FiPhoneOutgoing className="text-blue-400" size={14} />}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(call.status)}`}>{getStatusLabel(call.status)}</span>
                    </div>
                    <p className="text-gray-500 text-xs">{call.duration > 0 ? formatDuration(call.duration) : "-"}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Call Detail */}
          <div className="bg-[#1e1e2e] rounded-xl border border-gray-800 p-4">
            {selectedCall ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-3">
                    {selectedCall.aiHandled ? <FaRobot className="text-cyan-400" size={28} /> : <FiUser className="text-gray-400" size={28} />}
                  </div>
                  <h3 className="text-white font-medium">{selectedCall.contactName}</h3>
                  <p className="text-gray-400 text-sm">{selectedCall.contactPhone}</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">Yön</span><span className="text-white">{selectedCall.direction === "inbound" ? "Gelen" : "Giden"}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Durum</span><span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(selectedCall.status)}`}>{getStatusLabel(selectedCall.status)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Süre</span><span className="text-white">{formatDuration(selectedCall.duration)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Tarih</span><span className="text-white">{selectedCall.startedAt}</span></div>
                  {selectedCall.agentName && <div className="flex justify-between"><span className="text-gray-400">Temsilci</span><span className="text-white">{selectedCall.agentName}</span></div>}
                  {selectedCall.forwardedTo && <div className="flex justify-between"><span className="text-gray-400">Yönlendirme</span><span className="text-purple-400">{selectedCall.forwardedTo}</span></div>}
                </div>
                {selectedCall.aiTranscript && (
                  <div className="mt-4 p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FaRobot className="text-cyan-400" size={14} />
                      <span className="text-cyan-400 text-sm font-medium">AI Transkript</span>
                    </div>
                    <p className="text-gray-300 text-sm">{selectedCall.aiTranscript}</p>
                  </div>
                )}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                    <FiPhone size={14} /> Geri Ara
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                    <FaWhatsapp size={14} /> Mesaj
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <FiPhone size={48} className="mb-4 opacity-30" />
                <p>Detay görmek için bir arama seçin</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "live" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Call Interface */}
          <div className="bg-[#1e1e2e] rounded-xl border border-gray-800 p-6">
            <h3 className="text-white font-medium mb-6">Canlı Sesli Destek</h3>
            <div className="flex flex-col items-center space-y-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-600/20 border-2 border-purple-500/30 flex items-center justify-center">
                <FiHeadphones className="text-purple-400" size={48} />
              </div>
              <div className="text-center">
                <p className="text-white text-lg font-medium">Sesli Destek Hazır</p>
                <p className="text-gray-400 text-sm mt-1">Müşteriler sizi arayabilir veya AI asistan devreye girebilir</p>
              </div>
              <div className="flex gap-4">
                <button onClick={startCall} className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
                  <FiPhone size={20} />
                  <span>Arama Başlat</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition">
                  <FaRobot size={20} />
                  <span>AI Test Et</span>
                </button>
              </div>
              <div className="w-full space-y-3 mt-6">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-400 text-sm">WebRTC Durumu</span>
                  <span className="flex items-center gap-1 text-green-400 text-sm"><FiCheckCircle size={14} /> Bağlı</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-400 text-sm">Mikrofon</span>
                  <span className="flex items-center gap-1 text-green-400 text-sm"><FiMic size={14} /> Hazır</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-400 text-sm">AI Ses Motoru</span>
                  <span className="flex items-center gap-1 text-cyan-400 text-sm"><FaRobot size={14} /> Nova (TR)</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Conversation Log */}
          <div className="bg-[#1e1e2e] rounded-xl border border-gray-800 p-6">
            <h3 className="text-white font-medium mb-4">AI Sesli Asistan Konuşma Günlüğü</h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {[
                { role: "ai", text: "Merhaba! AIZEN Chat yapay zeka asistanına hoş geldiniz. Size nasıl yardımcı olabilirim?", time: "14:00:01" },
                { role: "customer", text: "Merhaba, siparişim ne zaman gelecek?", time: "14:00:05" },
                { role: "ai", text: "Sipariş takip numaranızı paylaşır mısınız? Hemen kontrol edeyim.", time: "14:00:07" },
                { role: "customer", text: "TR987654321 numaralı siparişim var", time: "14:00:12" },
                { role: "ai", text: "TR987654321 numaralı siparişiniz şu an kargoda. Yurtiçi Kargo ile gönderilmiş olup tahmini teslimat tarihi 15 Mayıs 2026. Başka bir konuda yardımcı olabilir miyim?", time: "14:00:15" },
                { role: "customer", text: "Teşekkür ederim, başka bir şey yok", time: "14:00:20" },
                { role: "ai", text: "Rica ederim! İyi günler dilerim. Görüşmek üzere!", time: "14:00:22" },
                { role: "system", text: "Görüşme tamamlandı. Süre: 22 saniye. Müşteri memnuniyeti: Yüksek", time: "14:00:23" },
              ].map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "customer" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === "ai" ? "bg-cyan-500/20" : msg.role === "customer" ? "bg-purple-500/20" : "bg-gray-700"
                  }`}>
                    {msg.role === "ai" ? <FaRobot className="text-cyan-400" size={14} /> : msg.role === "customer" ? <FiUser className="text-purple-400" size={14} /> : <FiZap className="text-gray-400" size={14} />}
                  </div>
                  <div className={`max-w-[80%] ${msg.role === "customer" ? "text-right" : ""}`}>
                    <div className={`inline-block p-3 rounded-xl text-sm ${
                      msg.role === "ai" ? "bg-cyan-500/10 text-gray-200 border border-cyan-500/20" :
                      msg.role === "customer" ? "bg-purple-600/20 text-gray-200 border border-purple-500/20" :
                      "bg-gray-700/50 text-gray-400 border border-gray-700"
                    }`}>
                      {msg.text}
                    </div>
                    <p className="text-gray-600 text-xs mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "routing" && (
        <div className="bg-[#1e1e2e] rounded-xl border border-gray-800">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Çağrı Yönlendirme Kuralları</h3>
              <p className="text-gray-500 text-sm mt-1">Gelen aramaları koşullara göre yönlendirin</p>
            </div>
            <button onClick={() => setShowNewRule(true)} className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
              <FiPlus size={14} /> Yeni Kural
            </button>
          </div>
          <div className="p-4 space-y-3">
            {routingRules.sort((a, b) => b.priority - a.priority).map((rule) => (
              <div key={rule.id} className={`p-4 rounded-xl border transition ${rule.isActive ? "bg-gray-800/30 border-gray-700" : "bg-gray-800/10 border-gray-800 opacity-50"}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${rule.isActive ? "bg-green-400" : "bg-gray-600"}`} />
                    <h4 className="text-white font-medium">{rule.name}</h4>
                    <span className="text-xs px-2 py-0.5 bg-gray-700 text-gray-400 rounded-full">Öncelik: {rule.priority}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRoutingRules(routingRules.map((r) => r.id === rule.id ? { ...r, isActive: !r.isActive } : r))}
                      className={`relative w-10 h-5 rounded-full transition ${rule.isActive ? "bg-green-600" : "bg-gray-700"}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${rule.isActive ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                    <button onClick={() => setEditingRule(rule.id)} className="p-1.5 text-gray-400 hover:text-white"><FiEdit2 size={14} /></button>
                    <button className="p-1.5 text-gray-400 hover:text-red-400"><FiTrash2 size={14} /></button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-3">{rule.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-500">Koşul:</span>
                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full text-xs">{getConditionLabel(rule.condition)}</span>
                  </div>
                  <FiArrowRight className="text-gray-600" size={14} />
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-500">Aksiyon:</span>
                    <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-full text-xs">{getActionLabel(rule.action)}</span>
                  </div>
                  {rule.targetNumber && (
                    <span className="text-gray-400 text-xs">→ {rule.targetNumber}</span>
                  )}
                  <div className="flex items-center gap-1.5 ml-auto">
                    <FiClock className="text-gray-500" size={12} />
                    <span className="text-gray-500 text-xs">Maks bekleme: {rule.maxWaitTime}sn</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "ai-settings" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#1e1e2e] rounded-xl border border-gray-800 p-6">
            <h3 className="text-white font-medium mb-6">AI Ses Asistanı Ayarları</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                <div>
                  <p className="text-white font-medium">AI Ses Asistanı</p>
                  <p className="text-gray-400 text-sm">Otomatik sesli müşteri desteği</p>
                </div>
                <button
                  onClick={() => setAISettings({ ...aiSettings, isEnabled: !aiSettings.isEnabled })}
                  className={`relative w-12 h-6 rounded-full transition ${aiSettings.isEnabled ? "bg-green-600" : "bg-gray-700"}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${aiSettings.isEnabled ? "translate-x-6" : "translate-x-0.5"}`} />
                </button>
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Ses Modeli</label>
                <select
                  value={aiSettings.voiceModel}
                  onChange={(e) => setAISettings({ ...aiSettings, voiceModel: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="alloy">Alloy (Nötr)</option>
                  <option value="echo">Echo (Erkek)</option>
                  <option value="fable">Fable (İngiliz)</option>
                  <option value="onyx">Onyx (Derin)</option>
                  <option value="nova">Nova (Kadın)</option>
                  <option value="shimmer">Shimmer (Yumuşak)</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Dil</label>
                <select
                  value={aiSettings.language}
                  onChange={(e) => setAISettings({ ...aiSettings, language: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="tr-TR">Türkçe</option>
                  <option value="en-US">İngilizce (ABD)</option>
                  <option value="de-DE">Almanca</option>
                  <option value="fr-FR">Fransızca</option>
                  <option value="ar-SA">Arapça</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Kişilik</label>
                <select
                  value={aiSettings.personality}
                  onChange={(e) => setAISettings({ ...aiSettings, personality: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="professional">Profesyonel</option>
                  <option value="friendly">Samimi</option>
                  <option value="formal">Resmi</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Karşılama Mesajı</label>
                <textarea
                  value={aiSettings.greeting}
                  onChange={(e) => setAISettings({ ...aiSettings, greeting: e.target.value })}
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm resize-none"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Geri Dönüş Aksiyonu</label>
                <select
                  value={aiSettings.fallbackAction}
                  onChange={(e) => setAISettings({ ...aiSettings, fallbackAction: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="transfer_agent">İnsan Temsilciye Aktar</option>
                  <option value="take_message">Mesaj Al</option>
                  <option value="end_call">Görüşmeyi Sonlandır</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">Maks. Görüşme Süresi (saniye)</label>
                <input
                  type="number"
                  value={aiSettings.maxCallDuration}
                  onChange={(e) => setAISettings({ ...aiSettings, maxCallDuration: parseInt(e.target.value) || 300 })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                />
              </div>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <FiSave size={16} /> Ayarları Kaydet
              </button>
            </div>
          </div>

          {/* AI Capabilities */}
          <div className="space-y-6">
            <div className="bg-[#1e1e2e] rounded-xl border border-gray-800 p-6">
              <h3 className="text-white font-medium mb-4">AI Ses Yetenekleri</h3>
              <div className="space-y-3">
                {[
                  { icon: FiMic, label: "Konuşma Tanıma (STT)", desc: "Müşterinin sesini metne çevirir", active: true },
                  { icon: FiVolume2, label: "Metin-Ses (TTS)", desc: "AI cevaplarını sesli olarak söyler", active: true },
                  { icon: FaRobot, label: "Doğal Dil İşleme", desc: "Müşterinin niyetini anlar", active: true },
                  { icon: FiZap, label: "Gerçek Zamanlı Yanıt", desc: "Anlık AI yanıtları üretir", active: true },
                  { icon: FiArrowRight, label: "Akıllı Yönlendirme", desc: "Gerektiğinde insan temsilciye aktarır", active: true },
                  { icon: FiSettings, label: "Bilgi Tabanı", desc: "Şirket bilgilerini kullanarak cevaplar", active: true },
                ].map((cap) => (
                  <div key={cap.label} className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                      <cap.icon className="text-cyan-400" size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{cap.label}</p>
                      <p className="text-gray-500 text-xs">{cap.desc}</p>
                    </div>
                    <FiCheckCircle className={cap.active ? "text-green-400" : "text-gray-600"} size={16} />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1e1e2e] rounded-xl border border-gray-800 p-6">
              <h3 className="text-white font-medium mb-4">AI Performans İstatistikleri</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Toplam AI Arama", value: "18" },
                  { label: "Başarılı Çözüm", value: "%89" },
                  { label: "Ort. Süre", value: "45sn" },
                  { label: "Memnuniyet", value: "%92" },
                ].map((stat) => (
                  <div key={stat.label} className="p-3 bg-gray-800/30 rounded-lg text-center">
                    <p className="text-2xl font-bold text-cyan-400">{stat.value}</p>
                    <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
