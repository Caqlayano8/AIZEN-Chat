"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  FiMessageSquare,
  FiUsers,
  FiCalendar,
  FiPackage,
  FiTrendingUp,
  FiZap,
  FiClock,
  FiStar,
  FiArrowUpRight,
  FiLoader,
} from "react-icons/fi";
import { ChannelIcon } from "@/components/ChannelIcon";
import type { ChannelType } from "@/types";
import Link from "next/link";

interface DashboardData {
  totalConversations: number;
  activeConversations: number;
  resolvedToday: number;
  avgResponseTime: string;
  totalContacts: number;
  newContactsToday: number;
  pendingAppointments: number;
  activeCampaigns: number;
  totalOrders: number;
  revenue: number;
  aiResponseRate: number;
  customerSatisfaction: number;
  totalVoiceCalls: number;
  aiHandledCalls: number;
}

interface ConversationItem {
  id: string;
  channel: string;
  contact: { name: string; phone: string; email: string };
  messages: { content: string; timestamp: string }[];
}

interface AppointmentItem {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  status: string;
  contact: { name: string };
}

interface OrderItem {
  id: string;
  orderNumber: string;
  totalAmount: number;
  currency: string;
  status: string;
  createdAt: string;
  contact: { name: string };
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardData | null>(null);
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  const companyId = (session?.user as Record<string, unknown>)?.companyId as string;
  const userName = session?.user?.name || "Kullanıcı";

  useEffect(() => {
    if (!companyId) { setLoading(false); return; }

    Promise.all([
      fetch(`/api/dashboard?companyId=${companyId}`).then((r) => r.json()),
      fetch(`/api/conversations?companyId=${companyId}`).then((r) => r.json()),
      fetch(`/api/appointments?companyId=${companyId}`).then((r) => r.json()),
      fetch(`/api/orders?companyId=${companyId}`).then((r) => r.json()),
    ])
      .then(([dashData, convData, aptData, ordData]) => {
        setStats(dashData);
        setConversations(Array.isArray(convData) ? convData.slice(0, 5) : []);
        setAppointments(
          Array.isArray(aptData)
            ? aptData.filter((a: AppointmentItem) => a.status === "scheduled" || a.status === "confirmed").slice(0, 4)
            : []
        );
        setOrders(Array.isArray(ordData) ? ordData.slice(0, 4) : []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [companyId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FiLoader className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  const statCards = [
    {
      label: "Aktif Görüşmeler",
      value: stats?.activeConversations ?? 0,
      icon: FiMessageSquare,
      change: "+12%",
      color: "from-blue-500 to-indigo-600",
    },
    {
      label: "Toplam Müşteri",
      value: (stats?.totalContacts ?? 0).toLocaleString("tr-TR"),
      icon: FiUsers,
      change: "+8%",
      color: "from-green-500 to-emerald-600",
    },
    {
      label: "Gelir (TRY)",
      value: `${((stats?.revenue ?? 0) / 1000).toFixed(0)}K`,
      icon: FiTrendingUp,
      change: "+24%",
      color: "from-purple-500 to-violet-600",
    },
    {
      label: "AI Cevap Oranı",
      value: `%${stats?.aiResponseRate ?? 0}`,
      icon: FiZap,
      change: "+5%",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hoş Geldiniz, {userName.split(" ")[0]}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Bugün {stats?.resolvedToday ?? 0} görüşme çözüldü, {stats?.newContactsToday ?? 0} yeni müşteri eklendi
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Ort. Yanıt:</span>
          <span className="flex items-center gap-1 text-green-600 font-semibold">
            <FiClock className="w-4 h-4" /> {stats?.avgResponseTime ?? "-"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className="flex items-center gap-0.5 text-xs font-semibold text-green-600">
                <FiArrowUpRight className="w-3 h-3" />
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <FiStar className="w-5 h-5 text-yellow-300" />
            <h3 className="font-semibold">Müşteri Memnuniyeti</h3>
          </div>
          <div className="text-5xl font-extrabold mb-2">%{stats?.customerSatisfaction ?? 0}</div>
          <p className="text-purple-200 text-sm">Son 30 günde ortalama puan</p>
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <div className="bg-yellow-300 h-2 rounded-full" style={{ width: `${stats?.customerSatisfaction ?? 0}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Kanal Dağılımı</h3>
          <div className="space-y-3">
            {([
              { channel: "whatsapp" as const, label: "WhatsApp", percent: 45 },
              { channel: "instagram" as const, label: "Instagram", percent: 25 },
              { channel: "telegram" as const, label: "Telegram", percent: 15 },
              { channel: "email" as const, label: "E-posta", percent: 10 },
              { channel: "facebook" as const, label: "Facebook", percent: 5 },
            ]).map((ch) => (
              <div key={ch.channel} className="flex items-center gap-3">
                <ChannelIcon channel={ch.channel} />
                <span className="text-sm text-gray-600 w-20">{ch.label}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" style={{ width: `${ch.percent}%` }} />
                </div>
                <span className="text-xs text-gray-500 w-8 text-right">%{ch.percent}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Hızlı İstatistikler</h3>
          <div className="space-y-4">
            {[
              { label: "Toplam Görüşme", value: stats?.totalConversations ?? 0, icon: FiMessageSquare },
              { label: "Bekleyen Randevu", value: stats?.pendingAppointments ?? 0, icon: FiCalendar },
              { label: "Aktif Kampanya", value: stats?.activeCampaigns ?? 0, icon: FiTrendingUp },
              { label: "Toplam Sipariş", value: stats?.totalOrders ?? 0, icon: FiPackage },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <s.icon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{s.label}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Son Görüşmeler</h3>
            <Link href="/mesajlar" className="text-sm text-purple-600 hover:text-purple-700 font-medium">Tümü</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">Henüz görüşme yok</div>
            ) : conversations.map((conv) => (
              <Link key={conv.id} href="/mesajlar" className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">{conv.contact?.name?.[0] || "?"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 truncate">{conv.contact?.name}</span>
                    <ChannelIcon channel={conv.channel as ChannelType} size="sm" />
                  </div>
                  <p className="text-xs text-gray-500 truncate">{conv.messages?.[0]?.content || "..."}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Yaklaşan Randevular</h3>
            <Link href="/randevular" className="text-sm text-purple-600 hover:text-purple-700 font-medium">Tümü</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {appointments.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">Yaklaşan randevu yok</div>
            ) : appointments.map((apt) => (
              <div key={apt.id} className="flex items-center gap-3 p-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-[10px] text-purple-500 font-medium">{apt.date?.split("-")[2]}</span>
                  <span className="text-xs font-bold text-purple-700">{apt.time}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{apt.title}</p>
                  <p className="text-xs text-gray-500">{apt.contact?.name} - {apt.duration} dk</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                  apt.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {apt.status === "confirmed" ? "Onaylandı" : "Bekliyor"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Son Siparişler</h3>
          <Link href="/kargo" className="text-sm text-purple-600 hover:text-purple-700 font-medium">Tümü</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left p-4 font-medium">Sipariş No</th>
                <th className="text-left p-4 font-medium">Müşteri</th>
                <th className="text-left p-4 font-medium">Tutar</th>
                <th className="text-left p-4 font-medium">Durum</th>
                <th className="text-left p-4 font-medium">Tarih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-400 text-sm">Henüz sipariş yok</td></tr>
              ) : orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm font-medium text-purple-600">{order.orderNumber}</td>
                  <td className="p-4 text-sm text-gray-700">{order.contact?.name}</td>
                  <td className="p-4 text-sm font-semibold text-gray-900">
                    {order.totalAmount?.toLocaleString("tr-TR")} {order.currency}
                  </td>
                  <td className="p-4"><OrderStatusBadge status={order.status} /></td>
                  <td className="p-4 text-sm text-gray-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString("tr-TR") : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function OrderStatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; cls: string }> = {
    pending: { label: "Bekliyor", cls: "bg-yellow-100 text-yellow-700" },
    confirmed: { label: "Onaylandı", cls: "bg-blue-100 text-blue-700" },
    processing: { label: "İşleniyor", cls: "bg-indigo-100 text-indigo-700" },
    shipped: { label: "Kargoda", cls: "bg-purple-100 text-purple-700" },
    delivered: { label: "Teslim Edildi", cls: "bg-green-100 text-green-700" },
    cancelled: { label: "İptal", cls: "bg-red-100 text-red-700" },
    returned: { label: "İade", cls: "bg-gray-100 text-gray-700" },
  };
  const c = config[status] || config.pending;
  return <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${c.cls}`}>{c.label}</span>;
}
