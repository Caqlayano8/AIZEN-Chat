export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "agent" | "manager";
  company: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  company?: string;
  tags: string[];
  source: ChannelType;
  status: "active" | "inactive" | "lead" | "customer";
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  notes?: string;
  assignedTo?: string;
  createdAt: string;
}

export type ChannelType = "whatsapp" | "instagram" | "telegram" | "facebook" | "email" | "sms" | "webchat";

export interface Message {
  id: string;
  contactId: string;
  content: string;
  type: "text" | "image" | "file" | "audio" | "video" | "template";
  sender: "agent" | "contact" | "ai" | "system";
  channel: ChannelType;
  timestamp: string;
  status: "sent" | "delivered" | "read" | "failed";
  aiSuggestion?: string;
}

export interface Conversation {
  id: string;
  contact: Contact;
  messages: Message[];
  channel: ChannelType;
  status: "open" | "pending" | "resolved" | "closed";
  assignedTo?: string;
  priority: "low" | "medium" | "high" | "urgent";
  lastActivity: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  type: "broadcast" | "drip" | "triggered" | "promotional";
  channel: ChannelType;
  status: "draft" | "scheduled" | "active" | "paused" | "completed";
  targetAudience: string;
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  responseCount: number;
  scheduledAt?: string;
  createdAt: string;
  template?: string;
}

export interface Appointment {
  id: string;
  contactId: string;
  contactName: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: number;
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no_show";
  type: "meeting" | "call" | "demo" | "follow_up" | "consultation";
  assignedTo: string;
  location?: string;
  notes?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "message" | "appointment" | "campaign" | "system" | "order" | "ai";
  read: boolean;
  timestamp: string;
  actionUrl?: string;
  icon?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  contactId: string;
  contactName: string;
  products: OrderProduct[];
  totalAmount: number;
  currency: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "returned";
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export interface OrderProduct {
  name: string;
  quantity: number;
  price: number;
  sku?: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  phone: string;
  email: string;
  website?: string;
  address: string;
  industry: string;
  plan: "starter" | "professional" | "enterprise";
  connectedChannels: ConnectedChannel[];
  teamMembers: TeamMember[];
}

export interface ConnectedChannel {
  type: ChannelType;
  identifier: string;
  status: "connected" | "disconnected" | "pending";
  connectedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "agent";
  avatar: string;
  status: "active" | "inactive";
}

export interface DashboardStats {
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
}
