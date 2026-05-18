"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  FiSearch,
  FiFilter,
  FiSend,
  FiPaperclip,
  FiSmile,
  FiMoreVertical,
  FiPhone,
  FiVideo,
  FiStar,
  FiUser,
  FiZap,
  FiCheck,
  FiCheckCircle,
  FiMic,
  FiImage,
  FiX,
  FiMessageSquare,
  FiLoader,
} from "react-icons/fi";
import { ChannelIcon } from "@/components/ChannelIcon";
import { useToast } from "@/components/Toast";
import type { Contact, Message, ChannelType } from "@/types";

const channelFilters: { value: string; label: string }[] = [
  { value: "all", label: "Tümü" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "instagram", label: "Instagram" },
  { value: "telegram", label: "Telegram" },
  { value: "facebook", label: "Facebook" },
  { value: "email", label: "E-posta" },
  { value: "webchat", label: "Web Chat" },
];

export default function MessagesPage() {
  const { data: session } = useSession();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [channelFilter, setChannelFilter] = useState("all");
  const [showAI, setShowAI] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [starred, setStarred] = useState<Set<string>>(new Set());
  const [localMessages, setLocalMessages] = useState<Record<string, Message[]>>({});
  const [loadingData, setLoadingData] = useState(true);
  const { showToast } = useToast();
  const companyId = (session?.user as Record<string, unknown>)?.companyId as string;

  useEffect(() => {
    if (!companyId) { setLoadingData(false); return; }
    fetch(`/api/contacts?companyId=${companyId}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mapped: Contact[] = data.map((c: Record<string, unknown>) => ({
            id: c.id as string,
            name: c.name as string || "",
            phone: c.phone as string || "",
            email: c.email as string || "",
            avatar: "",
            company: "",
            tags: c.tags ? JSON.parse(c.tags as string) : [],
            source: ((c.source as string) || "whatsapp") as Contact["source"],
            status: ((c.status as string) || "active") as Contact["status"],
            lastMessage: "",
            lastMessageTime: "",
            unreadCount: 0,
            assignedTo: "",
            createdAt: c.createdAt ? new Date(c.createdAt as string).toLocaleDateString("tr-TR") : "",
          }));
          setContacts(mapped);
          if (mapped.length > 0) setSelectedContact(mapped[0]);
        }
      })
      .catch(console.error)
      .finally(() => setLoadingData(false));
  }, [companyId]);

  useEffect(() => {
    if (!selectedContact || !companyId) return;
    fetch(`/api/conversations?companyId=${companyId}`)
      .then((r) => r.json())
      .then((convs) => {
        if (!Array.isArray(convs)) return;
        const conv = convs.find((c: Record<string, unknown>) => c.contactId === selectedContact.id);
        if (conv) {
          fetch(`/api/messages?conversationId=${(conv as Record<string, unknown>).id}`)
            .then((r) => r.json())
            .then((msgs) => {
              if (Array.isArray(msgs)) {
                const mapped: Message[] = msgs.map((m: Record<string, unknown>) => ({
                  id: m.id as string,
                  contactId: selectedContact.id,
                  sender: ((m.sender as string) || "contact") as Message["sender"],
                  content: (m.content as string) || "",
                  type: "text" as Message["type"],
                  channel: ((m.channel as string) || "whatsapp") as Message["channel"],
                  timestamp: m.createdAt ? new Date(m.createdAt as string).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }) : "",
                  status: ((m.status as string) || "delivered") as Message["status"],
                }));
                setLocalMessages((prev) => ({ ...prev, [selectedContact.id]: mapped }));
              }
            });
        }
      })
      .catch(console.error);
  }, [selectedContact, companyId]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedContact) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      contactId: selectedContact.id,
      sender: "agent",
      content: messageInput,
      type: "text",
      channel: selectedContact.source,
      timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };
    setLocalMessages((prev) => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMsg],
    }));
    setMessageInput("");
  };

  const toggleStar = () => {
    if (!selectedContact) return;
    const next = new Set(starred);
    if (next.has(selectedContact.id)) { next.delete(selectedContact.id); showToast("Yıldız kaldırıldı", "info"); }
    else { next.add(selectedContact.id); showToast("Görüşme yıldızlandı"); }
    setStarred(next);
  };

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChannel = channelFilter === "all" || c.source === channelFilter;
    return matchesSearch && matchesChannel;
  });

  const messages = selectedContact ? localMessages[selectedContact.id] || [] : [];

  const aiSuggestions = [
    "Merhaba! Size nasıl yardımcı olabilirim?",
    "Siparişiniz kargoya verildi. Takip numaranız: TR...",
    "Randevu talebinizi aldık. En kısa sürede dönüş yapacağız.",
    "Kampanyamızdan yararlanmak için son 3 gün!",
  ];

  if (loadingData) {
    return (
      <div className="flex items-center justify-center h-64">
        <FiLoader className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-7rem)] bg-white rounded-2xl border border-gray-100 overflow-hidden animate-fade-in">
      {/* Contact List */}
      <div className="w-96 border-r border-gray-100 flex flex-col">
        {/* Search & Filter */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative mb-3">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Kişi ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-thin pb-1">
            {channelFilters.map((ch) => (
              <button
                key={ch.value}
                onClick={() => setChannelFilter(ch.value)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  channelFilter === ch.value
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {ch.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => { setSelectedContact(contact); setShowContactInfo(false); }}
              className={`w-full text-left p-4 flex items-start gap-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                selectedContact?.id === contact.id ? "bg-purple-50/50 border-l-2 border-l-purple-500" : ""
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{contact.name[0]}</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5">
                  <ChannelIcon channel={contact.source} size="sm" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900 truncate">{contact.name}</span>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">{contact.lastMessageTime}</span>
                </div>
                {contact.company && (
                  <p className="text-[10px] text-purple-500 font-medium">{contact.company}</p>
                )}
                <p className="text-xs text-gray-500 truncate mt-0.5">{contact.lastMessage}</p>
                <div className="flex items-center gap-1 mt-1">
                  {contact.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
              {contact.unreadCount > 0 && (
                <span className="w-5 h-5 bg-purple-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  {contact.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedContact ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-gray-100 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">{selectedContact.name[0]}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-900">{selectedContact.name}</h3>
                  <ChannelIcon channel={selectedContact.source} size="sm" showLabel />
                </div>
                <p className="text-xs text-gray-500">
                  {selectedContact.status === "customer" ? "Müşteri" : selectedContact.status === "lead" ? "Lead" : "Aktif"}
                  {selectedContact.company && ` • ${selectedContact.company}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => showToast("Sesli arama başlatılıyor...", "info")} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"><FiPhone className="w-4 h-4" /></button>
              <button onClick={() => showToast("Görüntülü arama başlatılıyor...", "info")} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"><FiVideo className="w-4 h-4" /></button>
              <button onClick={toggleStar} className={`p-2 rounded-lg hover:bg-gray-100 ${selectedContact && starred.has(selectedContact.id) ? "text-yellow-500" : "text-gray-500"}`}><FiStar className="w-4 h-4" /></button>
              <button
                onClick={() => setShowContactInfo(!showContactInfo)}
                className={`p-2 rounded-lg text-gray-500 ${showContactInfo ? "bg-purple-100 text-purple-600" : "hover:bg-gray-100"}`}
              >
                <FiUser className="w-4 h-4" />
              </button>
              <button onClick={() => showToast("Görüşme seçenekleri", "info")} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"><FiMoreVertical className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Messages */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-[#f0f2f5] scrollbar-thin">
                <div className="text-center">
                  <span className="text-[10px] bg-white text-gray-400 px-3 py-1 rounded-full shadow-sm">Bugün</span>
                </div>
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
              </div>

              {/* AI Suggestions */}
              {showAI && (
                <div className="p-3 border-t border-gray-100 bg-purple-50/50">
                  <div className="flex items-center gap-2 mb-2">
                    <FiZap className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-semibold text-purple-700">AI Önerileri</span>
                    <button onClick={() => setShowAI(false)} className="ml-auto text-gray-400 hover:text-gray-600"><FiX className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {aiSuggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => { setMessageInput(s); setShowAI(false); }}
                        className="text-xs bg-white border border-purple-200 text-purple-700 px-3 py-1.5 rounded-lg hover:bg-purple-100 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-gray-100 bg-white">
                <div className="flex items-end gap-2">
                  <button onClick={() => showToast("Dosya seçici açıldı", "info")} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"><FiPaperclip className="w-5 h-5" /></button>
                  <button onClick={() => showToast("Resim seçici açıldı", "info")} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"><FiImage className="w-5 h-5" /></button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Mesaj yazın..."
                      onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                      className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 pr-20"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <button onClick={() => showToast("Emoji paneli", "info")} className="p-1 rounded hover:bg-gray-200 text-gray-400"><FiSmile className="w-4 h-4" /></button>
                      <button onClick={() => setShowAI(!showAI)} className="p-1 rounded hover:bg-purple-100 text-purple-400"><FiZap className="w-4 h-4" /></button>
                    </div>
                  </div>
                  {messageInput ? (
                    <button onClick={handleSendMessage} className="p-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
                      <FiSend className="w-5 h-5" />
                    </button>
                  ) : (
                    <button onClick={() => showToast("Ses kaydı başlatıldı", "info")} className="p-2.5 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition-colors">
                      <FiMic className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Info Panel */}
            {showContactInfo && (
              <div className="w-72 border-l border-gray-100 bg-white overflow-y-auto animate-slide-in">
                <div className="p-5 text-center border-b border-gray-100">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-xl font-bold">{selectedContact.name[0]}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{selectedContact.name}</h3>
                  {selectedContact.company && (
                    <p className="text-xs text-purple-500">{selectedContact.company}</p>
                  )}
                  <div className="flex items-center justify-center gap-1 mt-2">
                    {selectedContact.tags.map((tag) => (
                      <span key={tag} className="text-[10px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="p-5 space-y-4 text-sm">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-medium mb-1">Telefon</p>
                    <p className="text-gray-700">{selectedContact.phone}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-medium mb-1">E-posta</p>
                    <p className="text-gray-700">{selectedContact.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-medium mb-1">Kanal</p>
                    <ChannelIcon channel={selectedContact.source} showLabel />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-medium mb-1">Durum</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      selectedContact.status === "customer" ? "bg-green-100 text-green-700" :
                      selectedContact.status === "lead" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {selectedContact.status === "customer" ? "Müşteri" : selectedContact.status === "lead" ? "Lead" : "Aktif"}
                    </span>
                  </div>
                  {selectedContact.assignedTo && (
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-medium mb-1">Atanan</p>
                      <p className="text-gray-700">{selectedContact.assignedTo}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-medium mb-1">Kayıt Tarihi</p>
                    <p className="text-gray-700">{selectedContact.createdAt}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <FiMessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-500">Bir görüşme seçin</h3>
            <p className="text-sm text-gray-400 mt-1">Sol panelden bir kişi seçerek görüşmeye başlayın</p>
          </div>
        </div>
      )}
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isContact = message.sender === "contact";
  const isAI = message.sender === "ai";
  const isSystem = message.sender === "system";

  if (isSystem) {
    return (
      <div className="text-center">
        <span className="text-[10px] text-gray-400 bg-white px-3 py-1 rounded-full">{message.content}</span>
      </div>
    );
  }

  return (
    <div className={`flex ${isContact ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm ${
          isContact
            ? "bg-white text-gray-800 rounded-bl-md"
            : isAI
            ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-br-md"
            : "bg-[#d9fdd3] text-gray-800 rounded-br-md"
        }`}
      >
        {isAI && (
          <div className="flex items-center gap-1 mb-1">
            <FiZap className="w-3 h-3 text-yellow-300" />
            <span className="text-[10px] text-purple-100 font-medium">AI Asistan</span>
          </div>
        )}
        <p className="text-sm leading-relaxed">{message.content}</p>
        <div className={`flex items-center justify-end gap-1 mt-1 ${isContact ? "text-gray-400" : isAI ? "text-purple-200" : "text-gray-400"}`}>
          <span className="text-[10px]">{message.timestamp}</span>
          {!isContact && (
            message.status === "read" ? (
              <FiCheckCircle className="w-3 h-3 text-blue-400" />
            ) : (
              <FiCheck className="w-3 h-3" />
            )
          )}
        </div>
      </div>
    </div>
  );
}
