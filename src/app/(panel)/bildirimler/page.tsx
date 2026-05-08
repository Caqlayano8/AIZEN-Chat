"use client";

import {
  FiMessageSquare,
  FiCalendar,
  FiSend,
  FiPackage,
  FiZap,
  FiSettings,
  FiBell,
  FiCheck,
  FiTrash2,
} from "react-icons/fi";
import { useAppStore } from "@/lib/store";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  message: FiMessageSquare,
  appointment: FiCalendar,
  campaign: FiSend,
  order: FiPackage,
  ai: FiZap,
  system: FiSettings,
};

const colorMap: Record<string, string> = {
  message: "bg-blue-100 text-blue-600",
  appointment: "bg-green-100 text-green-600",
  campaign: "bg-purple-100 text-purple-600",
  order: "bg-orange-100 text-orange-600",
  ai: "bg-yellow-100 text-yellow-600",
  system: "bg-gray-100 text-gray-600",
};

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllRead } = useAppStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bildirimler</h1>
          <p className="text-sm text-gray-500 mt-1">{unreadCount} okunmamış bildirim</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
          >
            <FiCheck className="w-4 h-4" /> Tümünü Okundu İşaretle
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">
            <FiBell className="w-4 h-4" /> Ayarlar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
        {notifications.map((notif) => {
          const Icon = iconMap[notif.type] || FiBell;
          const color = colorMap[notif.type] || colorMap.system;
          return (
            <div
              key={notif.id}
              className={`flex items-start gap-4 p-5 hover:bg-gray-50 transition-colors cursor-pointer ${
                !notif.read ? "bg-purple-50/30" : ""
              }`}
              onClick={() => markNotificationRead(notif.id)}
            >
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {!notif.read && <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />}
                  <h3 className={`text-sm font-semibold ${!notif.read ? "text-gray-900" : "text-gray-700"}`}>{notif.title}</h3>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{notif.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notif.timestamp}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {!notif.read && (
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400" title="Okundu işaretle">
                    <FiCheck className="w-4 h-4" />
                  </button>
                )}
                <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500" title="Sil">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
