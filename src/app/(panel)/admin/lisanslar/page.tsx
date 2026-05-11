"use client";
import { useState } from "react";
import {
  FiKey, FiPlus, FiSearch, FiCopy, FiCheckCircle, FiXCircle,
  FiTrash2, FiEye, FiRefreshCw, FiShield, FiUsers, FiDatabase, FiZap
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";

interface License {
  id: string;
  key: string;
  companyName: string;
  companyEmail: string;
  plan: "starter" | "professional" | "enterprise";
  maxUsers: number;
  maxContacts: number;
  maxChannels: number;
  features: string[];
  isActive: boolean;
  issuedAt: string;
  expiresAt: string;
}

const mockLicenses: License[] = [
  { id: "1", key: "PRO-A3F2-B8C1-D4E5-F6A7", companyName: "AIZEN Demo Şirketi", companyEmail: "demo@aizenchat.com", plan: "professional", maxUsers: 15, maxContacts: 5000, maxChannels: 5, features: ["messaging", "contacts", "notifications", "campaigns", "appointments", "orders", "voice_support", "ai_suggestions"], isActive: true, issuedAt: "2026-01-15", expiresAt: "2027-01-15" },
  { id: "2", key: "ENT-C9D8-E7F6-A5B4-C3D2", companyName: "Yıldız Ticaret A.Ş.", companyEmail: "info@yildiz.com", plan: "enterprise", maxUsers: 100, maxContacts: 50000, maxChannels: 10, features: ["messaging", "contacts", "notifications", "campaigns", "appointments", "orders", "voice_support", "ai_suggestions", "ai_voice", "call_routing", "api_access", "white_label", "priority_support"], isActive: true, issuedAt: "2026-02-01", expiresAt: "2027-02-01" },
  { id: "3", key: "STR-F1E2-D3C4-B5A6-9807", companyName: "Deniz Lojistik", companyEmail: "info@denizlojistik.com", plan: "starter", maxUsers: 3, maxContacts: 500, maxChannels: 2, features: ["messaging", "contacts", "notifications"], isActive: true, issuedAt: "2026-03-10", expiresAt: "2027-03-10" },
  { id: "4", key: "PRO-8765-4321-ABCD-EF01", companyName: "Akış Medya", companyEmail: "info@akismedya.com", plan: "professional", maxUsers: 15, maxContacts: 5000, maxChannels: 5, features: ["messaging", "contacts", "notifications", "campaigns", "appointments", "orders", "voice_support", "ai_suggestions"], isActive: false, issuedAt: "2026-01-20", expiresAt: "2026-07-20" },
  { id: "5", key: "ENT-2468-ACEF-1357-BDF9", companyName: "Mega Sağlık", companyEmail: "info@megasaglik.com", plan: "enterprise", maxUsers: 100, maxContacts: 50000, maxChannels: 10, features: ["messaging", "contacts", "notifications", "campaigns", "appointments", "orders", "voice_support", "ai_suggestions", "ai_voice", "call_routing", "api_access", "white_label", "priority_support"], isActive: true, issuedAt: "2026-02-15", expiresAt: "2027-02-15" },
];

const planConfig = {
  starter: { label: "Başlangıç", color: "text-gray-400", bg: "bg-gray-500/10", border: "border-gray-600" },
  professional: { label: "Profesyonel", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-600" },
  enterprise: { label: "Kurumsal", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-600" },
};

const featureLabels: Record<string, string> = {
  messaging: "Mesajlaşma", contacts: "Rehber/CRM", notifications: "Bildirimler", campaigns: "Kampanyalar",
  appointments: "Randevular", orders: "Siparişler", voice_support: "Sesli Destek", ai_suggestions: "AI Önerileri",
  ai_voice: "AI Ses Modülü", call_routing: "Çağrı Yönlendirme", api_access: "API Erişimi",
  white_label: "Beyaz Etiket", priority_support: "Öncelikli Destek",
};

export default function LisanslarPage() {
  const [licenses] = useState<License[]>(mockLicenses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [genPlan, setGenPlan] = useState<"starter" | "professional" | "enterprise">("professional");
  const [genDuration, setGenDuration] = useState(12);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filtered = licenses.filter((l) =>
    l.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const activeLicenses = licenses.filter((l) => l.isActive).length;
  const expiredLicenses = licenses.filter((l) => !l.isActive).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Lisans Yönetimi</h1>
          <p className="text-gray-400 text-sm mt-1">Lisans anahtarları oluşturun ve yönetin</p>
        </div>
        <button onClick={() => setShowGenerator(true)} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm">
          <FiPlus size={16} /> Yeni Lisans Oluştur
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Toplam Lisans", value: licenses.length.toString(), icon: FiKey, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Aktif", value: activeLicenses.toString(), icon: FiCheckCircle, color: "text-green-400", bg: "bg-green-500/10" },
          { label: "Süresi Dolmuş", value: expiredLicenses.toString(), icon: FiXCircle, color: "text-red-400", bg: "bg-red-500/10" },
          { label: "Kurumsal", value: licenses.filter((l) => l.plan === "enterprise").length.toString(), icon: FiShield, color: "text-yellow-400", bg: "bg-yellow-500/10" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#1e1e2e] rounded-xl p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">{stat.label}</span>
              <div className={`p-2 rounded-lg ${stat.bg}`}><stat.icon className={stat.color} size={16} /></div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-[#1e1e2e] rounded-xl border border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input type="text" placeholder="Lisans anahtarı veya şirket ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white text-sm placeholder-gray-500" />
          </div>
        </div>
        <div className="divide-y divide-gray-800">
          {filtered.map((license) => {
            const plan = planConfig[license.plan];
            return (
              <div key={license.id} className="p-4 hover:bg-gray-800/30 transition">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${plan.bg}`}><FiKey className={plan.color} size={18} /></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-medium">{license.companyName}</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${plan.bg} ${plan.color}`}>{plan.label}</span>
                        {!license.isActive && <span className="px-2 py-0.5 rounded-full text-xs bg-red-500/10 text-red-400">Pasif</span>}
                      </div>
                      <p className="text-gray-500 text-xs">{license.companyEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSelectedLicense(license)} className="p-1.5 text-gray-400 hover:text-white"><FiEye size={14} /></button>
                    <button onClick={() => copyKey(license.key)} className="p-1.5 text-gray-400 hover:text-purple-400">
                      {copiedKey === license.key ? <FiCheckCircle size={14} className="text-green-400" /> : <FiCopy size={14} />}
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-400"><FiTrash2 size={14} /></button>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <code className="px-3 py-1 bg-gray-800 rounded-lg text-gray-300 font-mono text-xs tracking-wider">{license.key}</code>
                  </div>
                  <div className="flex items-center gap-4 text-gray-500 text-xs ml-auto">
                    <span className="flex items-center gap-1"><FiUsers size={12} /> {license.maxUsers} kullanıcı</span>
                    <span className="flex items-center gap-1"><FiDatabase size={12} /> {license.maxContacts.toLocaleString()} kişi</span>
                    <span className="flex items-center gap-1"><FiZap size={12} /> {license.maxChannels} kanal</span>
                    <span>Bitiş: {license.expiresAt}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* License Detail Modal */}
      {selectedLicense && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e2e] rounded-2xl border border-gray-800 w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-medium text-lg">Lisans Detayı</h3>
              <button onClick={() => setSelectedLicense(null)} className="p-2 text-gray-400 hover:text-white"><FiXCircle size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <p className="text-gray-500 text-xs mb-1">Lisans Anahtarı</p>
                <div className="flex items-center gap-2">
                  <code className="text-purple-400 font-mono text-sm tracking-wider flex-1">{selectedLicense.key}</code>
                  <button onClick={() => copyKey(selectedLicense.key)} className="p-1.5 text-gray-400 hover:text-purple-400">
                    {copiedKey === selectedLicense.key ? <FiCheckCircle size={14} className="text-green-400" /> : <FiCopy size={14} />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-500 block text-xs">Şirket</span><span className="text-white">{selectedLicense.companyName}</span></div>
                <div><span className="text-gray-500 block text-xs">Plan</span><span className={planConfig[selectedLicense.plan].color}>{planConfig[selectedLicense.plan].label}</span></div>
                <div><span className="text-gray-500 block text-xs">Maks. Kullanıcı</span><span className="text-white">{selectedLicense.maxUsers}</span></div>
                <div><span className="text-gray-500 block text-xs">Maks. Kişi</span><span className="text-white">{selectedLicense.maxContacts.toLocaleString()}</span></div>
                <div><span className="text-gray-500 block text-xs">Maks. Kanal</span><span className="text-white">{selectedLicense.maxChannels}</span></div>
                <div><span className="text-gray-500 block text-xs">Durum</span><span className={selectedLicense.isActive ? "text-green-400" : "text-red-400"}>{selectedLicense.isActive ? "Aktif" : "Pasif"}</span></div>
                <div><span className="text-gray-500 block text-xs">Başlangıç</span><span className="text-white">{selectedLicense.issuedAt}</span></div>
                <div><span className="text-gray-500 block text-xs">Bitiş</span><span className="text-white">{selectedLicense.expiresAt}</span></div>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-2">Özellikler</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedLicense.features.map((f) => (
                    <span key={f} className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs">{featureLabels[f] || f}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm flex items-center justify-center gap-2"><FiRefreshCw size={14} /> Yenile</button>
              <button className={`flex-1 px-4 py-2 ${selectedLicense.isActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"} text-white rounded-lg text-sm`}>
                {selectedLicense.isActive ? "Devre Dışı Bırak" : "Aktifleştir"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* License Generator Modal */}
      {showGenerator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e2e] rounded-2xl border border-gray-800 w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-medium text-lg">Yeni Lisans Oluştur</h3>
              <button onClick={() => setShowGenerator(false)} className="p-2 text-gray-400 hover:text-white"><FiXCircle size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Şirket Seçin</label>
                <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
                  <option>AIZEN Demo Şirketi</option>
                  <option>Yıldız Ticaret A.Ş.</option>
                  <option>Deniz Lojistik</option>
                  <option>Akış Medya</option>
                  <option>Mega Sağlık</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">Plan</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["starter", "professional", "enterprise"] as const).map((plan) => (
                    <button
                      key={plan}
                      onClick={() => setGenPlan(plan)}
                      className={`p-3 rounded-xl border text-center transition ${
                        genPlan === plan
                          ? `${planConfig[plan].bg} ${planConfig[plan].border} border-2`
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <p className={`text-sm font-medium ${planConfig[plan].color}`}>{planConfig[plan].label}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {plan === "starter" ? "3 kullanıcı" : plan === "professional" ? "15 kullanıcı" : "100 kullanıcı"}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">Süre (Ay)</label>
                <div className="flex gap-2">
                  {[1, 3, 6, 12, 24].map((m) => (
                    <button
                      key={m}
                      onClick={() => setGenDuration(m)}
                      className={`px-3 py-2 rounded-lg text-sm ${genDuration === m ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}
                    >
                      {m} ay
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-gray-800/50 rounded-lg text-sm">
                <p className="text-gray-400 mb-1">Oluşturulacak anahtar formatı:</p>
                <code className="text-purple-400 font-mono text-xs">
                  {genPlan === "enterprise" ? "ENT" : genPlan === "professional" ? "PRO" : "STR"}-XXXX-XXXX-XXXX-XXXX
                </code>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowGenerator(false)} className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 text-sm">İptal</button>
              <button onClick={() => setShowGenerator(false)} className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm flex items-center justify-center gap-2">
                <FiKey size={14} /> Lisans Oluştur
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
