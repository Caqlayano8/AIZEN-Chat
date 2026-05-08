import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { colors, spacing, borderRadius } from "../lib/theme";

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  channel: "whatsapp" | "instagram" | "telegram" | "facebook";
  avatar: string;
}

const mockChats: ChatItem[] = [
  { id: "1", name: "Ahmet Yılmaz", lastMessage: "Sipariş durumumu öğrenebilir miyim?", time: "2 dk", unread: 3, channel: "whatsapp", avatar: "AY" },
  { id: "2", name: "Fatma Demir", lastMessage: "Ürünleriniz hakkında bilgi almak istiyorum", time: "15 dk", unread: 1, channel: "instagram", avatar: "FD" },
  { id: "3", name: "Mehmet Kaya", lastMessage: "Toplantı için uygun musunuz?", time: "1 sa", unread: 0, channel: "whatsapp", avatar: "MK" },
  { id: "4", name: "Ayşe Özkan", lastMessage: "Fiyat listesini gönderebilir misiniz?", time: "3 sa", unread: 2, channel: "telegram", avatar: "AÖ" },
  { id: "5", name: "Ali Çelik", lastMessage: "Sözleşme yenilemesi hakkında", time: "5 sa", unread: 0, channel: "whatsapp", avatar: "AÇ" },
  { id: "6", name: "Zeynep Arslan", lastMessage: "Demo talebimizi iletmek istiyoruz", time: "1 gün", unread: 1, channel: "facebook", avatar: "ZA" },
];

const channelColors: Record<string, string> = {
  whatsapp: colors.whatsapp,
  instagram: colors.instagram,
  telegram: colors.telegram,
  facebook: colors.facebook,
};

export default function ChatListScreen() {
  const renderItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
        <Text style={styles.avatarText}>{item.avatar}</Text>
        <View style={[styles.channelDot, { backgroundColor: channelColors[item.channel] }]} />
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text style={styles.chatMessage} numberOfLines={1}>{item.lastMessage}</Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesajlar</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Kişi ara..."
            placeholderTextColor={colors.textMuted}
          />
        </View>
        <View style={styles.filterRow}>
          {["Tümü", "WhatsApp", "Instagram", "Telegram"].map((f) => (
            <TouchableOpacity key={f} style={[styles.filterChip, f === "Tümü" && styles.filterChipActive]}>
              <Text style={[styles.filterText, f === "Tümü" && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={mockChats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.lg, paddingBottom: spacing.sm, backgroundColor: colors.card },
  title: { fontSize: 28, fontWeight: "800", color: colors.text, marginBottom: spacing.md },
  searchContainer: { marginBottom: spacing.sm },
  searchInput: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: 14,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterRow: { flexDirection: "row", gap: spacing.xs },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.background,
  },
  filterChipActive: { backgroundColor: `${colors.primary}20` },
  filterText: { fontSize: 12, fontWeight: "600", color: colors.textSecondary },
  filterTextActive: { color: colors.primary },
  list: { flex: 1 },
  chatItem: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.card,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  avatarText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  channelDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    position: "absolute",
    bottom: -2,
    right: -2,
    borderWidth: 2,
    borderColor: colors.card,
  },
  chatContent: { flex: 1 },
  chatHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  chatName: { fontSize: 15, fontWeight: "600", color: colors.text },
  chatTime: { fontSize: 11, color: colors.textMuted },
  chatFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  chatMessage: { fontSize: 13, color: colors.textSecondary, flex: 1, marginRight: spacing.sm },
  unreadBadge: {
    backgroundColor: colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadText: { color: "#fff", fontSize: 10, fontWeight: "700" },
});
