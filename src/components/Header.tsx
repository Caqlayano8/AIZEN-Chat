"use client";

import { useState } from "react";
import { FiSearch, FiBell, FiUser, FiLogOut, FiSettings, FiChevronDown, FiMenu } from "react-icons/fi";
import { useAppStore } from "@/lib/store";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { notifications, markNotificationRead, markAllRead, setSidebarOpen, sidebarOpen } = useAppStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
          <FiMenu className="w-5 h-5 text-gray-600" />
        </button>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Müşteri, mesaj veya sipariş ara..."
            className="pl-10 pr-4 py-2 w-80 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <FiBell className="w-5 h-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-96 bg-white rounded-2xl shadow-xl border border-gray-100 animate-slide-in overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Bildirimler</h3>
                <button onClick={markAllRead} className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                  Tümünü okundu işaretle
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.slice(0, 5).map((notif) => (
                  <button
                    key={notif.id}
                    onClick={() => markNotificationRead(notif.id)}
                    className={`w-full text-left p-4 hover:bg-gray-50 border-b border-gray-50 transition-colors ${
                      !notif.read ? "bg-purple-50/50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {!notif.read && <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />}
                      <div className={!notif.read ? "" : "ml-5"}>
                        <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{notif.message}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{notif.timestamp}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <Link
                href="/bildirimler"
                className="block text-center py-3 text-sm text-purple-600 hover:bg-gray-50 font-medium"
                onClick={() => setNotifOpen(false)}
              >
                Tüm bildirimleri gör
              </Link>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">MA</span>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-700">Mehmet Aydın</p>
              <p className="text-[10px] text-gray-400">Demo Şirket A.Ş.</p>
            </div>
            <FiChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 animate-slide-in overflow-hidden">
              <div className="p-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Mehmet Aydın</p>
                <p className="text-xs text-gray-500">mehmet@demosirket.com</p>
              </div>
              <div className="py-1">
                <Link href="/ayarlar" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setProfileOpen(false)}>
                  <FiUser className="w-4 h-4" /> Profilim
                </Link>
                <Link href="/ayarlar" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setProfileOpen(false)}>
                  <FiSettings className="w-4 h-4" /> Ayarlar
                </Link>
              </div>
              <div className="border-t border-gray-100 py-1">
                <Link href="/giris" className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50" onClick={() => setProfileOpen(false)}>
                  <FiLogOut className="w-4 h-4" /> Çıkış Yap
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
