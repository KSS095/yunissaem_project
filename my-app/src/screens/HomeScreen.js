import { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CategoryMenu from "./CategoryMenu";

const dummyLessons = [
  { id: "1", title: "React Native 기초", category: "프로그래밍" },
  { id: "2", title: "피아노 입문", category: "음악" },
  { id: "3", title: "헬스 PT", category: "운동" },
  { id: "4", title: "주식 투자 전략", category: "금융" },
];

export default function HomeScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const renderLesson = ({ item }) => (
    <TouchableOpacity
      style={styles.lessonCard}
      onPress={() => navigation.navigate("LessonDetail", { lesson: item })}
    >
      <Text style={styles.lessonTitle}>{item.title}</Text>
      <Text style={styles.lessonCategory}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 상단 바 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>홈</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Ionicons name="search" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* 섹션: 인기 과외 */}
      <Text style={styles.sectionTitle}>🔥 인기 과외</Text>
      <FlatList
        horizontal
        data={dummyLessons}
        keyExtractor={(item) => item.id}
        renderItem={renderLesson}
        showsHorizontalScrollIndicator={false}
      />

      {/* 섹션: 진행 중인 과외 */}
      <Text style={styles.sectionTitle}>📚 진행 중인 과외</Text>
      <FlatList
        horizontal
        data={dummyLessons.slice(0, 2)}
        keyExtractor={(item) => item.id}
        renderItem={renderLesson}
        showsHorizontalScrollIndicator={false}
      />

      {/* 섹션: 찜한 과외 */}
      <Text style={styles.sectionTitle}>❤️ 찜한 과외</Text>
      <FlatList
        horizontal
        data={dummyLessons.slice(2)}
        keyExtractor={(item) => item.id}
        renderItem={renderLesson}
        showsHorizontalScrollIndicator={false}
      />

      {/* 카테고리 메뉴 */}
      <CategoryMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 40 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginLeft: 20, marginVertical: 10 },
  lessonCard: {
    width: 150,
    height: 100,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 10,
    justifyContent: "center",
  },
  lessonTitle: { fontSize: 16, fontWeight: "bold" },
  lessonCategory: { fontSize: 14, color: "#555" },
});
