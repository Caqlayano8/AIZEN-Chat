import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, borderRadius } from "../lib/theme";

const stats = [
  { label: "Aktif Görüşme", value: "47", change: "+12%", color: "#3b82f6" },
  { label: "Toplam Müşteri", value: "3.456", change: "+8%", color: "#10b981" },
  { label: "Gelir (TRY)", value: "425K", change: "+24%", color: colors.primary },
  { label: "AI Cevap", value: "%34", change: "+5%", color: "#f59e0b" },
];

const recentChats = [
  { name: "Ahmet Y.", message: "Sipariş durumumu...", time: "2dk", unread: 3 },
  { name: "Fatma D.", message: "Ürünleriniz hakkında...", time: "15dk", unread: 1 },
  { name: "Mehmet K.", message: "Toplantı için uygun...", time: "1sa", unread: 0 },
];

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hoş Geldiniz, Mehmet</Text>
        <Text style={styles.subtitle}>23 görüşme çözüldü, 12 yeni müşteri</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((s) => (
          <View key={s.label} style={styles.statCard}>
            <View style={[styles.statDot, { backgroundColor: s.color }]} />
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
            <Text style={[styles.statChange, { color: "#10b981" }]}>{s.change}</Text>
          </View>
        ))}
      </View>

      {/* Customer Satisfaction */}
      <View style={styles.satisfactionCard}>
        <Text style={styles.satisfactionTitle}>Müşteri Memnuniyeti</Text>
        <Text style={styles.satisfactionValue}>%94</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "94%" }]} />
        </View>
        <Text style={styles.satisfactionSub}>Son 30 günde ortalama</Text>
      </View>

      {/* Recent Chats */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Son Görüşmeler</Text>
        <TouchableOpacity><Text style={styles.seeAll}>Tümü</Text></TouchableOpacity>
      </View>
      {recentChats.map((chat) => (
        <TouchableOpacity key={chat.name} style={styles.chatItem}>
          <View style={styles.chatAvatar}>
            <Text style={styles.chatAvatarText}>{chat.name[0]}</Text>
          </View>
          <View style={styles.chatContent}>
            <Text style={styles.chatName}>{chat.name}</Text>
            <Text style={styles.chatMessage} numberOfLines={1}>{chat.message}</Text>
          </View>
          <View style={styles.chatRight}>
            <Text style={styles.chatTime}>{chat.time}</Text>
            {chat.unread > 0 && (
              <View style={styles.badge}><Text style={styles.badgeText}>{chat.unread}</Text></View>
            )}
          </View>
        </TouchableOpacity>
      ))}

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.lg, paddingBottom: spacing.md },
  greeting: { fontSize: 24, fontWeight: "800", color: colors.text },
  subtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: spacing.sm, gap: spacing.sm },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statDot: { width: 8, height: 8, borderRadius: 4, marginBottom: spacing.sm },
  statValue: { fontSize: 24, fontWeight: "800", color: colors.text },
  statLabel: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  statChange: { fontSize: 11, fontWeight: "600", marginTop: 4 },
  satisfactionCard: {
    margin: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  satisfactionTitle: { fontSize: 14, fontWeight: "600", color: "rgba(255,255,255,0.8)" },
  satisfactionValue: { fontSize: 40, fontWeight: "800", color: "#fff", marginVertical: spacing.xs },
  progressBar: { height: 6, backgroundColor: "rgba(255,255,255,0.3)", borderRadius: 3 },
  progressFill: { height: 6, backgroundColor: "#fbbf24", borderRadius: 3 },
  satisfactionSub: { fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: spacing.xs },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: colors.text },
  seeAll: { fontSize: 13, fontWeight: "600", color: colors.primary },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.card,
    marginHorizontal: spacing.md,
    marginBottom: spacing.xs,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  chatAvatarText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  chatContent: { flex: 1 },
  chatName: { fontSize: 14, fontWeight: "600", color: colors.text },
  chatMessage: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  chatRight: { alignItems: "flex-end" },
  chatTime: { fontSize: 10, color: colors.textMuted },
  badge: { backgroundColor: colors.primary, width: 18, height: 18, borderRadius: 9, justifyContent: "center", alignItems: "center", marginTop: 4 },
  badgeText: { color: "#fff", fontSize: 9, fontWeight: "700" },
});
