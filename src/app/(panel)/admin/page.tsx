"use client";
import { useState } from "react";
import {
  FiUsers, FiBarChart2, FiSettings, FiSearch, FiPlus, FiEdit2, FiTrash2,
  FiCheckCircle, FiXCircle, FiEye, FiStar, FiTrendingUp, FiServer,
  FiShield, FiDollarSign, FiActivity, FiAlertTriangle, FiRefreshCw
} from "react-icons/fi";
import { FaRobot, FaBuilding, FaWhatsapp } from "react-icons/fa";

interface CompanyInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  industry: string;
  plan: string;
  isActive: boolean;
  userCount: number;
  contactCount: number;
  conversationCount: number;
  revenue: number;
  createdAt: string;
}

const mockCompanies: CompanyInfo[] = [
  { id: "1", name: "AIZEN Demo Şirketi", email: "demo@aizenchat.com", phone: "+90 212 555 0001", industry: "Teknoloji", plan: "professional", isActive: true, userCount: 3, contactCount: 8, conversationCount: 6, revenue: 17494, createdAt: "2026-01-15" },
  { id: "2", name: "Yıldız Ticaret A.Ş.", email: "info@yildiz.com", phone: "+90 216 444 0002", industry: "Perakende", plan: "enterprise", isActive: true, userCount: 12, contactCount: 450, conversationCount: 1200, revenue: 89500, createdAt: "2026-02-01" },
  { id: "3", name: "Deniz Lojistik", email: "info@denizlojistik.com", phone: "+90 232 333 0003", industry: "Lojistik", plan: "starter", isActive: true, userCount: 2, contactCount: 35, conversationCount: 80, revenue: 4500, createdAt: "2026-03-10" },
  { id: "4", name: "Akış Medya", email: "info@akismedya.com", phone: "+90 312 222 0004", industry: "Medya", plan: "professional", isActive: false, userCount: 5, contactCount: 120, conversationCount: 350, revenue: 15000, createdAt: "2026-01-20" },
  { id: "5", name: "Mega Sağlık", email: "info@megasaglik.com", phone: "+90 242 111 0005", industry: "Sağlık", plan: "enterprise", isActive: true, userCount: 8, contactCount: 280, conversationCount: 750, revenue: 67000, createdAt: "2026-02-15" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "companies" | "system">("overview");
  const [companies] = useState<CompanyInfo[]>(mockCompanies);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<CompanyInfo | null>(null);

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = companies.reduce((sum, c) => sum + c.revenue, 0);
  const totalUsers = companies.reduce((sum, c) => sum + c.userCount, 0);
  const totalContacts = companies.reduce((sum, c) => sum + c.contactCount, 0);
  const activeCompanies = companies.filter((c) => c.isActive).length;

  const getPlanBadge = (plan: string) => {
    const styles: Record<string, string> = {
      starter: "bg-gray-500/10 text-gray-400",
      professional: "bg-purple-500/10 text-purple-400",
      enterprise: "bg-yellow-500/10 text-yellow-400",
    };
    const labels: Record<string, string> = {
      starter: "Başlangıç",
      professional: "Profesyonel",
      enterprise: "Kurumsal",
    };
    return <span className={`px-2 py-0.5 rounded-full text-xs ${styles[plan]}`}>{labels[plan]}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Süper Admin Paneli</h1>
          <p className="text-gray-400 text-sm mt-1">Tüm şirketleri ve sistemi yönetin</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm">
            <FiPlus size={16} />
            Yeni Şirket Ekle
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#1e1e2e] p-1 rounded-xl border border-gray-800 w-fit">
        {[
          { id: "overview" as const, label: "Genel Bakış", icon: FiBarChart2 },
          { id: "companies" as const, label: "Şirketler", icon: FaBuilding },
          { id: "system" as const, label: "Sistem", icon: FiServer },
        ].map((tab) => (
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

      {activeTab === "overview" && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Toplam Şirket", value: companies.length.toString(), sub: `${activeCompanies} aktif`, icon: FaBuilding, color: "text-blue-400", bg: "bg-blue-500/10" },
              { label: "Toplam Kullanıcı", value: totalUsers.toString(), sub: "Tüm şirketler", icon: FiUsers, color: "text-green-400", bg: "bg-green-500/10" },
              { label: "Toplam Kişi", value: totalContacts.toLocaleString(), sub: "CRM kayıtları", icon: FiUsers, color: "text-purple-400", bg: "bg-purple-500/10" },
              { label: "Toplam Gelir", value: `₺${totalRevenue.toLocaleString()}`, sub: "Aylık", icon: FiDollarSign, color: "text-yellow-400", bg: "bg-yellow-500/10" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#1e1e2e] rounded-xl p-5 border border-gray-800">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                    <stat.icon className={stat.color} size={20} />
                  </div>
                  <FiTrendingUp className="text-green-400" size={16} />
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                <p className="text-gray-600 text-xs mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Plan Distribution & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#1e1e2e] rounded-xl border border-gray-800 p-6">
              <h3 className="text-white font-medium mb-4">Plan Dağılımı</h3>
              <div className="space-y-4">
                {["enterprise", "professional", "starter"].map((plan) => {
                  const count = companies.filter((c) => c.plan === plan).length;
                  const percentage = Math.round((count / companies.length) * 100);
                  const colors: Record<string, string> = { enterprise: "bg-yellow-500", professional: "bg-purple-500", starter: "bg-gray-500" };
                  const labels: Record<string, string> = { enterprise: "Kurumsal", professional: "Profesyonel", starter: "Başlangıç" };
                  return (
                    <div key={plan}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">{labels[plan]}</span>
                        <span className="text-white">{count} şirket ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className={`${colors[plan]} h-2 rounded-full`} style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#1e1e2e] rounded-xl border border-gray-800 p-6">
              <h3 className="text-white font-medium mb-4">Son Aktiviteler</h3>
              <div className="space-y-3">
                {[
                  { text: "Yıldız Ticaret yeni bir kampanya başlattı", time: "2 saat önce", icon: FiActivity, color: "text-green-400" },
                  { text: "Mega Sağlık enterprise plana yükseltildi", time: "5 saat önce", icon: FiStar, color: "text-yellow-400" },
                  { text: "Akış Medya hesabı askıya alındı", time: "1 gün önce", icon: FiAlertTriangle, color: "text-red-400" },
                  { text: "Deniz Lojistik yeni kullanıcı ekledi", time: "2 gün önce", icon: FiUsers, color: "text-blue-400" },
                  { text: "AIZEN Demo AI sesli desteği aktifleştirdi", time: "3 gün önce", icon: FaRobot, color: "text-cyan-400" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 p-2">
                    <activity.icon className={activity.color} size={16} />
                    <div className="flex-1">
                      <p className="text-gray-300 text-sm">{activity.text}</p>
                      <p className="text-gray-600 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "companies" && (
        <div className="bg-[#1e1e2e] rounded-xl border border-gray-800">
          <div className="p-4 border-b border-gray-800">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Şirket ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white text-sm placeholder-gray-500"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 text-left">
                  <th className="px-4 py-3 text-gray-400 text-xs font-medium">Şirket</th>
                  <th className="px-4 py-3 text-gray-400 text-xs font-medium">Sektör</th>
                  <th className="px-4 py-3 text-gray-400 text-xs font-medium">Plan</th>
                  <th className="px-4 py-3 text-gray-400 text-xs font-medium">Kullanıcı</th>
                  <th className="px-4 py-3 text-gray-400 text-xs font-medium">Kişi</th>
                  <th className="px-4 py-3 text-gray-400 text-xs font-medium">Gelir</th>
                  <th className="px-4 py-3 text-gray-400 text-xs font-medium">Durum</th>
                  <th className="px-4 py-3 text-gray-400 text-xs font-medium">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-800/30 transition">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-white text-sm font-medium">{company.name}</p>
                        <p className="text-gray-500 text-xs">{company.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{company.industry}</td>
                    <td className="px-4 py-3">{getPlanBadge(company.plan)}</td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{company.userCount}</td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{company.contactCount}</td>
                    <td className="px-4 py-3 text-white text-sm">₺{company.revenue.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {company.isActive ? (
                        <span className="flex items-center gap-1 text-green-400 text-xs"><FiCheckCircle size={12} /> Aktif</span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-400 text-xs"><FiXCircle size={12} /> Pasif</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setSelectedCompany(company)} className="p-1.5 text-gray-400 hover:text-white"><FiEye size={14} /></button>
                        <button className="p-1.5 text-gray-400 hover:text-blue-400"><FiEdit2 size={14} /></button>
                        <button className="p-1.5 text-gray-400 hover:text-red-400"><FiTrash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "system" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#1e1e2e] rounded-xl border border-gray-800 p-6">
            <h3 className="text-white font-medium mb-4">Sistem Durumu</h3>
            <div className="space-y-3">
              {[
                { label: "API Sunucusu", status: "Çalışıyor", icon: FiServer, ok: true },
                { label: "Veritabanı", status: "Bağlı", icon: FiActivity, ok: true },
                { label: "WebSocket", status: "Aktif", icon: FiRefreshCw, ok: true },
                { label: "AI Ses Motoru", status: "Hazır", icon: FaRobot, ok: true },
                { label: "WhatsApp API", status: "Bağlı", icon: FaWhatsapp, ok: true },
                { label: "SSL Sertifika", status: "Geçerli", icon: FiShield, ok: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <item.icon className="text-gray-400" size={16} />
                    <span className="text-gray-300 text-sm">{item.label}</span>
                  </div>
                  <span className={`flex items-center gap-1 text-sm ${item.ok ? "text-green-400" : "text-red-400"}`}>
                    {item.ok ? <FiCheckCircle size={14} /> : <FiXCircle size={14} />}
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1e1e2e] rounded-xl border border-gray-800 p-6">
            <h3 className="text-white font-medium mb-4">Kaynak Kullanımı</h3>
            <div className="space-y-4">
              {[
                { label: "CPU", value: 23, max: "2 vCPU" },
                { label: "RAM", value: 45, max: "4 GB" },
                { label: "Disk", value: 12, max: "50 GB" },
                { label: "Bant Genişliği", value: 34, max: "100 Mbps" },
              ].map((res) => (
                <div key={res.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{res.label}</span>
                    <span className="text-white">{res.value}% <span className="text-gray-500">/ {res.max}</span></span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${res.value > 80 ? "bg-red-500" : res.value > 60 ? "bg-yellow-500" : "bg-green-500"}`}
                      style={{ width: `${res.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Company Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e2e] rounded-2xl border border-gray-800 w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-medium text-lg">{selectedCompany.name}</h3>
              <button onClick={() => setSelectedCompany(null)} className="p-2 text-gray-400 hover:text-white">
                <FiXCircle size={20} />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-400">E-posta</span><span className="text-white">{selectedCompany.email}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Telefon</span><span className="text-white">{selectedCompany.phone}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Sektör</span><span className="text-white">{selectedCompany.industry}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Plan</span>{getPlanBadge(selectedCompany.plan)}</div>
              <div className="flex justify-between"><span className="text-gray-400">Durum</span><span className={selectedCompany.isActive ? "text-green-400" : "text-red-400"}>{selectedCompany.isActive ? "Aktif" : "Pasif"}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Kullanıcılar</span><span className="text-white">{selectedCompany.userCount}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Kişiler</span><span className="text-white">{selectedCompany.contactCount}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Görüşmeler</span><span className="text-white">{selectedCompany.conversationCount}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Gelir</span><span className="text-white">₺{selectedCompany.revenue.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Kayıt Tarihi</span><span className="text-white">{selectedCompany.createdAt}</span></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">Düzenle</button>
              <button className={`flex-1 px-4 py-2 ${selectedCompany.isActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"} text-white rounded-lg text-sm`}>
                {selectedCompany.isActive ? "Askıya Al" : "Aktifleştir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
