"use client";

import { useState } from "react";
import {
  FiPlus,
  FiCalendar,
  FiClock,
  FiUser,
  FiMapPin,
  FiVideo,
  FiPhone,
  FiEdit,
  FiTrash2,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { mockAppointments } from "@/lib/mock-data";

const typeConfig: Record<string, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  meeting: { label: "Toplantı", icon: FiUser, color: "bg-blue-100 text-blue-600" },
  call: { label: "Telefon", icon: FiPhone, color: "bg-green-100 text-green-600" },
  demo: { label: "Demo", icon: FiVideo, color: "bg-purple-100 text-purple-600" },
  follow_up: { label: "Takip", icon: FiClock, color: "bg-orange-100 text-orange-600" },
  consultation: { label: "Danışmanlık", icon: FiUser, color: "bg-pink-100 text-pink-600" },
};

const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const hours = Array.from({ length: 12 }, (_, i) => `${(i + 8).toString().padStart(2, "0")}:00`);

export default function AppointmentsPage() {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? mockAppointments
    : mockAppointments.filter((a) => a.status === filter);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Randevular</h1>
          <p className="text-sm text-gray-500 mt-1">{mockAppointments.length} randevu planlandı</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${view === "list" ? "bg-white shadow text-gray-900" : "text-gray-500"}`}
            >
              Liste
            </button>
            <button
              onClick={() => setView("calendar")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${view === "calendar" ? "bg-white shadow text-gray-900" : "text-gray-500"}`}
            >
              Takvim
            </button>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700"
          >
            <FiPlus className="w-4 h-4" /> Yeni Randevu
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { value: "all", label: "Tümü" },
          { value: "scheduled", label: "Planlanmış" },
          { value: "confirmed", label: "Onaylanmış" },
          { value: "completed", label: "Tamamlanmış" },
          { value: "cancelled", label: "İptal" },
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

      {view === "list" ? (
        <div className="space-y-3">
          {filtered.map((apt) => {
            const tc = typeConfig[apt.type] || typeConfig.meeting;
            return (
              <div key={apt.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-16 rounded-xl bg-purple-50 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs text-purple-500 font-medium">{apt.date.split("-")[1]}/{apt.date.split("-")[2]}</span>
                    <span className="text-lg font-bold text-purple-700">{apt.time}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{apt.title}</h3>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${tc.color}`}>{tc.label}</span>
                      <AppointmentStatusBadge status={apt.status} />
                    </div>
                    {apt.description && <p className="text-xs text-gray-500 mb-2">{apt.description}</p>}
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><FiUser className="w-3 h-3" /> {apt.contactName}</span>
                      <span className="flex items-center gap-1"><FiClock className="w-3 h-3" /> {apt.duration} dk</span>
                      {apt.location && <span className="flex items-center gap-1"><FiMapPin className="w-3 h-3" /> {apt.location}</span>}
                      <span className="flex items-center gap-1"><FiUser className="w-3 h-3" /> {apt.assignedTo}</span>
                    </div>
                    {apt.notes && (
                      <p className="text-xs text-gray-400 mt-2 italic border-l-2 border-purple-200 pl-2">{apt.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {apt.status === "scheduled" && (
                      <>
                        <button className="p-1.5 rounded-lg hover:bg-green-50 text-green-500"><FiCheck className="w-4 h-4" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-400"><FiX className="w-4 h-4" /></button>
                      </>
                    )}
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><FiEdit className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"><FiTrash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-8 border-b border-gray-100">
            <div className="p-3 text-xs text-gray-400 font-medium" />
            {days.map((d) => (
              <div key={d} className="p-3 text-center text-xs text-gray-500 font-medium border-l border-gray-100">{d}</div>
            ))}
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-8 border-b border-gray-50">
                <div className="p-3 text-xs text-gray-400 font-medium">{hour}</div>
                {days.map((d) => (
                  <div key={d} className="p-1 border-l border-gray-50 min-h-[48px] hover:bg-purple-50/50 cursor-pointer transition-colors">
                    {mockAppointments.filter((a) => a.time === hour).slice(0, 1).map((a) => (
                      <div key={a.id} className="bg-purple-100 text-purple-700 text-[10px] p-1.5 rounded-lg">
                        <div className="font-semibold truncate">{a.title}</div>
                        <div className="text-purple-500 truncate">{a.contactName}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowCreate(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Yeni Randevu</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Başlık</label>
                <input type="text" placeholder="Randevu başlığı" className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Müşteri</label>
                  <select className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                    <option>Ahmet Yılmaz</option>
                    <option>Fatma Demir</option>
                    <option>Mehmet Kaya</option>
                    <option>Ayşe Özkan</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Tür</label>
                  <select className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                    <option>Toplantı</option>
                    <option>Telefon</option>
                    <option>Demo</option>
                    <option>Takip</option>
                    <option>Danışmanlık</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Tarih</label>
                  <input type="date" className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Saat</label>
                  <input type="time" className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">Süre (dk)</label>
                  <select className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                    <option>15</option>
                    <option>30</option>
                    <option>45</option>
                    <option selected>60</option>
                    <option>90</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Konum</label>
                <input type="text" placeholder="Online link veya fiziksel adres" className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Notlar</label>
                <textarea rows={2} placeholder="Ek notlar..." className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl">İptal</button>
              <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700">Oluştur</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AppointmentStatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; cls: string }> = {
    scheduled: { label: "Planlandı", cls: "bg-yellow-100 text-yellow-700" },
    confirmed: { label: "Onaylandı", cls: "bg-green-100 text-green-700" },
    completed: { label: "Tamamlandı", cls: "bg-blue-100 text-blue-700" },
    cancelled: { label: "İptal", cls: "bg-red-100 text-red-700" },
    no_show: { label: "Gelmedi", cls: "bg-gray-100 text-gray-600" },
  };
  const c = config[status] || config.scheduled;
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.cls}`}>{c.label}</span>;
}
