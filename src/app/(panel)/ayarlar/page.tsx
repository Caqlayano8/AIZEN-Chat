"use client";

import { useState } from "react";
import {
  FiUser,
  FiSettings,
  FiLink,
  FiUsers,
  FiShield,
  FiZap,
  FiBell,
  FiCreditCard,
  FiGlobe,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiCheck,
  FiX,
  FiRefreshCw,
} from "react-icons/fi";
import { FaWhatsapp, FaInstagram, FaTelegram, FaFacebook } from "react-icons/fa";
import { mockCompany } from "@/lib/mock-data";
import { ChannelIcon } from "@/components/ChannelIcon";

const tabs = [
  { id: "company", label: "Şirket Bilgileri", icon: FiSettings },
  { id: "channels", label: "Kanal Entegrasyonları", icon: FiLink },
  { id: "team", label: "Ekip Yönetimi", icon: FiUsers },
  { id: "ai", label: "Yapay Zeka", icon: FiZap },
  { id: "notifications", label: "Bildirim Ayarları", icon: FiBell },
  { id: "billing", label: "Fatura & Plan", icon: FiCreditCard },
  { id: "security", label: "Güvenlik", icon: FiShield },
  { id: "api", label: "API & Webhook", icon: FiGlobe },
];

const availableChannels = [
  { type: "whatsapp" as const, name: "WhatsApp Business", icon: FaWhatsapp, color: "text-green-500", bg: "bg-green-50", desc: "WhatsApp Business API ile müşterilerinize ulaşın" },
  { type: "instagram" as const, name: "Instagram DM", icon: FaInstagram, color: "text-pink-500", bg: "bg-pink-50", desc: "Instagram Direct mesajlarını yönetin" },
  { type: "telegram" as const, name: "Telegram Bot", icon: FaTelegram, color: "text-blue-500", bg: "bg-blue-50", desc: "Telegram bot ile otomatik yanıt verin" },
  { type: "facebook" as const, name: "Facebook Messenger", icon: FaFacebook, color: "text-blue-600", bg: "bg-blue-50", desc: "Facebook sayfanızın mesajlarını yönetin" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("company");
  const [connectedChannels, setConnectedChannels] = useState(mockCompany.connectedChannels);
  const [aiSettings, setAiSettings] = useState({
    autoReply: true,
    smartRouting: true,
    sentimentAnalysis: false,
    tone: 'professional'
  });

  const addChannel = (type: string) => {
    alert(`${type} kanalı bağlanıyor...`);
    // Demo için basit ekleme
    const newChannel = {
      type: type as any,
      identifier: `${type}@demo.com`,
      status: "connected" as const,
      connectedAt: new Date().toLocaleDateString('tr-TR')
    };
    setConnectedChannels([...connectedChannels, newChannel]);
  };

  const toggleChannelStatus = (index: number) => {
    const updated = [...connectedChannels];
    updated[index].status = updated[index].status === "connected" ? "disconnected" : "connected";
    setConnectedChannels(updated);
  };

  const removeChannel = (index: number) => {
    if (confirm('Bu kanalı kaldırmak istediğinizden emin misiniz?')) {
      setConnectedChannels(connectedChannels.filter((_, i) => i !== index));
    }
  };

  const toggleAiSetting = (key: keyof typeof aiSettings) => {
    if (typeof aiSettings[key] === 'boolean') {
      setAiSettings(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  return (
    <div className="flex gap-6 animate-fade-in">
      {/* Sidebar */}
      <div className="w-60 flex-shrink-0">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Ayarlar</h2>
          </div>
          <nav className="p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id ? "bg-purple-50 text-purple-700" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {activeTab === "company" && <CompanySettings />}
        {activeTab === "channels" && <ChannelSettings />}
        {activeTab === "team" && <TeamSettings />}
        {activeTab === "ai" && <AISettings />}
        {activeTab === "notifications" && <NotificationSettings />}
        {activeTab === "billing" && <BillingSettings />}
        {activeTab === "security" && <SecuritySettings />}
        {activeTab === "api" && <APISettings />}
      </div>
    </div>
  );
}

function CompanySettings() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Şirket Bilgileri</h3>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">DS</span>
        </div>
        <div>
          <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">Logo Değiştir</button>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG max 2MB</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Şirket Adı", value: mockCompany.name },
          { label: "Sektör", value: mockCompany.industry },
          { label: "Telefon", value: mockCompany.phone },
          { label: "E-posta", value: mockCompany.email },
          { label: "Web Sitesi", value: mockCompany.website },
          { label: "Adres", value: mockCompany.address },
        ].map((f) => (
          <div key={f.label}>
            <label className="text-xs text-gray-500 font-medium mb-1 block">{f.label}</label>
            <input
              type="text"
              defaultValue={f.value}
              className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
        ))}
      </div>
      <button 
        onClick={() => alert('Şirket bilgileri kaydedildi!')}
        className="px-6 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700"
      >
        Kaydet
      </button>
    </div>
  );
}

function ChannelSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Bağlı Kanallar</h3>
        <div className="space-y-3">
          {connectedChannels.map((ch, index) => (
            <div key={ch.type} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <ChannelIcon channel={ch.type} size="lg" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{ch.identifier}</p>
                  <p className="text-xs text-gray-400">Bağlanma: {ch.connectedAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  ch.status === "connected" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {ch.status === "connected" ? "Bağlı" : "Bağlantı Kesildi"}
                </span>
                {ch.status === "disconnected" && (
                  <button 
                    onClick={() => toggleChannelStatus(index)}
                    className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400"
                  >
                    <FiRefreshCw className="w-4 h-4" />
                  </button>
                )}
                <button 
                  onClick={() => alert('Ayarlar modalı açılacak...')}
                  className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400"
                >
                  <FiSettings className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => removeChannel(index)}
                  className="p-1.5 rounded-lg hover:bg-red-200 text-red-400"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Kanal Ekle</h3>
        <div className="grid grid-cols-2 gap-4">
          {availableChannels.map((ch) => (
            <div key={ch.type} className="p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer group">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl ${ch.bg} flex items-center justify-center`}>
                  <ch.icon className={`w-5 h-5 ${ch.color}`} />
                </div>
                <h4 className="font-medium text-gray-900 group-hover:text-purple-600">{ch.name}</h4>
              </div>
              <p className="text-xs text-gray-500 mb-3">{ch.desc}</p>
              <button 
                onClick={() => addChannel(ch.type)}
                className="text-xs text-purple-600 font-medium hover:text-purple-700 flex items-center gap-1"
              >
                <FiPlus className="w-3 h-3" /> Bağlan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamSettings() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Ekip Yönetimi</h3>
        <button 
          onClick={() => alert('Yeni üye davet modalı açılacak...')}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700"
        >
          <FiPlus className="w-4 h-4" /> Üye Davet Et
        </button>
      </div>
      <div className="space-y-3">
        {mockCompany.teamMembers.map((m) => (
          <div key={m.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">{m.name[0]}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{m.name}</p>
                <p className="text-xs text-gray-400">{m.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                m.role === "owner" ? "bg-purple-100 text-purple-700" : m.role === "admin" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
              }`}>
                {m.role === "owner" ? "Sahip" : m.role === "admin" ? "Yönetici" : "Temsilci"}
              </span>
              <span className={`w-2 h-2 rounded-full ${m.status === "active" ? "bg-green-500" : "bg-gray-300"}`} />
              <button 
                onClick={() => alert(`${m.name} için düzenleme modalı açılacak...`)}
                className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400"
              >
                <FiEdit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AISettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Yapay Zeka Asistan Ayarları</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-900">Otomatik Cevaplama</p>
              <p className="text-xs text-gray-500">AI müşteri sorularına otomatik cevap versin</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={aiSettings.autoReply}
                onChange={() => toggleAiSetting('autoReply')}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-900">Akıllı Yönlendirme</p>
              <p className="text-xs text-gray-500">Mesajları uygun temsilciye otomatik yönlendir</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={aiSettings.smartRouting}
                onChange={() => toggleAiSetting('smartRouting')}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-900">Duygu Analizi</p>
              <p className="text-xs text-gray-500">Müşteri mesajlarındaki duyguları analiz et</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={aiSettings.sentimentAnalysis}
                onChange={() => toggleAiSetting('sentimentAnalysis')}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
            </label>
          </div>
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1 block">AI Yanıt Tonu</label>
            <select 
              value={aiSettings.tone}
              onChange={(e) => setAiSettings(prev => ({ ...prev, tone: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              <option value="professional">Profesyonel</option>
              <option value="friendly">Samimi</option>
              <option value="formal">Resmi</option>
              <option value="casual">Günlük</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
            <select className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
              <option>Profesyonel</option>
              <option>Samimi</option>
              <option>Resmi</option>
              <option>Teknik</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1 block">Özel Talimatlar</label>
            <textarea
              rows={4}
              defaultValue="Müşterilere her zaman nazik ve profesyonel bir dil kullanarak yanıt ver. Fiyat bilgisi sorulduğunda satış ekibine yönlendir."
              className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none"
            />
          </div>
        </div>
        <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700">Kaydet</button>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Bildirim Tercihleri</h3>
      <div className="space-y-3">
        {[
          { label: "Yeni mesaj bildirimleri", desc: "Müşterilerden gelen yeni mesajlar için bildirim al", checked: true },
          { label: "Randevu hatırlatmaları", desc: "Yaklaşan randevular için hatırlatma al", checked: true },
          { label: "Kampanya raporları", desc: "Kampanya performans raporlarını bildir", checked: true },
          { label: "Sipariş güncellemeleri", desc: "Sipariş durumu değişikliklerini bildir", checked: false },
          { label: "AI aktiviteleri", desc: "Yapay zekanın otomatik işlemleri hakkında bildir", checked: true },
          { label: "Sistem güncellemeleri", desc: "Platform güncellemeleri ve bakım bildirimleri", checked: false },
        ].map((n) => (
          <div key={n.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-900">{n.label}</p>
              <p className="text-xs text-gray-500">{n.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked={n.checked} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-200 text-sm">Mevcut Plan</p>
            <h3 className="text-2xl font-bold mt-1">Profesyonel</h3>
            <p className="text-purple-200 text-sm mt-2">1.499 TL / ay</p>
          </div>
          <button className="bg-white text-purple-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-purple-50">
            Planı Yükselt
          </button>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Kullanım</h3>
        <div className="space-y-4">
          {[
            { label: "Kanal Entegrasyonu", used: 4, total: 5 },
            { label: "Kişi Sayısı", used: 3456, total: 5000 },
            { label: "Kullanıcı", used: 3, total: 5 },
            { label: "Aylık Mesaj", used: 12500, total: 50000 },
          ].map((u) => (
            <div key={u.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">{u.label}</span>
                <span className="text-xs text-gray-400">{u.used.toLocaleString("tr-TR")} / {u.total.toLocaleString("tr-TR")}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(u.used / u.total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Güvenlik Ayarları</h3>
      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-500 font-medium mb-1 block">Mevcut Şifre</label>
          <input type="password" className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1 block">Yeni Şifre</label>
            <input type="password" className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1 block">Şifre Tekrar</label>
            <input type="password" className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <p className="text-sm font-medium text-gray-900">İki Faktörlü Doğrulama (2FA)</p>
            <p className="text-xs text-gray-500">Hesabınıza ek güvenlik katmanı ekleyin</p>
          </div>
          <button className="text-sm text-purple-600 font-medium hover:text-purple-700">Etkinleştir</button>
        </div>
        <button className="px-6 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700">Kaydet</button>
      </div>
    </div>
  );
}

function APISettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">API Anahtarları</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-900">Production API Key</p>
              <p className="text-xs text-gray-400 font-mono">ak_live_••••••••••••••••</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs text-purple-600 font-medium">Göster</button>
              <button className="text-xs text-purple-600 font-medium">Kopyala</button>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-900">Test API Key</p>
              <p className="text-xs text-gray-400 font-mono">ak_test_••••••••••••••••</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs text-purple-600 font-medium">Göster</button>
              <button className="text-xs text-purple-600 font-medium">Kopyala</button>
            </div>
          </div>
        </div>
        <button className="mt-4 flex items-center gap-2 text-sm text-purple-600 font-medium hover:text-purple-700">
          <FiPlus className="w-4 h-4" /> Yeni API Anahtarı
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Webhook Endpoints</h3>
        <div className="p-4 bg-gray-50 rounded-xl mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">Mesaj Webhook</span>
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Aktif</span>
          </div>
          <p className="text-xs text-gray-400 font-mono">https://api.sirket.com/webhooks/aizentr</p>
        </div>
        <button className="flex items-center gap-2 text-sm text-purple-600 font-medium hover:text-purple-700">
          <FiPlus className="w-4 h-4" /> Webhook Ekle
        </button>
      </div>
    </div>
  );
}
