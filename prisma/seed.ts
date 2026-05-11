import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create demo company
  const company = await prisma.company.create({
    data: {
      name: "AIZEN Demo Şirketi",
      phone: "+90 212 555 0001",
      email: "demo@aizenchat.com",
      website: "https://aizenchat.com",
      address: "İstanbul, Türkiye",
      industry: "Teknoloji",
      plan: "professional",
    },
  });

  // Create admin user
  const hashedPassword = await bcrypt.hash("demo123", 12);
  const admin = await prisma.user.create({
    data: {
      name: "Çağlayan Kurtoğlu",
      email: "admin@aizenchat.com",
      password: hashedPassword,
      role: "admin",
      phone: "+90 532 555 0001",
      companyId: company.id,
    },
  });

  // Create agent users
  const agent1 = await prisma.user.create({
    data: {
      name: "Ayşe Yılmaz",
      email: "ayse@aizenchat.com",
      password: hashedPassword,
      role: "agent",
      phone: "+90 533 555 0002",
      companyId: company.id,
    },
  });

  const agent2 = await prisma.user.create({
    data: {
      name: "Mehmet Demir",
      email: "mehmet@aizenchat.com",
      password: hashedPassword,
      role: "agent",
      phone: "+90 534 555 0003",
      companyId: company.id,
    },
  });

  // Create super admin
  await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "superadmin@aizenchat.com",
      password: await bcrypt.hash("superadmin123", 12),
      role: "superadmin",
      phone: "+90 530 555 0000",
    },
  });

  // Create contacts
  const contactsData = [
    { name: "Ali Veli", phone: "+90 535 111 2233", email: "ali@example.com", source: "whatsapp", status: "customer", tags: '["VIP","Aktif"]' },
    { name: "Fatma Kaya", phone: "+90 536 222 3344", email: "fatma@example.com", source: "instagram", status: "active", tags: '["Yeni"]' },
    { name: "Ahmet Özkan", phone: "+90 537 333 4455", email: "ahmet@example.com", source: "telegram", status: "lead", tags: '["Potansiyel"]' },
    { name: "Zeynep Aksoy", phone: "+90 538 444 5566", email: "zeynep@example.com", source: "whatsapp", status: "customer", tags: '["VIP","Sadık"]' },
    { name: "Burak Yıldız", phone: "+90 539 555 6677", email: "burak@example.com", source: "facebook", status: "active", tags: '["Aktif"]' },
    { name: "Elif Şahin", phone: "+90 540 666 7788", email: "elif@example.com", source: "email", status: "lead", tags: '["Kurumsal"]' },
    { name: "Murat Çelik", phone: "+90 541 777 8899", email: "murat@example.com", source: "sms", status: "customer", tags: '["Toptan"]' },
    { name: "Selin Aydın", phone: "+90 542 888 9900", email: "selin@example.com", source: "webchat", status: "active", tags: '["Web"]' },
  ];

  const contacts = [];
  for (const c of contactsData) {
    const contact = await prisma.contact.create({
      data: { ...c, companyId: company.id },
    });
    contacts.push(contact);
  }

  // Create conversations with messages
  const conversationsData = [
    { contactIdx: 0, channel: "whatsapp", status: "open", priority: "high", agentId: admin.id },
    { contactIdx: 1, channel: "instagram", status: "open", priority: "medium", agentId: agent1.id },
    { contactIdx: 2, channel: "telegram", status: "pending", priority: "low", agentId: agent2.id },
    { contactIdx: 3, channel: "whatsapp", status: "open", priority: "urgent", agentId: admin.id },
    { contactIdx: 4, channel: "facebook", status: "resolved", priority: "medium", agentId: agent1.id },
    { contactIdx: 5, channel: "email", status: "open", priority: "medium", agentId: agent2.id },
  ];

  for (const conv of conversationsData) {
    const conversation = await prisma.conversation.create({
      data: {
        contactId: contacts[conv.contactIdx].id,
        channel: conv.channel,
        status: conv.status,
        priority: conv.priority,
        assignedToId: conv.agentId,
        companyId: company.id,
      },
    });

    // Add messages
    const messages = [
      { content: "Merhaba, yardımcı olabilir misiniz?", sender: "contact", status: "read" },
      { content: "Tabii, size nasıl yardımcı olabilirim?", sender: "agent", senderId: conv.agentId, status: "read" },
      { content: "Ürünleriniz hakkında bilgi almak istiyorum.", sender: "contact", status: "read" },
      { content: "Elbette! Hangi ürün grubuyla ilgileniyorsunuz?", sender: "agent", senderId: conv.agentId, status: "delivered", aiSuggestion: "Fiyat listemizi paylaşmak ister misiniz?" },
    ];

    for (const msg of messages) {
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          content: msg.content,
          sender: msg.sender,
          senderId: msg.senderId || null,
          channel: conv.channel,
          status: msg.status,
          aiSuggestion: msg.aiSuggestion || null,
        },
      });
    }
  }

  // Create campaigns
  const campaignsData = [
    { name: "Yeni Yıl Kampanyası", description: "Yeni yıl özel indirim kampanyası", type: "broadcast", channel: "whatsapp", status: "active", targetAudience: "Tüm müşteriler", sentCount: 1250, deliveredCount: 1180, readCount: 890, responseCount: 234 },
    { name: "Bahar İndirimi", description: "Bahar sezonu başlangıç kampanyası", type: "promotional", channel: "instagram", status: "scheduled", targetAudience: "VIP müşteriler", sentCount: 0 },
    { name: "Hoş Geldin Mesajı", description: "Yeni kayıtlara otomatik mesaj", type: "triggered", channel: "whatsapp", status: "active", targetAudience: "Yeni kayıtlar", sentCount: 450, deliveredCount: 445, readCount: 380, responseCount: 120 },
    { name: "Geri Bildirim", description: "Müşteri memnuniyet anketi", type: "drip", channel: "email", status: "draft", targetAudience: "Son 30 gün sipariş verenler" },
  ];

  for (const c of campaignsData) {
    await prisma.campaign.create({
      data: { ...c, companyId: company.id },
    });
  }

  // Create appointments
  const appointmentsData = [
    { contactIdx: 0, title: "Ürün Demo Toplantısı", date: "2026-05-12", time: "10:00", duration: 60, status: "scheduled", type: "demo", assignedToId: admin.id },
    { contactIdx: 1, title: "Takip Görüşmesi", date: "2026-05-13", time: "14:30", duration: 30, status: "confirmed", type: "follow_up", assignedToId: agent1.id },
    { contactIdx: 3, title: "Sözleşme Görüşmesi", date: "2026-05-14", time: "11:00", duration: 45, status: "scheduled", type: "meeting", assignedToId: admin.id },
    { contactIdx: 5, title: "Danışmanlık", date: "2026-05-15", time: "09:00", duration: 30, status: "scheduled", type: "consultation", assignedToId: agent2.id },
  ];

  for (const a of appointmentsData) {
    await prisma.appointment.create({
      data: {
        contactId: contacts[a.contactIdx].id,
        title: a.title,
        date: a.date,
        time: a.time,
        duration: a.duration,
        status: a.status,
        type: a.type,
        assignedToId: a.assignedToId,
        companyId: company.id,
      },
    });
  }

  // Create orders
  const ordersData = [
    { contactIdx: 0, orderNumber: "ORD-2026-001", products: '[{"name":"Premium Paket","quantity":1,"price":4999,"sku":"PRE-001"}]', totalAmount: 4999, status: "delivered", trackingNumber: "TR123456789", carrier: "Aras Kargo", shippingAddress: "İstanbul, Kadıköy" },
    { contactIdx: 3, orderNumber: "ORD-2026-002", products: '[{"name":"Starter Paket","quantity":1,"price":999,"sku":"STR-001"},{"name":"Ek Modül","quantity":2,"price":499,"sku":"MOD-001"}]', totalAmount: 1997, status: "shipped", trackingNumber: "TR987654321", carrier: "Yurtiçi Kargo", shippingAddress: "Ankara, Çankaya", estimatedDelivery: "2026-05-15" },
    { contactIdx: 6, orderNumber: "ORD-2026-003", products: '[{"name":"Enterprise Paket","quantity":1,"price":9999,"sku":"ENT-001"}]', totalAmount: 9999, status: "processing", shippingAddress: "İzmir, Konak" },
    { contactIdx: 1, orderNumber: "ORD-2026-004", products: '[{"name":"Başlangıç Paket","quantity":1,"price":499,"sku":"BAS-001"}]', totalAmount: 499, status: "pending", shippingAddress: "Bursa, Nilüfer" },
  ];

  for (const o of ordersData) {
    await prisma.order.create({
      data: {
        orderNumber: o.orderNumber,
        contactId: contacts[o.contactIdx].id,
        products: o.products,
        totalAmount: o.totalAmount,
        status: o.status,
        trackingNumber: o.trackingNumber || null,
        carrier: o.carrier || null,
        shippingAddress: o.shippingAddress,
        estimatedDelivery: o.estimatedDelivery || null,
        companyId: company.id,
      },
    });
  }

  // Create notifications
  const notificationsData = [
    { title: "Yeni Mesaj", message: "Ali Veli'den yeni mesaj geldi", type: "message" },
    { title: "Randevu Hatırlatma", message: "Yarın saat 10:00'da demo toplantısı var", type: "appointment" },
    { title: "Kampanya Tamamlandı", message: "Yeni Yıl Kampanyası tamamlandı - 234 yanıt", type: "campaign" },
    { title: "Yeni Sipariş", message: "ORD-2026-004 numaralı yeni sipariş alındı", type: "order" },
    { title: "AI Öneri", message: "Müşteri memnuniyet oranı %94'ün altına düştü", type: "ai" },
    { title: "Sesli Arama", message: "Zeynep Aksoy sesli destek talep etti", type: "voice_call" },
  ];

  for (const n of notificationsData) {
    await prisma.notification.create({
      data: { ...n, companyId: company.id },
    });
  }

  // Create connected channels
  const channelsData = [
    { type: "whatsapp", identifier: "+90 212 555 0001", status: "connected" },
    { type: "instagram", identifier: "@aizenchat", status: "connected" },
    { type: "telegram", identifier: "@aizenchat_bot", status: "connected" },
    { type: "facebook", identifier: "AIZEN Chat", status: "connected" },
    { type: "email", identifier: "destek@aizenchat.com", status: "connected" },
    { type: "sms", identifier: "+90 212 555 0001", status: "connected" },
    { type: "webchat", identifier: "aizenchat.com", status: "connected" },
  ];

  for (const ch of channelsData) {
    await prisma.connectedChannel.create({
      data: { ...ch, companyId: company.id },
    });
  }

  // Create voice calls
  const voiceCallsData = [
    { contactIdx: 0, agentId: admin.id, direction: "inbound", status: "completed", duration: 180, aiHandled: false },
    { contactIdx: 3, agentId: null, direction: "inbound", status: "completed", duration: 120, aiHandled: true, aiTranscript: "Müşteri kargo durumunu sordu. AI asistan kargo takip numarasını ve tahmini teslimat tarihini paylaştı." },
    { contactIdx: 1, agentId: agent1.id, direction: "outbound", status: "completed", duration: 90, aiHandled: false },
    { contactIdx: 5, agentId: null, direction: "inbound", status: "completed", duration: 60, aiHandled: true, aiTranscript: "Müşteri fiyat bilgisi istedi. AI asistan güncel fiyat listesini paylaştı ve insan temsilciye yönlendirdi." },
    { contactIdx: 2, agentId: null, direction: "inbound", status: "missed", duration: 0, aiHandled: false },
  ];

  for (const vc of voiceCallsData) {
    await prisma.voiceCall.create({
      data: {
        contactId: contacts[vc.contactIdx].id,
        agentId: vc.agentId,
        companyId: company.id,
        direction: vc.direction,
        status: vc.status,
        duration: vc.duration,
        aiHandled: vc.aiHandled,
        aiTranscript: vc.aiTranscript || null,
        endedAt: vc.status === "completed" ? new Date() : null,
      },
    });
  }

  // Create call routing rules
  const routingRules = [
    { name: "Mesai Saatleri - Temsilciye Yönlendir", condition: "business_hours", action: "ring_agent", priority: 10, maxWaitTime: 30 },
    { name: "Mesai Dışı - AI Asistan", condition: "after_hours", action: "ai_assistant", priority: 20, aiGreeting: "Merhaba! Şu an mesai saatleri dışındayız. Ben AIZEN yapay zeka asistanıyım, size nasıl yardımcı olabilirim?" },
    { name: "Meşgul - Farklı Numaraya Yönlendir", condition: "busy", action: "forward_number", targetNumber: "+90 533 555 0002", priority: 5 },
    { name: "Cevapsız - Sesli Mesaj", condition: "no_answer", action: "voicemail", priority: 1, maxWaitTime: 45 },
  ];

  for (const rule of routingRules) {
    await prisma.callRoutingRule.create({
      data: { ...rule, companyId: company.id },
    });
  }

  // Create AI voice settings
  await prisma.aIVoiceSettings.create({
    data: {
      companyId: company.id,
      isEnabled: true,
      voiceModel: "nova",
      language: "tr-TR",
      greeting: "Merhaba! AIZEN Chat yapay zeka asistanına hoş geldiniz. Size nasıl yardımcı olabilirim?",
      personality: "friendly",
      fallbackAction: "transfer_agent",
      maxCallDuration: 300,
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log(`
📧 Demo Giriş Bilgileri:
   Admin: admin@aizenchat.com / demo123
   Agent: ayse@aizenchat.com / demo123
   Super Admin: superadmin@aizenchat.com / superadmin123
  `);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
