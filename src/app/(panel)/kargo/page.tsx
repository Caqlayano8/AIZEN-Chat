"use client";

import { useState } from "react";
import {
  FiPackage,
  FiTruck,
  FiCheck,
  FiClock,
  FiAlertCircle,
  FiSearch,
  FiFilter,
  FiEye,
  FiX,
  FiMapPin,
  FiUser,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";
import { mockOrders } from "@/lib/mock-data";
import type { Order } from "@/types";

const statusConfig: Record<string, { label: string; cls: string; icon: React.ComponentType<{ className?: string }> }> = {
  pending: { label: "Bekliyor", cls: "bg-yellow-100 text-yellow-700", icon: FiClock },
  confirmed: { label: "Onaylandı", cls: "bg-blue-100 text-blue-700", icon: FiCheck },
  processing: { label: "İşleniyor", cls: "bg-indigo-100 text-indigo-700", icon: FiPackage },
  shipped: { label: "Kargoda", cls: "bg-purple-100 text-purple-700", icon: FiTruck },
  delivered: { label: "Teslim Edildi", cls: "bg-green-100 text-green-700", icon: FiCheck },
  cancelled: { label: "İptal", cls: "bg-red-100 text-red-700", icon: FiX },
  returned: { label: "İade", cls: "bg-gray-100 text-gray-600", icon: FiAlertCircle },
};

export default function CargoPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = mockOrders.filter((o) => {
    const matchSearch = o.orderNumber.toLowerCase().includes(search.toLowerCase()) || o.contactName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = mockOrders.reduce((a, o) => a + o.totalAmount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sipariş & Kargo Takip</h1>
          <p className="text-sm text-gray-500 mt-1">{mockOrders.length} sipariş</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Toplam Sipariş", value: mockOrders.length, icon: FiPackage, color: "from-blue-500 to-indigo-600" },
          { label: "Kargoda", value: mockOrders.filter((o) => o.status === "shipped").length, icon: FiTruck, color: "from-purple-500 to-violet-600" },
          { label: "Teslim Edilen", value: mockOrders.filter((o) => o.status === "delivered").length, icon: FiCheck, color: "from-green-500 to-emerald-600" },
          { label: "Bekleyen", value: mockOrders.filter((o) => o.status === "pending" || o.status === "confirmed" || o.status === "processing").length, icon: FiClock, color: "from-yellow-500 to-orange-500" },
          { label: "Toplam Gelir", value: `${(totalRevenue / 1000).toFixed(0)}K TRY`, icon: FiDollarSign, color: "from-pink-500 to-rose-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-2`}>
              <s.icon className="w-4 h-4 text-white" />
            </div>
            <div className="text-xl font-bold text-gray-900">{s.value}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Sipariş no veya müşteri adıyla ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <FiFilter className="w-4 h-4 text-gray-400" />
            {[
              { value: "all", label: "Tümü" },
              { value: "pending", label: "Bekliyor" },
              { value: "shipped", label: "Kargoda" },
              { value: "delivered", label: "Teslim" },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  statusFilter === f.value ? "bg-purple-100 text-purple-700" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-500 border-b border-gray-100 bg-gray-50/50">
              <th className="text-left p-4 font-medium">Sipariş No</th>
              <th className="text-left p-4 font-medium">Müşteri</th>
              <th className="text-left p-4 font-medium">Ürünler</th>
              <th className="text-left p-4 font-medium">Tutar</th>
              <th className="text-left p-4 font-medium">Durum</th>
              <th className="text-left p-4 font-medium">Kargo</th>
              <th className="text-left p-4 font-medium">Tarih</th>
              <th className="text-left p-4 font-medium">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((order) => {
              const sc = statusConfig[order.status] || statusConfig.pending;
              return (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <span className="text-sm font-medium text-purple-600">{order.orderNumber}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">{order.contactName[0]}</span>
                      </div>
                      <span className="text-sm text-gray-700">{order.contactName}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-xs text-gray-600">
                      {order.products.map((p) => `${p.name} x${p.quantity}`).join(", ")}
                    </div>
                  </td>
                  <td className="p-4 text-sm font-semibold text-gray-900">
                    {order.totalAmount.toLocaleString("tr-TR")} {order.currency}
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1 ${sc.cls}`}>
                      <sc.icon className="w-3 h-3" /> {sc.label}
                    </span>
                  </td>
                  <td className="p-4">
                    {order.trackingNumber ? (
                      <div>
                        <p className="text-xs text-gray-600">{order.carrier}</p>
                        <p className="text-[10px] text-purple-500 font-mono">{order.trackingNumber}</p>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">-</span>
                    )}
                  </td>
                  <td className="p-4 text-xs text-gray-500">{order.createdAt}</td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Sipariş Detayı</h2>
                <p className="text-sm text-purple-600 font-medium">{selectedOrder.orderNumber}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-lg"><FiX className="w-5 h-5" /></button>
            </div>

            {/* Order Tracking */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Sipariş Durumu</h3>
              <div className="flex items-center gap-0">
                {["pending", "confirmed", "processing", "shipped", "delivered"].map((step, i, arr) => {
                  const isActive = arr.indexOf(selectedOrder.status) >= i;
                  const isCurrent = selectedOrder.status === step;
                  return (
                    <div key={step} className="flex-1 flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isActive ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-400"} ${isCurrent ? "ring-4 ring-purple-200" : ""}`}>
                        {isActive ? <FiCheck className="w-4 h-4" /> : <span className="text-xs">{i + 1}</span>}
                      </div>
                      {i < arr.length - 1 && (
                        <div className={`flex-1 h-1 ${arr.indexOf(selectedOrder.status) > i ? "bg-purple-600" : "bg-gray-200"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-2">
                {["Bekliyor", "Onay", "İşlem", "Kargo", "Teslim"].map((l) => (
                  <span key={l} className="text-[10px] text-gray-400 text-center flex-1">{l}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FiUser className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500 font-medium">Müşteri</span>
                </div>
                <p className="text-sm font-medium text-gray-900">{selectedOrder.contactName}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FiMapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500 font-medium">Teslimat Adresi</span>
                </div>
                <p className="text-sm text-gray-700">{selectedOrder.shippingAddress}</p>
              </div>
            </div>

            {selectedOrder.trackingNumber && (
              <div className="bg-purple-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <FiTruck className="w-4 h-4 text-purple-500" />
                  <span className="text-xs text-purple-600 font-medium">Kargo Bilgileri</span>
                </div>
                <p className="text-sm text-gray-700">{selectedOrder.carrier} - <span className="font-mono text-purple-600">{selectedOrder.trackingNumber}</span></p>
                {selectedOrder.estimatedDelivery && (
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <FiCalendar className="w-3 h-3" /> Tahmini Teslim: {selectedOrder.estimatedDelivery}
                  </p>
                )}
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Ürünler</h3>
              <div className="space-y-2">
                {selectedOrder.products.map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm text-gray-900">{p.name}</p>
                      {p.sku && <p className="text-[10px] text-gray-400">SKU: {p.sku}</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{(p.price * p.quantity).toLocaleString("tr-TR")} TRY</p>
                      <p className="text-[10px] text-gray-500">{p.quantity} adet x {p.price.toLocaleString("tr-TR")} TRY</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                <span className="text-sm font-semibold text-gray-700">Toplam</span>
                <span className="text-lg font-bold text-gray-900">{selectedOrder.totalAmount.toLocaleString("tr-TR")} {selectedOrder.currency}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
