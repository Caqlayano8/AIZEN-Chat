"use client";

import { useState, useEffect } from "react";
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
  FiCopy,
  FiEye,
  FiEyeOff,
  FiSmartphone,
  FiLogIn,
  FiKey,
  FiCamera,
} from "react-icons/fi";
import { FaWhatsapp, FaInstagram, FaTelegram, FaFacebook } from "react-icons/fa";
import { mockCompany } from "@/lib/mock-data";
import { ChannelIcon } from "@/components/ChannelIcon";
import { useToast } from "@/components/Toast";
import type { ChannelType } from "@/types";

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
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: mockCompany.name,
    industry: mockCompany.industry,
    phone: mockCompany.phone,
    email: mockCompany.email,
    website: mockCompany.website,
    address: mockCompany.address,
  });

  const fields = [
    { label: "Şirket Adı", key: "name" },
    { label: "Sektör", key: "industry" },
    { label: "Telefon", key: "phone" },
    { label: "E-posta", key: "email" },
    { label: "Web Sitesi", key: "website" },
    { label: "Adres", key: "address" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Şirket Bilgileri</h3>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">DS</span>
        </div>
        <div>
          <button
            onClick={() => showToast("Logo yükleme penceresi açıldı", "info")}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            Logo Değiştir
          </button>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG max 2MB</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.label}>
            <label className="text-xs text-gray-500 font-medium mb-1 block">{f.label}</label>
            <input
              type="text"
              value={formData[f.key as keyof typeof formData]}
              onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => showToast("Şirket bilgileri başarıyla kaydedildi")}
        className="px-6 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors"
      >
        Kaydet
      </button>
    </div>
  );
}

interface ChannelConfig {
  apiKey: string;
  apiSecret: string;
  phoneNumber: string;
  accessToken: string;
  botToken: string;
  webhookUrl: string;
  autoReply: string;
  notifications: boolean;
}

type ConnectionMethod = "qr" | "api" | "oauth" | "smtp";

interface ConnectionOption {
  method: ConnectionMethod;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const channelConnectionOptions: Record<string, ConnectionOption[]> = {
  whatsapp: [
    { method: "qr", label: "QR Kod ile Bağlan", icon: FiSmartphone, description: "WhatsApp uygulamanızdan QR kodu taratarak anında bağlanın" },
    { method: "api", label: "API Token ile Bağlan", icon: FiKey, description: "Meta Business API kullanarak profesyonel entegrasyon yapın" },
  ],
  instagram: [
    { method: "oauth", label: "Facebook ile Giriş Yap", icon: FiLogIn, description: "Facebook hesabınızla giriş yaparak Instagram'ı bağlayın" },
    { method: "api", label: "API Token ile Bağlan", icon: FiKey, description: "Instagram Graph API token kullanarak bağlanın" },
  ],
  telegram: [
    { method: "qr", label: "QR Kod ile Bağlan", icon: FiSmartphone, description: "Telegram uygulamanızdan QR kodu taratın" },
    { method: "api", label: "Bot Token ile Bağlan", icon: FiKey, description: "@BotFather'dan aldığınız token ile bot bağlayın" },
  ],
  facebook: [
    { method: "oauth", label: "Facebook ile Giriş Yap", icon: FiLogIn, description: "Facebook hesabınızla giriş yaparak sayfanızı bağlayın" },
    { method: "api", label: "API Token ile Bağlan", icon: FiKey, description: "Page Access Token kullanarak bağlanın" },
  ],
  email: [
    { method: "oauth", label: "Gmail / Outlook ile Giriş", icon: FiLogIn, description: "Google veya Microsoft hesabınızla güvenli giriş yapın" },
    { method: "smtp", label: "SMTP / API ile Bağlan", icon: FiKey, description: "SMTP sunucu bilgileri veya Resend/SendGrid API key ile bağlanın" },
  ],
  sms: [
    { method: "api", label: "API ile Bağlan", icon: FiKey, description: "Twilio veya Netgsm API bilgileri ile bağlanın" },
  ],
  webchat: [
    { method: "api", label: "Widget Oluştur", icon: FiGlobe, description: "Web sitenize ekleyebileceğiniz chat widget'ı oluşturun" },
  ],
};

const channelFieldConfig: Record<string, { label: string; fields: { key: keyof ChannelConfig; label: string; placeholder: string; type?: string }[]; guide: string }> = {
  whatsapp: {
    label: "WhatsApp Business",
    fields: [
      { key: "phoneNumber", label: "WhatsApp Numarası", placeholder: "+90 5XX XXX XXXX" },
      { key: "accessToken", label: "Meta Business API Token", placeholder: "EAAxxxxxxx..." },
      { key: "apiKey", label: "Phone Number ID", placeholder: "1234567890" },
      { key: "webhookUrl", label: "Webhook URL", placeholder: "Otomatik oluşturulur" },
    ],
    guide: "Meta Business Suite > WhatsApp > API Ayarları bölümünden token ve Phone Number ID alabilirsiniz.",
  },
  instagram: {
    label: "Instagram DM",
    fields: [
      { key: "accessToken", label: "Instagram Graph API Token", placeholder: "IGQVxxxxxxx..." },
      { key: "apiKey", label: "Instagram Business Account ID", placeholder: "1234567890" },
      { key: "webhookUrl", label: "Webhook URL", placeholder: "Otomatik oluşturulur" },
    ],
    guide: "Meta for Developers > Instagram Basic Display API > Token Oluştur adımlarını takip edin.",
  },
  telegram: {
    label: "Telegram Bot",
    fields: [
      { key: "botToken", label: "Bot Token", placeholder: "123456:ABCxxxxxxx" },
      { key: "phoneNumber", label: "Bot Kullanıcı Adı", placeholder: "@botadiniz" },
      { key: "webhookUrl", label: "Webhook URL", placeholder: "Otomatik oluşturulur" },
    ],
    guide: "Telegram'da @BotFather ile yeni bot oluşturup token alın. /newbot komutunu kullanın.",
  },
  facebook: {
    label: "Facebook Messenger",
    fields: [
      { key: "accessToken", label: "Page Access Token", placeholder: "EAAxxxxxxx..." },
      { key: "apiKey", label: "Page ID", placeholder: "1234567890" },
      { key: "webhookUrl", label: "Webhook URL", placeholder: "Otomatik oluşturulur" },
    ],
    guide: "Meta for Developers > Messenger Platform > Sayfa Token Oluştur adımlarını takip edin.",
  },
  email: {
    label: "E-posta",
    fields: [
      { key: "apiKey", label: "SMTP Sunucu / API Key", placeholder: "smtp.gmail.com veya re_xxxxxx" },
      { key: "apiSecret", label: "SMTP Şifre / API Secret", placeholder: "Uygulama şifresi", type: "password" },
      { key: "phoneNumber", label: "E-posta Adresi", placeholder: "destek@sirketiniz.com" },
    ],
    guide: "Gmail: Uygulama Şifresi oluşturun. Resend/SendGrid: API key panelinden alın.",
  },
  sms: {
    label: "SMS",
    fields: [
      { key: "apiKey", label: "Twilio Account SID / Netgsm ID", placeholder: "ACxxxxxxx" },
      { key: "apiSecret", label: "Auth Token / Şifre", placeholder: "Token", type: "password" },
      { key: "phoneNumber", label: "Gönderici Numara", placeholder: "+90 XXX XXX XXXX" },
    ],
    guide: "Twilio Console > Account SID ve Auth Token bilgilerini alın.",
  },
  webchat: {
    label: "Web Chat",
    fields: [
      { key: "apiKey", label: "Widget ID", placeholder: "Otomatik oluşturulur" },
      { key: "webhookUrl", label: "Embed Kodu", placeholder: "Web sitenize eklenecek kod" },
    ],
    guide: "Widget kodunu web sitenizin </body> etiketinden önce ekleyin.",
  },
};

function QRCodeDisplay({ channel, onSuccess }: { channel: string; onSuccess: () => void }) {
  const [status, setStatus] = useState<"waiting" | "scanned" | "connected">("waiting");
  const [timer, setTimer] = useState(120);

  const qrPatterns: Record<string, string[]> = {
    whatsapp: [
      "████ ██ ████ ██ ████",
      "█  █ ██ █  █ ██ █  █",
      "████ ██ ████ ██ ████",
      "     ██      ██     ",
      "████ ████████ ██████",
      "█  █ ██    ██ █  █  ",
      "████ ██ ████ ██ ████",
      "     ██      ██     ",
      "████ ██ ████ ██ ████",
      "█  █ ██ █  █ ██ █  █",
      "████ ██ ████ ██ ████",
    ],
    telegram: [
      "████ ██ ██ ██ ████",
      "█  █ ████████ █  █",
      "████ ██    ██ ████",
      "     ████████     ",
      "██ ████  ████ ██  ",
      "████ ██ ██ ██ ████",
      "     ████████     ",
      "████ ██    ██ ████",
      "█  █ ████████ █  █",
      "████ ██ ██ ██ ████",
    ],
  };

  useEffect(() => {
    if (status !== "waiting") return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);

  const handleSimulateScan = () => {
    setStatus("scanned");
    setTimeout(() => {
      setStatus("connected");
      setTimeout(onSuccess, 800);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative">
        <div className={`bg-white p-4 rounded-2xl border-2 transition-all ${
          status === "waiting" ? "border-gray-200" : status === "scanned" ? "border-yellow-400" : "border-green-400"
        }`}>
          {status === "connected" ? (
            <div className="w-48 h-48 flex items-center justify-center">
              <div className="text-center">
                <FiCheck className="w-16 h-16 text-green-500 mx-auto mb-2" />
                <p className="text-green-600 font-semibold">Bağlandı!</p>
              </div>
            </div>
          ) : (
            <div className="w-48 h-48 flex items-center justify-center bg-gray-50 rounded-xl relative">
              <pre className="text-[8px] leading-[9px] font-mono text-gray-800 select-none">
                {(qrPatterns[channel] || qrPatterns.whatsapp).join("\n")}
              </pre>
              {status === "scanned" && (
                <div className="absolute inset-0 bg-yellow-50/80 flex items-center justify-center rounded-xl">
                  <div className="text-center">
                    <FiSmartphone className="w-8 h-8 text-yellow-500 mx-auto mb-1 animate-pulse" />
                    <p className="text-xs text-yellow-600 font-medium">Doğrulanıyor...</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {status === "waiting" && (
          <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
          </div>
        )}
      </div>

      {status === "waiting" && (
        <>
          <div className="mt-4 space-y-2 text-center">
            <p className="text-sm font-medium text-gray-700">
              {channel === "whatsapp" ? "WhatsApp" : "Telegram"} uygulamanızı açın
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              {channel === "whatsapp" ? (
                <>
                  <p>1. WhatsApp &gt; Ayarlar &gt; Bağlı Cihazlar</p>
                  <p>2. &quot;Cihaz Bağla&quot; butonuna tıklayın</p>
                  <p>3. QR kodu telefonunuzla taratın</p>
                </>
              ) : (
                <>
                  <p>1. Telegram &gt; Ayarlar &gt; Cihazlar</p>
                  <p>2. &quot;QR Kod ile Giriş&quot; seçin</p>
                  <p>3. QR kodu telefonunuzla taratın</p>
                </>
              )}
            </div>
          </div>
          <button
            onClick={handleSimulateScan}
            className="mt-4 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-xs hover:bg-gray-200 transition-colors"
          >
            <FiCamera className="w-3 h-3 inline mr-1" /> Test: Taramayı Simüle Et
          </button>
          {timer === 0 && (
            <button
              onClick={() => setTimer(120)}
              className="mt-2 px-4 py-2 text-purple-600 text-xs font-medium hover:bg-purple-50 rounded-xl"
            >
              <FiRefreshCw className="w-3 h-3 inline mr-1" /> Yeni QR Kod Oluştur
            </button>
          )}
        </>
      )}
    </div>
  );
}

function OAuthLoginButton({ channel, onSuccess }: { channel: string; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const oauthProviders: Record<string, { name: string; color: string; bg: string; icon: React.ComponentType<{ className?: string }> }[]> = {
    instagram: [
      { name: "Facebook ile Giriş Yap", color: "text-white", bg: "bg-blue-600 hover:bg-blue-700", icon: FaFacebook },
    ],
    facebook: [
      { name: "Facebook ile Giriş Yap", color: "text-white", bg: "bg-blue-600 hover:bg-blue-700", icon: FaFacebook },
    ],
    email: [
      { name: "Google ile Bağlan (Gmail)", color: "text-gray-700", bg: "bg-white border border-gray-300 hover:bg-gray-50", icon: FiGlobe },
      { name: "Microsoft ile Bağlan (Outlook)", color: "text-white", bg: "bg-[#0078d4] hover:bg-[#006abe]", icon: FiGlobe },
    ],
  };

  const providers = oauthProviders[channel] || [];

  const handleOAuth = (providerName: string) => {
    setLoading(true);
    showToast(`${providerName} yetkilendirme penceresi açılıyor...`, "info");
    setTimeout(() => {
      showToast("Yetkilendirme başarılı!");
      setLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="space-y-3 py-4">
      {providers.map((provider) => (
        <button
          key={provider.name}
          onClick={() => handleOAuth(provider.name)}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all disabled:opacity-50 ${provider.bg} ${provider.color}`}
        >
          <provider.icon className="w-5 h-5" />
          {loading ? "Yetkilendiriliyor..." : provider.name}
        </button>
      ))}
      <div className="text-center">
        <p className="text-xs text-gray-400 mt-2">
          {channel === "instagram" && "Instagram hesabınızın bir Facebook Business sayfasına bağlı olması gerekir."}
          {channel === "facebook" && "Facebook sayfanızın mesaj özelliğinin açık olması gerekir."}
          {channel === "email" && "E-posta hesabınıza güvenli erişim için OAuth 2.0 kullanılır."}
        </p>
      </div>
    </div>
  );
}

function ChannelSettings() {
  const { showToast } = useToast();
  const [channels, setChannels] = useState(mockCompany.connectedChannels);
  const [showChannelModal, setShowChannelModal] = useState<string | null>(null);
  const [showConnectModal, setShowConnectModal] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [connectForm, setConnectForm] = useState<Partial<ChannelConfig>>({});
  const [selectedMethod, setSelectedMethod] = useState<ConnectionMethod | null>(null);
  const [settingsForm, setSettingsForm] = useState<Partial<ChannelConfig>>({
    autoReply: "Merhaba! Mesajınızı aldık, en kısa sürede dönüş yapacağız.",
    notifications: true,
  });

  const handleReconnect = (type: string) => {
    setSaving(true);
    setTimeout(() => {
      setChannels((prev) =>
        prev.map((ch) => (ch.type === type ? { ...ch, status: "connected" as const } : ch))
      );
      showToast("Kanal yeniden bağlandı");
      setSaving(false);
    }, 1000);
  };

  const handleDisconnect = (type: string) => {
    setChannels((prev) =>
      prev.map((ch) => (ch.type === type ? { ...ch, status: "disconnected" as const } : ch))
    );
    showToast("Kanal bağlantısı kesildi", "warning");
    setShowChannelModal(null);
  };

  const handleSaveSettings = () => {
    setSaving(true);
    setTimeout(() => {
      showToast("Kanal ayarları başarıyla kaydedildi");
      setSaving(false);
      setShowChannelModal(null);
    }, 800);
  };

  const handleConnect = () => {
    if (!showConnectModal) return;
    const cfg = channelFieldConfig[showConnectModal];
    const requiredFields = cfg?.fields.filter((f) => f.key !== "webhookUrl") || [];
    const missing = requiredFields.find((f) => !connectForm[f.key]);
    if (missing) {
      showToast(`${missing.label} alanı gerekli`, "error");
      return;
    }

    setSaving(true);
    setTimeout(() => {
      const identifier = connectForm.phoneNumber || connectForm.accessToken?.slice(0, 15) + "..." || showConnectModal;
      setChannels((prev) => [
        ...prev,
        {
          type: showConnectModal as "whatsapp" | "instagram" | "telegram" | "facebook" | "email" | "sms" | "webchat",
          identifier,
          status: "connected" as const,
          connectedAt: new Date().toISOString().split("T")[0],
        },
      ]);
      showToast(`${cfg?.label || "Kanal"} başarıyla bağlandı`);
      setSaving(false);
      setShowConnectModal(null);
      setConnectForm({});
    }, 1200);
  };

  const openSettingsModal = (type: string) => {
    const ch = channels.find((c) => c.type === type);
    setSettingsForm({
      phoneNumber: ch?.identifier || "",
      autoReply: "Merhaba! Mesajınızı aldık, en kısa sürede dönüş yapacağız.",
      notifications: true,
    });
    setShowChannelModal(type);
  };

  const webhookBase = typeof window !== "undefined" ? window.location.origin : "https://sizin-domain.com";

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Bağlı Kanallar</h3>
        {channels.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">Henüz bağlı kanal yok. Aşağıdan bir kanal ekleyin.</div>
        ) : (
          <div className="space-y-3">
            {channels.map((ch) => (
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
                      onClick={() => handleReconnect(ch.type)}
                      disabled={saving}
                      className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 transition-colors disabled:opacity-50"
                    >
                      <FiRefreshCw className={`w-4 h-4 ${saving ? "animate-spin" : ""}`} />
                    </button>
                  )}
                  <button
                    onClick={() => openSettingsModal(ch.type)}
                    className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-purple-600 transition-colors"
                  >
                    <FiSettings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Kanal Ekle</h3>
        <div className="grid grid-cols-2 gap-4">
          {availableChannels.map((ch) => {
            const alreadyConnected = channels.some((c) => c.type === ch.type && c.status === "connected");
            return (
              <div key={ch.type} className={`p-4 border rounded-xl transition-all ${alreadyConnected ? "border-green-200 bg-green-50/30" : "border-gray-200 hover:border-purple-300 hover:shadow-sm cursor-pointer group"}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl ${ch.bg} flex items-center justify-center`}>
                    <ch.icon className={`w-5 h-5 ${ch.color}`} />
                  </div>
                  <h4 className={`font-medium ${alreadyConnected ? "text-green-700" : "text-gray-900 group-hover:text-purple-600"}`}>{ch.name}</h4>
                </div>
                <p className="text-xs text-gray-500 mb-3">{ch.desc}</p>
                {alreadyConnected ? (
                  <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <FiCheck className="w-3 h-3" /> Bağlı
                  </span>
                ) : (
                  <button
                    onClick={() => { setConnectForm({}); setSelectedMethod(null); setShowConnectModal(ch.type); }}
                    className="text-xs text-purple-600 font-medium hover:text-purple-700 flex items-center gap-1"
                  >
                    <FiPlus className="w-3 h-3" /> Bağlan
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Channel Settings Modal */}
      {showChannelModal && (() => {
        const cfg = channelFieldConfig[showChannelModal];
        const ch = channels.find((c) => c.type === showChannelModal);
        return (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowChannelModal(null)}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg animate-slide-in max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <ChannelIcon channel={showChannelModal as ChannelType} size="lg" />
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{cfg?.label || "Kanal"} Ayarları</h2>
                    <p className="text-xs text-gray-400">{ch?.identifier}</p>
                  </div>
                </div>
                <button onClick={() => setShowChannelModal(null)} className="p-2 hover:bg-gray-100 rounded-lg"><FiX className="w-5 h-5" /></button>
              </div>

              <div className="space-y-4">
                {/* Channel-specific fields */}
                {cfg?.fields.map((field) => (
                  <div key={field.key}>
                    <label className="text-xs text-gray-500 font-medium mb-1 block">{field.label}</label>
                    {field.key === "webhookUrl" ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={`${webhookBase}/api/webhooks/${showChannelModal}`}
                          className="flex-1 px-3 py-2 bg-gray-100 rounded-xl text-sm border border-gray-200 text-gray-500"
                        />
                        <button
                          onClick={() => { navigator.clipboard.writeText(`${webhookBase}/api/webhooks/${showChannelModal}`); showToast("Webhook URL kopyalandı"); }}
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                        >
                          <FiCopy className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <input
                        type={field.type || "text"}
                        value={(settingsForm[field.key] as string) || ""}
                        onChange={(e) => setSettingsForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                      />
                    )}
                  </div>
                ))}

                <div className="border-t border-gray-100 pt-4">
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Otomatik Yanıt Mesajı</label>
                  <textarea
                    rows={3}
                    value={settingsForm.autoReply || ""}
                    onChange={(e) => setSettingsForm((prev) => ({ ...prev, autoReply: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-700">Bildirimler</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.notifications ?? true}
                      onChange={(e) => setSettingsForm((prev) => ({ ...prev, notifications: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-700">AI Otomatik Cevap</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
                  </label>
                </div>

                {cfg?.guide && (
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <p className="text-xs text-blue-700"><strong>Rehber:</strong> {cfg.guide}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => handleDisconnect(showChannelModal)}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
                >
                  Bağlantıyı Kes
                </button>
                <button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="px-5 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {saving ? "Kaydediliyor..." : "Kaydet"}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Connect Channel Modal */}
      {showConnectModal && (() => {
        const cfg = channelFieldConfig[showConnectModal];
        const options = channelConnectionOptions[showConnectModal] || [{ method: "api" as ConnectionMethod, label: "API ile Bağlan", icon: FiKey, description: "API bilgileri ile bağlanın" }];
        const hasMultipleMethods = options.length > 1;

        const handleQRSuccess = () => {
          const identifier = showConnectModal === "whatsapp" ? "QR ile bağlandı" : "QR ile bağlandı";
          setChannels((prev) => [
            ...prev,
            {
              type: showConnectModal as "whatsapp" | "instagram" | "telegram" | "facebook" | "email" | "sms" | "webchat",
              identifier,
              status: "connected" as const,
              connectedAt: new Date().toISOString().split("T")[0],
            },
          ]);
          showToast(`${cfg?.label || "Kanal"} QR kod ile başarıyla bağlandı`);
          setShowConnectModal(null);
          setSelectedMethod(null);
        };

        const handleOAuthSuccess = () => {
          const identifier = showConnectModal === "instagram" ? "Instagram OAuth" : showConnectModal === "facebook" ? "Facebook OAuth" : "OAuth bağlantı";
          setChannels((prev) => [
            ...prev,
            {
              type: showConnectModal as "whatsapp" | "instagram" | "telegram" | "facebook" | "email" | "sms" | "webchat",
              identifier,
              status: "connected" as const,
              connectedAt: new Date().toISOString().split("T")[0],
            },
          ]);
          showToast(`${cfg?.label || "Kanal"} OAuth ile başarıyla bağlandı`);
          setShowConnectModal(null);
          setSelectedMethod(null);
        };

        return (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => { setShowConnectModal(null); setSelectedMethod(null); }}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg animate-slide-in max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <ChannelIcon channel={showConnectModal as ChannelType} size="lg" />
                  <h2 className="text-lg font-bold text-gray-900">{cfg?.label || "Kanal"} Bağla</h2>
                </div>
                <button onClick={() => { setShowConnectModal(null); setSelectedMethod(null); }} className="p-2 hover:bg-gray-100 rounded-lg"><FiX className="w-5 h-5" /></button>
              </div>

              {/* Method Selection */}
              {hasMultipleMethods && !selectedMethod && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 mb-3">Bağlantı yöntemi seçin:</p>
                  {options.map((opt) => (
                    <button
                      key={opt.method}
                      onClick={() => setSelectedMethod(opt.method)}
                      className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-sm transition-all text-left group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-100 transition-colors">
                        <opt.icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-purple-700">{opt.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{opt.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* QR Code Method */}
              {(selectedMethod === "qr") && (
                <div>
                  {hasMultipleMethods && (
                    <button onClick={() => setSelectedMethod(null)} className="text-xs text-purple-600 hover:text-purple-700 mb-3 flex items-center gap-1">
                      ← Yöntem Seçimine Dön
                    </button>
                  )}
                  <QRCodeDisplay channel={showConnectModal} onSuccess={handleQRSuccess} />
                </div>
              )}

              {/* OAuth Method */}
              {(selectedMethod === "oauth") && (
                <div>
                  {hasMultipleMethods && (
                    <button onClick={() => setSelectedMethod(null)} className="text-xs text-purple-600 hover:text-purple-700 mb-3 flex items-center gap-1">
                      ← Yöntem Seçimine Dön
                    </button>
                  )}
                  <OAuthLoginButton channel={showConnectModal} onSuccess={handleOAuthSuccess} />
                </div>
              )}

              {/* API / SMTP Method */}
              {(selectedMethod === "api" || selectedMethod === "smtp" || (!hasMultipleMethods && !selectedMethod)) && (
                <div>
                  {hasMultipleMethods && (
                    <button onClick={() => setSelectedMethod(null)} className="text-xs text-purple-600 hover:text-purple-700 mb-3 flex items-center gap-1">
                      ← Yöntem Seçimine Dön
                    </button>
                  )}

                  {cfg?.guide && (
                    <div className="p-3 bg-blue-50 rounded-xl mb-4">
                      <p className="text-xs text-blue-700"><strong>Nasıl yapılır:</strong> {cfg.guide}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    {cfg?.fields.map((field) => (
                      <div key={field.key}>
                        <label className="text-xs text-gray-500 font-medium mb-1 block">{field.label}</label>
                        {field.key === "webhookUrl" ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              readOnly
                              value={`${webhookBase}/api/webhooks/${showConnectModal}`}
                              className="flex-1 px-3 py-2 bg-gray-100 rounded-xl text-sm border border-gray-200 text-gray-500"
                            />
                            <button
                              onClick={() => { navigator.clipboard.writeText(`${webhookBase}/api/webhooks/${showConnectModal}`); showToast("Webhook URL kopyalandı"); }}
                              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                            >
                              <FiCopy className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <input
                            type={field.type || "text"}
                            value={(connectForm[field.key] as string) || ""}
                            onChange={(e) => setConnectForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                            placeholder={field.placeholder}
                            className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-6">
                    <button onClick={() => { setShowConnectModal(null); setSelectedMethod(null); }} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl">İptal</button>
                    <button
                      onClick={handleConnect}
                      disabled={saving}
                      className="px-5 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                      {saving ? "Bağlanıyor..." : "Bağlan"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function TeamSettings() {
  const { showToast } = useToast();
  const [members, setMembers] = useState(mockCompany.teamMembers);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [editingMember, setEditingMember] = useState<string | null>(null);

  const handleRemoveMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    showToast("Üye kaldırıldı", "warning");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Ekip Yönetimi</h3>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" /> Üye Davet Et
        </button>
      </div>
      <div className="space-y-3">
        {members.map((m) => (
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
                onClick={() => setEditingMember(m.id)}
                className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 transition-colors"
              >
                <FiEdit className="w-4 h-4" />
              </button>
              {m.role !== "owner" && (
                <button
                  onClick={() => handleRemoveMember(m.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowInviteModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Üye Davet Et</h2>
              <button onClick={() => setShowInviteModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><FiX className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">E-posta</label>
                <input type="email" placeholder="davet@ornek.com" className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Rol</label>
                <select className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                  <option>Temsilci</option>
                  <option>Yönetici</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={() => setShowInviteModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl">İptal</button>
              <button
                onClick={() => { showToast("Davet gönderildi"); setShowInviteModal(false); }}
                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-colors"
              >
                Davet Gönder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {editingMember && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setEditingMember(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Üye Düzenle</h2>
              <button onClick={() => setEditingMember(null)} className="p-2 hover:bg-gray-100 rounded-lg"><FiX className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Ad Soyad</label>
                <input
                  type="text"
                  defaultValue={members.find((m) => m.id === editingMember)?.name}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Rol</label>
                <select
                  defaultValue={members.find((m) => m.id === editingMember)?.role}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                >
                  <option value="agent">Temsilci</option>
                  <option value="admin">Yönetici</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={() => setEditingMember(null)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl">İptal</button>
              <button
                onClick={() => { showToast("Üye bilgileri güncellendi"); setEditingMember(null); }}
                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-colors"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AISettings() {
  const { showToast } = useToast();
  const [autoReply, setAutoReply] = useState(true);
  const [smartRouting, setSmartRouting] = useState(true);
  const [sentimentAnalysis, setSentimentAnalysis] = useState(false);

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
                checked={autoReply}
                onChange={() => { setAutoReply(!autoReply); showToast(autoReply ? "Otomatik cevaplama kapatıldı" : "Otomatik cevaplama açıldı", "info"); }}
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
                checked={smartRouting}
                onChange={() => { setSmartRouting(!smartRouting); showToast(smartRouting ? "Akıllı yönlendirme kapatıldı" : "Akıllı yönlendirme açıldı", "info"); }}
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
                checked={sentimentAnalysis}
                onChange={() => { setSentimentAnalysis(!sentimentAnalysis); showToast(sentimentAnalysis ? "Duygu analizi kapatıldı" : "Duygu analizi açıldı", "info"); }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
            </label>
          </div>
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1 block">AI Yanıt Tonu</label>
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
        <button
          onClick={() => showToast("AI ayarları kaydedildi")}
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
}

function NotificationSettings() {
  const { showToast } = useToast();
  const [notifSettings, setNotifSettings] = useState([
    { label: "Yeni mesaj bildirimleri", desc: "Müşterilerden gelen yeni mesajlar için bildirim al", checked: true },
    { label: "Randevu hatırlatmaları", desc: "Yaklaşan randevular için hatırlatma al", checked: true },
    { label: "Kampanya raporları", desc: "Kampanya performans raporlarını bildir", checked: true },
    { label: "Sipariş güncellemeleri", desc: "Sipariş durumu değişikliklerini bildir", checked: false },
    { label: "AI aktiviteleri", desc: "Yapay zekanın otomatik işlemleri hakkında bildir", checked: true },
    { label: "Sistem güncellemeleri", desc: "Platform güncellemeleri ve bakım bildirimleri", checked: false },
  ]);

  const toggleNotif = (index: number) => {
    setNotifSettings((prev) =>
      prev.map((n, i) => (i === index ? { ...n, checked: !n.checked } : n))
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Bildirim Tercihleri</h3>
        <button
          onClick={() => showToast("Bildirim ayarları kaydedildi")}
          className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          Kaydet
        </button>
      </div>
      <div className="space-y-3">
        {notifSettings.map((n, i) => (
          <div key={n.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-900">{n.label}</p>
              <p className="text-xs text-gray-500">{n.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={n.checked}
                onChange={() => toggleNotif(i)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingSettings() {
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-200 text-sm">Mevcut Plan</p>
            <h3 className="text-2xl font-bold mt-1">Profesyonel</h3>
            <p className="text-purple-200 text-sm mt-2">1.499 TL / ay</p>
          </div>
          <button
            onClick={() => showToast("Plan yükseltme sayfası açılıyor", "info")}
            className="bg-white text-purple-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-purple-50 transition-colors"
          >
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
  const { showToast } = useToast();
  const [twoFA, setTwoFA] = useState(false);

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
          <button
            onClick={() => { setTwoFA(!twoFA); showToast(twoFA ? "2FA devre dışı bırakıldı" : "2FA etkinleştirildi", twoFA ? "warning" : "success"); }}
            className={`text-sm font-medium transition-colors ${twoFA ? "text-red-600 hover:text-red-700" : "text-purple-600 hover:text-purple-700"}`}
          >
            {twoFA ? "Devre Dışı Bırak" : "Etkinleştir"}
          </button>
        </div>
        <button
          onClick={() => showToast("Şifre başarıyla güncellendi")}
          className="px-6 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
}

function APISettings() {
  const { showToast } = useToast();
  const [showProdKey, setShowProdKey] = useState(false);
  const [showTestKey, setShowTestKey] = useState(false);
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [showWebhookModal, setShowWebhookModal] = useState(false);

  const prodKey = "ak_live_x7K9mP2qR5sT8vW1yB4nG6hJ3fL0";
  const testKey = "ak_test_a1B2c3D4e5F6g7H8i9J0k1L2m3N4o5";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Panoya kopyalandı", "info");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">API Anahtarları</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-900">Production API Key</p>
              <p className="text-xs text-gray-400 font-mono">{showProdKey ? prodKey : "ak_live_••••••••••••••••"}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowProdKey(!showProdKey)}
                className="text-xs text-purple-600 font-medium hover:text-purple-700 flex items-center gap-1 transition-colors"
              >
                {showProdKey ? <FiEyeOff className="w-3 h-3" /> : <FiEye className="w-3 h-3" />}
                {showProdKey ? "Gizle" : "Göster"}
              </button>
              <button
                onClick={() => copyToClipboard(prodKey)}
                className="text-xs text-purple-600 font-medium hover:text-purple-700 flex items-center gap-1 transition-colors"
              >
                <FiCopy className="w-3 h-3" /> Kopyala
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-900">Test API Key</p>
              <p className="text-xs text-gray-400 font-mono">{showTestKey ? testKey : "ak_test_••••••••••••••••"}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowTestKey(!showTestKey)}
                className="text-xs text-purple-600 font-medium hover:text-purple-700 flex items-center gap-1 transition-colors"
              >
                {showTestKey ? <FiEyeOff className="w-3 h-3" /> : <FiEye className="w-3 h-3" />}
                {showTestKey ? "Gizle" : "Göster"}
              </button>
              <button
                onClick={() => copyToClipboard(testKey)}
                className="text-xs text-purple-600 font-medium hover:text-purple-700 flex items-center gap-1 transition-colors"
              >
                <FiCopy className="w-3 h-3" /> Kopyala
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowNewKeyModal(true)}
          className="mt-4 flex items-center gap-2 text-sm text-purple-600 font-medium hover:text-purple-700 transition-colors"
        >
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
        <button
          onClick={() => setShowWebhookModal(true)}
          className="flex items-center gap-2 text-sm text-purple-600 font-medium hover:text-purple-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" /> Webhook Ekle
        </button>
      </div>

      {/* New API Key Modal */}
      {showNewKeyModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowNewKeyModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Yeni API Anahtarı</h2>
              <button onClick={() => setShowNewKeyModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><FiX className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Anahtar Adı</label>
                <input type="text" placeholder="Anahtar adı girin" className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Ortam</label>
                <select className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                  <option>Production</option>
                  <option>Test</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={() => setShowNewKeyModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl">İptal</button>
              <button
                onClick={() => { showToast("Yeni API anahtarı oluşturuldu"); setShowNewKeyModal(false); }}
                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-colors"
              >
                Oluştur
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Webhook Modal */}
      {showWebhookModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowWebhookModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Webhook Ekle</h2>
              <button onClick={() => setShowWebhookModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><FiX className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Webhook URL</label>
                <input type="url" placeholder="https://api.ornek.com/webhook" className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Olaylar</label>
                <div className="space-y-2">
                  {["Yeni Mesaj", "Yeni Müşteri", "Sipariş Güncelleme", "Randevu Güncelleme"].map((event) => (
                    <label key={event} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700">{event}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={() => setShowWebhookModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl">İptal</button>
              <button
                onClick={() => { showToast("Webhook başarıyla eklendi"); setShowWebhookModal(false); }}
                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-colors"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
