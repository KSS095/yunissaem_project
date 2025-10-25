// 카테고리별 과외 목록 화면
// - 카테고리별 과외 카드 리스트 표시
// - 검색, 정렬, 찜(좋아요), 토글 필터 기능 구현
// ⚠️ 찜 기능은 로컬 상태로만 구현 (서버 연동 없음)
// - "맨 처음 상태"로 되돌리기 기능 구현
// - 뒤로가기(헤더/하드웨어) 1회: 화면 초기화 → 2회: 이전 화면으로 이동

import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Switch,
  Image,
  Keyboard,
  BackHandler,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL, SERVER_BASE } from "../config/config";


/*
  CategoryLessonScreen 전체 설명 (요약)
  - 특정 카테고리(또는 "전체")에 속한 과외 목록을 조회하고 표시하는 화면입니다.
  - 서버에서 인기 과외(/courses/popular/) 데이터를 불러오며,
    추후에는 선택된 카테고리 ID에 따라 /courses/{category_id}/ 형태의 API로 확장 예정입니다.
  - 검색창 클릭 시 SearchScreen으로 이동하며, 실제 검색 로직은 SearchScreen에서 처리합니다.
  - 정렬 옵션(인기순, 최신순, 리뷰 많은 순), 찜(좋아요) 토글, 신청 불가 과외 표시 토글 등의
    필터링 기능을 제공합니다.
  - 찜(좋아요)은 로컬 상태로만 관리되며, 서버 연동은 아직 구현되지 않았습니다.
  - 화면 내 상태를 모두 초기화하는 "맨 처음 상태 복귀(resetToPristine)" 기능이 있으며,
    뒤로가기(헤더·하드웨어) 시 동작이 아래와 같이 정의됩니다:
      ① 현재 상태가 변경되어 있으면 → 초기화만 수행
      ② 이미 초기 상태라면 → 이전 화면으로 이동
  - SafeAreaView를 사용해 iOS·Android 모두에서 안전한 레이아웃을 보장합니다.
  - BASE_URL, SERVER_BASE는 config.js에서 관리하며, 개발 환경에서는 하드코딩된 URL을 사용합니다.
    (배포 시 환경변수로 분리 필요)
*/


export default function CategoryLessonScreen({ navigation, route }) {
  const { category } = route.params || { category: "전체" };
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [sortOption, setSortOption] = useState("인기순");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);

  const firstRenderRef = useRef(true);

  // 강의 데이터 (서버에서 불러옴)
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  // 서버에서 과외 목록 가져오기
  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/courses/popular/`);
        const data = Array.isArray(res.data) ? res.data : res.data.results ?? [];

        const normalized = data.map((item) => ({
          id: item.id,
          title: item.title,
          thumbnail: item.thumbnail_image_url?.startsWith("/")
            ? SERVER_BASE + item.thumbnail_image_url
            : item.thumbnail_image_url,
          description: item.introduction || "소개가 없습니다.",
          tutor: item.tutor || "강사 정보 없음",
          capacity: item.max_tutees ?? null,
          enrolled: item.view_count ?? 0,
          available: true,
          category: item.category_name || category || "전체",
        }));

        setLessons(normalized);
      } catch (err) {
        console.error("fetchLessons error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [category]);

  // “맨 처음 상태”로 되돌리는 함수
  const resetToPristine = () => {
    setDropdownVisible(false);
    setShowUnavailable(false);
    setSortOption("인기순");
    Keyboard.dismiss();
  };

  // 현재 상태가 “맨 처음 상태”인지 판별
  const isPristine = () =>
    !dropdownVisible && showUnavailable === false && sortOption === "인기순";

  // 뒤로가기 관련 (헤더 + 하드웨어)
  React.useEffect(() => {
    const unsub = navigation.addListener("beforeRemove", (e) => {
      if (!isPristine()) {
        e.preventDefault();
        resetToPristine();
        return;
      }
    });
    return unsub;
  }, [navigation, dropdownVisible, showUnavailable, sortOption]);

  useFocusEffect(
    React.useCallback(() => {
      const onBack = () => {
        if (!isPristine()) {
          resetToPristine();
          return true;
        }
        return false;
      };
      const sub = BackHandler.addEventListener("hardwareBackPress", onBack);
      return () => sub.remove();
    }, [dropdownVisible, showUnavailable, sortOption])
  );

  // 네비게이션 헤더 타이틀
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${category} 과외 목록`,
    });
  }, [navigation, category]);

  // 찜 토글
  const toggleFavorite = (id) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // 리스트 데이터
  let filteredLessons = lessons.filter(
    (l) =>
      (category === "전체" || l.category === category) &&
      (showUnavailable || l.available)
  );

  if (sortOption === "최신순") filteredLessons = [...filteredLessons].reverse();

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      {/* 🔍 검색창 (검색 페이지 이동용) */}
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => navigation.navigate("Search")}
      >
        <Ionicons name="search" size={18} color="#888" style={{ marginRight: 8 }} />
        <Text style={{ color: "#888" }}>과외 검색하기</Text>
      </TouchableOpacity>

      {/* 옵션 영역 */}
      <View style={styles.optionRow}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>신청 불가 항목 보기</Text>
          <Switch value={showUnavailable} onValueChange={setShowUnavailable} />
        </View>

        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => setDropdownVisible((p) => !p)}>
            <Text style={styles.dropdownSelected}>{sortOption} ▼</Text>
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.dropdownMenu}>
              {["인기순", "최신순", "리뷰 많은 순"].map((opt) => (
                <TouchableOpacity
                  key={opt}
                  onPress={() => {
                    setSortOption(opt);
                    setDropdownVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItem,
                      sortOption === opt && styles.dropdownActive,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* 카드 리스트 */}
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>불러오는 중...</Text>
        </View>
      ) : filteredLessons.length === 0 ? (
        <Pressable style={styles.noResultBox} onStartShouldSetResponder={() => true}>
          <Text style={styles.noResultText}>강의가 없습니다 😢</Text>
        </Pressable>
      ) : (
        <FlatList
          data={filteredLessons}
          keyExtractor={(item) => item.id?.toString()}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => {
            const isFavorite = favoriteIds.includes(item.id);

            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  !dropdownVisible &&
                  navigation.navigate("LessonDetail", { lesson: item })
                }
                activeOpacity={0.8}
              >
                <View
                  style={[styles.cardInner, !item.available && styles.cardUnavailable]}
                >
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.thumbnail}
                  />

                  <View style={styles.cardContent}>
                    <Text style={styles.lessonTitle}>{item.title}</Text>

                    <Text style={styles.description} numberOfLines={2}>
                      {item.description}
                    </Text>

                    <View style={styles.footerRow}>
                      <View>
                        <Text style={styles.tutor}>{item.tutor}</Text>
                        <Text style={styles.capacity}>
                          {item.enrolled}/{item.capacity}
                        </Text>
                      </View>

                      {item.available && (
                        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                          <Ionicons
                            name={isFavorite ? "heart" : "heart-outline"}
                            size={26}
                            color={isFavorite ? "tomato" : "#aaa"}
                            style={styles.heartIcon}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>

                {!item.available && (
                  <Text style={styles.unavailableTag}>신청 불가</Text>
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  switchRow: { flexDirection: "row", alignItems: "center" },
  switchLabel: { marginRight: 8 },
  dropdown: { position: "relative" },
  dropdownSelected: { fontSize: 14, color: "blue" },
  dropdownMenu: {
    position: "absolute",
    top: 24,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    minWidth: 120,
    zIndex: 10,
    elevation: 3,
  },
  dropdownItem: { padding: 8, fontSize: 14, color: "#333" },
  dropdownActive: { fontWeight: "bold", color: "tomato" },
  noResultBox: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  noResultText: { fontSize: 15, color: "#777" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    position: "relative",
  },
  cardInner: { flexDirection: "row", alignItems: "center", padding: 8, minHeight: 110 },
  cardUnavailable: { opacity: 0.4 },
  thumbnail: { width: 90, height: 90, borderRadius: 8, marginRight: 12 },
  cardContent: { flex: 1, justifyContent: "space-between" },
  lessonTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  description: { fontSize: 13, color: "#555", marginBottom: 8, lineHeight: 18 },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  tutor: { fontSize: 13, fontWeight: "500" },
  capacity: { fontSize: 12, color: "gray" },
  unavailableTag: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "tomato",
    color: "#fff",
    fontSize: 11,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    opacity: 1,
    fontWeight: "bold",
    zIndex: 10,
  },
  heartIcon: { marginLeft: 8, marginBottom: 2 },
});
