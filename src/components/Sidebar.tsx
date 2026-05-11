"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiMessageSquare,
  FiUsers,
  FiCalendar,
  FiSend,
  FiBell,
  FiPackage,
  FiSettings,
  FiGrid,
  FiChevronLeft,
  FiChevronRight,
  FiZap,
  FiHeadphones,
  FiPhone,
  FiShield,
} from "react-icons/fi";
import { useAppStore } from "@/lib/store";

const navItems = [
  { href: "/dashboard", label: "Panel", icon: FiGrid },
  { href: "/mesajlar", label: "Mesajlar", icon: FiMessageSquare, badge: 6 },
  { href: "/rehber", label: "Rehber / CRM", icon: FiUsers },
  { href: "/kampanyalar", label: "Kampanyalar", icon: FiSend },
  { href: "/randevular", label: "Randevular", icon: FiCalendar },
  { href: "/bildirimler", label: "Bildirimler", icon: FiBell, badge: 3 },
  { href: "/kargo", label: "Sipariş / Kargo", icon: FiPackage },
  { href: "/sesli-destek", label: "Sesli Destek", icon: FiPhone },
  { href: "/ayarlar", label: "Ayarlar", icon: FiSettings },
  { href: "/admin", label: "Admin Panel", icon: FiShield },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <aside
      className={`fixed left-0 top-0 h-full z-40 flex flex-col transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-[72px]"
      }`}
      style={{ background: "var(--color-sidebar)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
          <FiZap className="w-5 h-5 text-white" />
        </div>
        {sidebarOpen && (
          <div className="animate-fade-in">
            <span className="text-lg font-bold text-white tracking-tight">AIZEN Chat</span>
            <span className="text-[10px] text-purple-300 block -mt-1">CRM Platform</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                isActive
                  ? "bg-white/15 text-white shadow-lg shadow-purple-900/30"
                  : "text-white/60 hover:bg-white/8 hover:text-white"
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <item.icon
                className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-purple-300" : "group-hover:text-purple-300"}`}
              />
              {sidebarOpen && <span className="animate-fade-in">{item.label}</span>}
              {item.badge && item.badge > 0 && (
                <span
                  className={`${
                    sidebarOpen ? "ml-auto" : "absolute -top-1 -right-1"
                  } bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* AI Assistant */}
      <div className="px-2 pb-2">
        <div
          className={`rounded-xl p-3 ${
            sidebarOpen ? "bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/20" : ""
          }`}
        >
          {sidebarOpen ? (
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <FiHeadphones className="w-4 h-4 text-purple-300" />
                <span className="text-xs font-semibold text-purple-200">AI Asistan</span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-dot" />
              </div>
              <p className="text-[11px] text-white/50">Yapay zeka asistanınız aktif ve mesajlarınızı analiz ediyor</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <FiHeadphones className="w-5 h-5 text-purple-300" />
            </div>
          )}
        </div>
      </div>

      {/* Toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-gray-700 border border-gray-200"
      >
        {sidebarOpen ? <FiChevronLeft className="w-3.5 h-3.5" /> : <FiChevronRight className="w-3.5 h-3.5" />}
      </button>
    </aside>
  );
}
