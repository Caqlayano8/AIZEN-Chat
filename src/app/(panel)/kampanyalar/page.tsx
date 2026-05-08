"use client";

import { useState } from "react";
import {
  FiPlus,
  FiSend,
  FiEye,
  FiEdit,
  FiTrash2,
  FiMoreVertical,
  FiTrendingUp,
  FiUsers,
  FiMail,
  FiMessageSquare,
  FiCalendar,
  FiZap,
  FiPause,
  FiPlay,
} from "react-icons/fi";
import { mockCampaigns } from "@/lib/mock-data";
import { ChannelIcon } from "@/components/ChannelIcon";

export default function CampaignsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? mockCampaigns : mockCampaigns.filter((c) => c.status === filter);

  const totalSent = mockCampaigns.reduce((a, c) => a + c.sentCount, 0);
  const totalDelivered = mockCampaigns.reduce((a, c) => a + c.deliveredCount, 0);
  const totalRead = mockCampaigns.reduce((a, c) => a + c.readCount, 0);
  const totalResponse = mockCampaigns.reduce((a, c) => a + c.responseCount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kampanyalar</h1>
          <p className="text-sm text-gray-500 mt-1">Toplu mesaj ve otomatik kampanya yönetimi</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700"
        >
          <FiPlus className="w-4 h-4" /> Yeni Kampanya
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Toplam Gönderim", value: totalSent.toLocaleString("tr-TR"), icon: FiSend, color: "from-blue-500 to-indigo-600" },
          { label: "Teslim Edilen", value: totalDelivered.toLocaleString("tr-TR"), icon: FiMail, color: "from-green-500 to-emerald-600" },
          { label: "Okunan", value: totalRead.toLocaleString("tr-TR"), icon: FiEye, color: "from-purple-500 to-violet-600" },
          { label: "Yanıtlanan", value: totalResponse.toLocaleString("tr-TR"), icon: FiMessageSquare, color: "from-orange-500 to-red-500" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { value: "all", label: "Tümü" },
          { value: "active", label: "Aktif" },
          { value: "scheduled", label: "Planlanmış" },
          { value: "draft", label: "Taslak" },
          { value: "completed", label: "Tamamlandı" },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f.value ? "bg-purple-100 text-purple-700" : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <ChannelIcon channel={campaign.channel} size="md" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{campaign.description}</p>
                </div>
              </div>
              <CampaignStatusBadge status={campaign.status} />
            </div>

            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <div className="text-sm font-bold text-gray-900">{campaign.sentCount}</div>
                <div className="text-[10px] text-gray-500">Gönderilen</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <div className="text-sm font-bold text-gray-900">{campaign.deliveredCount}</div>
                <div className="text-[10px] text-gray-500">Teslim</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <div className="text-sm font-bold text-gray-900">{campaign.readCount}</div>
                <div className="text-[10px] text-gray-500">Okunan</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <div className="text-sm font-bold text-gray-900">{campaign.responseCount}</div>
                <div className="text-[10px] text-gray-500">Yanıt</div>
              </div>
            </div>

            {campaign.sentCount > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Açılma Oranı</span>
                  <span className="font-semibold text-gray-700">
                    {Math.round((campaign.readCount / campaign.sentCount) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1.5 rounded-full"
                    style={{ width: `${(campaign.readCount / campaign.sentCount) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <FiUsers className="w-3 h-3" /> {campaign.targetAudience}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <FiCalendar className="w-3 h-3" /> {campaign.createdAt}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {campaign.status === "active" && (
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 text-yellow-500"><FiPause className="w-3.5 h-3.5" /></button>
                )}
                {campaign.status === "paused" && (
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 text-green-500"><FiPlay className="w-3.5 h-3.5" /></button>
                )}
                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><FiEdit className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><FiTrendingUp className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"><FiTrash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Campaign Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowCreate(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Yeni Kampanya Oluştur</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Kampanya Adı</label>
                <input type="text" placeholder="Kampanya adı girin" className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Kanal</label>
                  <select className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                    <option>WhatsApp</option>
                    <option>Instagram</option>
                    <option>Telegram</option>
                    <option>SMS</option>
                    <option>E-posta</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Tür</label>
                  <select className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                    <option>Toplu Gönderim</option>
                    <option>Drip Kampanya</option>
                    <option>Tetikleyici</option>
                    <option>Promosyon</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Hedef Kitle</label>
                <select className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                  <option>Tüm Müşteriler</option>
                  <option>VIP Müşteriler</option>
                  <option>Yeni Kayıtlar</option>
                  <option>Aktif Müşteriler</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Mesaj Şablonu</label>
                <textarea rows={4} placeholder="Mesaj içeriğinizi yazın veya AI ile oluşturun..." className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none" />
                <button className="mt-2 flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium">
                  <FiZap className="w-3 h-3" /> AI ile mesaj oluştur
                </button>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Zamanlama</label>
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                  <input type="time" className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl">İptal</button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200">Taslak Kaydet</button>
              <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700">Gönder</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CampaignStatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; cls: string }> = {
    draft: { label: "Taslak", cls: "bg-gray-100 text-gray-600" },
    scheduled: { label: "Planlanmış", cls: "bg-blue-100 text-blue-700" },
    active: { label: "Aktif", cls: "bg-green-100 text-green-700" },
    paused: { label: "Duraklatıldı", cls: "bg-yellow-100 text-yellow-700" },
    completed: { label: "Tamamlandı", cls: "bg-purple-100 text-purple-700" },
  };
  const c = config[status] || config.draft;
  return <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${c.cls}`}>{c.label}</span>;
}
