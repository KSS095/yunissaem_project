import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL, SERVER_BASE } from "../config/config";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);

  // 🔹 인기 검색어 불러오기
  useEffect(() => {
    axios
      .get(`${BASE_URL}/courses/popular/`)
      .then((res) => {
        const names = res.data.map((course) => course.title);
        setPopularSearches(names.slice(0, 6));
      })
      .catch((err) => console.error("🔥 인기 검색어 로드 실패:", err));
  }, []);

  // 🔹 최근 검색어 불러오기
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("recentSearches");
      if (stored) setRecentSearches(JSON.parse(stored));
    })();
  }, []);

  // 🔍 검색 실행
  // const handleSearch = async () => {
  //   if (!query.trim()) return;

  //   try {
  //     const res = await axios.get(`${BASE_URL}/search/?q=${encodeURIComponent(query)}`);
  //     setResults(res.data);

  //     // 최근 검색어 업데이트 (중복 제거 + 최대 5개)
  //     const updated = [query, ...recentSearches.filter((q) => q !== query)].slice(0, 5);
  //     setRecentSearches(updated);
  //     await AsyncStorage.setItem("recentSearches", JSON.stringify(updated));
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert("검색 오류", "검색 중 문제가 발생했습니다.");
  //   }
  // };

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.get(`${BASE_URL}/search/?q=${encodeURIComponent(query)}`);
      setResults(res.data);
    } catch (error) {
      console.warn("⚠️ 서버 연결 실패, 더미 데이터로 대체합니다.");

      const dummyData = [
        {
          id: 1,
          title: "React Native 기초 마스터",
          tutor: "김튜터",
          thumbnail: "https://placekitten.com/300/150",
          rating: 4.8,
          enrolled_count: 7,
          capacity: 10,
        },
        {
          id: 2,
          title: "피아노 입문 클래스",
          tutor: "이선생",
          thumbnail: "https://placekitten.com/300/160",
          rating: 4.5,
          enrolled_count: 3,
          capacity: 5,
        },
        {
          id: 3,
          title: "피아노 중급 클래스",
          tutor: "이선생",
          thumbnail: "https://placekitten.com/300/160",
          rating: 4.2,
          enrolled_count: 2,
          capacity: 4,
        },
      ];

      const filtered = dummyData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  };

  return (
    <View style={styles.container}>
      {/* 검색창 */}
      <View style={styles.searchRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="과외 검색하기"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.iconButton}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* 인기 검색어 */}
      <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>🔥 인기 검색어</Text>
      <View style={styles.popularRow}>
        {popularSearches.map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.tag}
            onPress={() => {
              setQuery(item);
              handleSearch();
            }}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 최근 검색어 */}
      <Text style={styles.sectionTitle}>🕑 최근 검색어</Text>
      {recentSearches.map((item, idx) => (
        <TouchableOpacity key={idx} onPress={() => setQuery(item)}>
          <Text style={styles.recent}>{item}</Text>
        </TouchableOpacity>
      ))}

      {/* 검색 결과 */}
      <Text style={styles.sectionTitle}>검색 결과</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          // 썸네일 경로 처리
          const thumbnailUri =
            item.thumbnail?.startsWith("/") ? SERVER_BASE + item.thumbnail : item.thumbnail;

          // 수강 인원 표시 문자열
          const enrolled = Number(item.enrolled_count) || 0;
          const capacity = Number(item.capacity) || 0;
          let capacityText = null;
          if (enrolled && capacity) {
            capacityText = `수강 인원: ${enrolled} / ${capacity}`;
          } else if (enrolled) {
            capacityText = `수강 인원: ${enrolled}`;
          } else if (capacity) {
            capacityText = `정원: ${capacity}`;
          }

          return (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => navigation.navigate("LessonDetail", { lesson: item })}
            >
              <Image
                source={{ uri: thumbnailUri || "https://placekitten.com/200/100" }}
                style={styles.thumbnail}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.resultTitle}>{item.title}</Text>
                <Text style={styles.resultTutor}>{item.tutor || "튜터 정보 없음"}</Text>

                {/* 👇 수강 인원 / 정원 표시 */}
                {capacityText && <Text style={styles.capacityText}>{capacityText}</Text>}

                {/* ⭐ 평점 */}
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={16} color="gold" />
                  <Text style={styles.ratingText}>
                    {item.rating ? `${item.rating.toFixed(1)}` : "리뷰 없음"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
  },
  iconButton: { marginLeft: 8, padding: 6 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginTop: 20, marginBottom: 8 },
  popularRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 4,
  },
  recent: { fontSize: 14, color: "gray", marginVertical: 2 },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  thumbnail: { width: 70, height: 70, borderRadius: 8, marginRight: 10 },
  resultTitle: { fontSize: 16, fontWeight: "bold" },
  resultTutor: { color: "gray", fontSize: 13 },
  capacityText: { fontSize: 13, color: "#666", marginTop: 2 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  ratingText: { fontSize: 13, color: "#555", marginLeft: 4 },
});
