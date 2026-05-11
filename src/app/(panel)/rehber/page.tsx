"use client";

import { useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiFilter,
  FiDownload,
  FiUpload,
  FiMoreVertical,
  FiMail,
  FiPhone,
  FiEdit,
  FiTrash2,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { mockContacts } from "@/lib/mock-data";
import { ChannelIcon } from "@/components/ChannelIcon";
import { useToast } from "@/components/Toast";
import type { Contact } from "@/types";

const statusOptions = [
  { value: "all", label: "Tümü" },
  { value: "customer", label: "Müşteri" },
  { value: "lead", label: "Lead" },
  { value: "active", label: "Aktif" },
  { value: "inactive", label: "Pasif" },
];

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const { showToast } = useToast();

  const handleDelete = () => {
    showToast(`${selectedContacts.size} kişi silindi`, "warning");
    setSelectedContacts(new Set());
  };

  const filtered = mockContacts.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleSelect = (id: string) => {
    const next = new Set(selectedContacts);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedContacts(next);
  };

  const toggleAll = () => {
    if (selectedContacts.size === filtered.length) setSelectedContacts(new Set());
    else setSelectedContacts(new Set(filtered.map((c) => c.id)));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rehber / CRM</h1>
          <p className="text-sm text-gray-500 mt-1">{mockContacts.length} kişi kayıtlı</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast("İçe aktarma başlatıldı", "info")}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <FiUpload className="w-4 h-4" /> İçe Aktar
          </button>
          <button
            onClick={() => showToast("CSV dosyası indirildi")}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <FiDownload className="w-4 h-4" /> Dışa Aktar
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700"
          >
            <FiPlus className="w-4 h-4" /> Yeni Kişi
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="İsim, e-posta veya telefon ile ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <FiFilter className="w-4 h-4 text-gray-400" />
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStatusFilter(opt.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  statusFilter === opt.value ? "bg-purple-100 text-purple-700" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 border-l border-gray-200 pl-3">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded ${viewMode === "table" ? "bg-purple-100 text-purple-600" : "text-gray-400 hover:text-gray-600"}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${viewMode === "grid" ? "bg-purple-100 text-purple-600" : "text-gray-400 hover:text-gray-600"}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
          </div>
        </div>

        {selectedContacts.size > 0 && (
          <div className="mt-3 flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
            <span className="text-sm text-purple-700 font-medium">{selectedContacts.size} kişi seçildi</span>
            <button
              onClick={() => showToast(`${selectedContacts.size} kişi etiketlendi`)}
              className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
            >
              <FiTag className="w-3 h-3" /> Etiketle
            </button>
            <button
              onClick={() => showToast(`${selectedContacts.size} kişiye mesaj gönderildi`)}
              className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
            >
              <FiMail className="w-3 h-3" /> Mesaj Gönder
            </button>
            <button
              onClick={handleDelete}
              className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
            >
              <FiTrash2 className="w-3 h-3" /> Sil
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {viewMode === "table" ? (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100 bg-gray-50/50">
                <th className="p-4 text-left">
                  <input type="checkbox" checked={selectedContacts.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded" />
                </th>
                <th className="p-4 text-left font-medium">Kişi</th>
                <th className="p-4 text-left font-medium">İletişim</th>
                <th className="p-4 text-left font-medium">Kanal</th>
                <th className="p-4 text-left font-medium">Durum</th>
                <th className="p-4 text-left font-medium">Etiketler</th>
                <th className="p-4 text-left font-medium">Atanan</th>
                <th className="p-4 text-left font-medium">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <input type="checkbox" checked={selectedContacts.has(contact.id)} onChange={() => toggleSelect(contact.id)} className="rounded" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{contact.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                        {contact.company && <p className="text-[10px] text-purple-500">{contact.company}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-600 flex items-center gap-1"><FiPhone className="w-3 h-3" /> {contact.phone}</span>
                    </div>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><FiMail className="w-3 h-3" /> {contact.email}</span>
                  </td>
                  <td className="p-4"><ChannelIcon channel={contact.source} showLabel /></td>
                  <td className="p-4">
                    <StatusBadge status={contact.status} />
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-xs text-gray-500">{contact.assignedTo || "-"}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditingContact(contact)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><FiEdit className="w-3.5 h-3.5" /></button>
                      <button onClick={() => showToast("Kişi seçenekleri", "info")} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><FiMoreVertical className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      )}

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Yeni Kişi Ekle</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Ad Soyad</label>
                  <input type="text" placeholder="Ad Soyad" className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Şirket</label>
                  <input type="text" placeholder="Şirket adı" className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Telefon</label>
                  <input type="tel" placeholder="+90 5XX XXX XXXX" className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">E-posta</label>
                  <input type="email" placeholder="email@ornek.com" className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Kanal</label>
                  <select className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                    <option>WhatsApp</option>
                    <option>Instagram</option>
                    <option>Telegram</option>
                    <option>Facebook</option>
                    <option>E-posta</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Durum</label>
                  <select className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                    <option>Lead</option>
                    <option>Müşteri</option>
                    <option>Aktif</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Notlar</label>
                <textarea rows={3} placeholder="Ek notlar..." className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl">İptal</button>
              <button
                onClick={() => { showToast("Yeni kişi eklendi"); setShowAddModal(false); }}
                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-colors"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Contact Modal */}
      {editingContact && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setEditingContact(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Kişi Düzenle</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Ad Soyad</label>
                  <input type="text" defaultValue={editingContact.name} className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Şirket</label>
                  <input type="text" defaultValue={editingContact.company || ""} className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Telefon</label>
                  <input type="tel" defaultValue={editingContact.phone} className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">E-posta</label>
                  <input type="email" defaultValue={editingContact.email} className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={() => setEditingContact(null)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl">İptal</button>
              <button
                onClick={() => { showToast("Kişi bilgileri güncellendi"); setEditingContact(null); }}
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

function ContactCard({ contact }: { contact: Contact }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
          <span className="text-white font-bold">{contact.name[0]}</span>
        </div>
        <StatusBadge status={contact.status} />
      </div>
      <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">{contact.name}</h3>
      {contact.company && <p className="text-xs text-purple-500 mt-0.5">{contact.company}</p>}
      <div className="mt-3 space-y-1.5">
        <p className="text-xs text-gray-500 flex items-center gap-1.5"><FiPhone className="w-3 h-3" /> {contact.phone}</p>
        <p className="text-xs text-gray-500 flex items-center gap-1.5"><FiMail className="w-3 h-3" /> {contact.email}</p>
      </div>
      <div className="flex items-center gap-1 mt-3">
        {contact.tags.map((tag) => (
          <span key={tag} className="text-[9px] bg-purple-50 text-purple-500 px-2 py-0.5 rounded-full">{tag}</span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <ChannelIcon channel={contact.source} showLabel />
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><FiMail className="w-3.5 h-3.5" /></button>
          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><FiEdit className="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; cls: string }> = {
    customer: { label: "Müşteri", cls: "bg-green-100 text-green-700" },
    lead: { label: "Lead", cls: "bg-blue-100 text-blue-700" },
    active: { label: "Aktif", cls: "bg-purple-100 text-purple-700" },
    inactive: { label: "Pasif", cls: "bg-gray-100 text-gray-500" },
  };
  const c = config[status] || config.active;
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.cls}`}>{c.label}</span>;
}
