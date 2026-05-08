"use client";

import { FiMessageSquare, FiMail, FiSmartphone } from "react-icons/fi";
import { FaWhatsapp, FaInstagram, FaTelegram, FaFacebook } from "react-icons/fa";
import type { ChannelType } from "@/types";

const channelConfig: Record<ChannelType, { icon: React.ComponentType<{ className?: string }>; color: string; label: string }> = {
  whatsapp: { icon: FaWhatsapp, color: "text-green-500", label: "WhatsApp" },
  instagram: { icon: FaInstagram, color: "text-pink-500", label: "Instagram" },
  telegram: { icon: FaTelegram, color: "text-blue-500", label: "Telegram" },
  facebook: { icon: FaFacebook, color: "text-blue-600", label: "Facebook" },
  email: { icon: FiMail, color: "text-orange-500", label: "E-posta" },
  sms: { icon: FiSmartphone, color: "text-purple-500", label: "SMS" },
  webchat: { icon: FiMessageSquare, color: "text-indigo-500", label: "Web Chat" },
};

interface Props {
  channel: ChannelType;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function ChannelIcon({ channel, size = "md", showLabel = false }: Props) {
  const config = channelConfig[channel];
  const sizeClass = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-6 h-6" : "w-4 h-4";

  return (
    <span className="inline-flex items-center gap-1">
      <config.icon className={`${sizeClass} ${config.color}`} />
      {showLabel && <span className="text-xs text-gray-500">{config.label}</span>}
    </span>
  );
}

export { channelConfig };
