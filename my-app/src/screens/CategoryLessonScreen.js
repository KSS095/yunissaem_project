// import { useState } from "react";
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Switch } from "react-native";

// const dummyLessons = [
//   { id: "1", title: "피아노 기초", category: "음악", available: true },
//   { id: "2", title: "헬스 PT", category: "운동", available: false },
//   { id: "3", title: "주식 투자", category: "금융", available: true },
//   { id: "4", title: "React Native 입문", category: "프로그래밍", available: true },
// ];

// export default function CategoryLessonScreen({ navigation, route }) {
//   const { category } = route.params || { category: "전체" };
//   const [showUnavailable, setShowUnavailable] = useState(false);
//   const [sortOption, setSortOption] = useState("인기순");

//   // 필터 + 정렬 적용
//   let filteredLessons = dummyLessons.filter(
//     (l) =>
//       (category === "전체" || l.category === category) &&
//       (showUnavailable || l.available)
//   );

//   if (sortOption === "최신순") {
//     filteredLessons = [...filteredLessons].reverse(); // 임시: 뒤집기
//   } else if (sortOption === "리뷰 많은 순") {
//     filteredLessons = [...filteredLessons]; // 나중에 리뷰 기준 정렬
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{category} 과외 목록</Text>

//       {/* 정렬 옵션 */}
//       <View style={styles.sortRow}>
//         <Text>정렬: {sortOption}</Text>
//         <TouchableOpacity onPress={() => setSortOption("인기순")}>
//           <Text style={styles.sortBtn}>인기순</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setSortOption("최신순")}>
//           <Text style={styles.sortBtn}>최신순</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setSortOption("리뷰 많은 순")}>
//           <Text style={styles.sortBtn}>리뷰 많은 순</Text>
//         </TouchableOpacity>
//       </View>

//       {/* 토글 */}
//       <View style={styles.switchRow}>
//         <Text>신청 불가 항목 보기</Text>
//         <Switch value={showUnavailable} onValueChange={setShowUnavailable} />
//       </View>

//       {/* 과외 목록 */}
//       <FlatList
//         data={filteredLessons}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.lessonItem,
//               !item.available && { backgroundColor: "#eee" },
//             ]}
//             onPress={() => navigation.navigate("LessonDetail", { lesson: item })}
//           >
//             <Text>{item.title}</Text>
//             {!item.available && <Text style={{ color: "red" }}>신청 불가</Text>}
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: "#fff" },
//   title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
//   sortRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
//   sortBtn: { marginLeft: 10, color: "blue" },
//   switchRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
//   lessonItem: {
//     padding: 12,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     marginBottom: 10,
//   },
// });





import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image,
} from "react-native";

const dummyLessons = [
  // 🎵 음악
  {
    id: "music-1",
    title: "피아노 기초",
    category: "음악",
    tutor: "김선생",
    enrolled: 8,
    capacity: 12,
    description: "피아노를 처음 배우는 분들을 위한 기초 수업입니다.",
    thumbnail: "https://picsum.photos/seed/piano1/200/200",
    available: true,
  },
  {
    id: "music-2",
    title: "기타 중급",
    category: "음악",
    tutor: "이선생",
    enrolled: 5,
    capacity: 10,
    description: "코드 진행과 간단한 연주를 배우는 기타 중급 과정입니다.",
    thumbnail: "https://picsum.photos/seed/guitar/200/200",
    available: true,
  },
  {
    id: "music-3",
    title: "보컬 트레이닝",
    category: "음악",
    tutor: "박보컬",
    enrolled: 12,
    capacity: 15,
    description: "호흡, 발성, 감정 표현까지 배우는 보컬 레슨입니다.",
    thumbnail: "https://picsum.photos/seed/vocal/200/200",
    available: false,
  },

  // 🏋 운동
  {
    id: "fitness-1",
    title: "헬스 PT",
    category: "운동",
    tutor: "박트레이너",
    enrolled: 5,
    capacity: 5,
    description: "개인 맞춤형 트레이닝으로 건강한 몸을 만듭니다.",
    thumbnail: "https://picsum.photos/seed/fitness/200/200",
    available: false,
  },
  {
    id: "fitness-2",
    title: "요가 클래스",
    category: "운동",
    tutor: "최요가",
    enrolled: 14,
    capacity: 20,
    description: "마음을 다스리고 몸의 균형을 잡는 요가 수업입니다.",
    thumbnail: "https://picsum.photos/seed/yoga/200/200",
    available: true,
  },
  {
    id: "fitness-3",
    title: "필라테스",
    category: "운동",
    tutor: "정필라",
    enrolled: 9,
    capacity: 12,
    description: "코어 근육 강화와 자세 교정을 돕는 필라테스 수업입니다.",
    thumbnail: "https://picsum.photos/seed/pilates/200/200",
    available: true,
  },

  // 💰 금융
  {
    id: "finance-1",
    title: "주식 투자",
    category: "금융",
    tutor: "이애널리스트",
    enrolled: 20,
    capacity: 30,
    description: "주식 초보를 위한 기본 개념부터 투자 전략까지.",
    thumbnail: "https://picsum.photos/seed/stock/200/200",
    available: true,
  },
  {
    id: "finance-2",
    title: "부동산 기초",
    category: "금융",
    tutor: "홍중개",
    enrolled: 10,
    capacity: 20,
    description: "부동산 시장의 기초 지식과 투자 전략을 알려드립니다.",
    thumbnail: "https://picsum.photos/seed/estate/200/200",
    available: true,
  },
  {
    id: "finance-3",
    title: "가계부 작성법",
    category: "금융",
    tutor: "최가계",
    enrolled: 25,
    capacity: 30,
    description: "지출을 효율적으로 관리하는 가계부 작성 실습.",
    thumbnail: "https://picsum.photos/seed/budget/200/200",
    available: false,
  },

  // 💻 프로그래밍
  {
    id: "programming-1",
    title: "React Native 입문",
    category: "프로그래밍",
    tutor: "김개발",
    enrolled: 18,
    capacity: 25,
    description: "모바일 앱 개발을 위한 React Native 기초 과정.",
    thumbnail: "https://picsum.photos/seed/react/200/200",
    available: true,
  },
  {
    id: "programming-2",
    title: "파이썬 기초",
    category: "프로그래밍",
    tutor: "이파이",
    enrolled: 22,
    capacity: 30,
    description: "프로그래밍 입문자를 위한 파이썬 문법과 실습.",
    thumbnail: "https://picsum.photos/seed/python/200/200",
    available: true,
  },
  {
    id: "programming-3",
    title: "웹 개발 풀스택",
    category: "프로그래밍",
    tutor: "정풀스택",
    enrolled: 15,
    capacity: 20,
    description: "프론트엔드와 백엔드를 모두 배우는 풀스택 과정.",
    thumbnail: "https://picsum.photos/seed/fullstack/200/200",
    available: false,
  },

  // 🌍 외국어
  {
    id: "language-1",
    title: "영어 회화",
    category: "외국어",
    tutor: "존샘",
    enrolled: 30,
    capacity: 40,
    description: "실생활에서 바로 쓸 수 있는 영어 회화 배우기.",
    thumbnail: "https://picsum.photos/seed/english/200/200",
    available: true,
  },
  {
    id: "language-2",
    title: "일본어 초급",
    category: "외국어",
    tutor: "사토선생",
    enrolled: 12,
    capacity: 20,
    description: "히라가나부터 기초 회화까지 배우는 일본어 수업.",
    thumbnail: "https://picsum.photos/seed/japanese/200/200",
    available: true,
  },
  {
    id: "language-3",
    title: "중국어 기초",
    category: "외국어",
    tutor: "리선생",
    enrolled: 18,
    capacity: 25,
    description: "발음과 기본 회화를 중심으로 한 중국어 입문 수업.",
    thumbnail: "https://picsum.photos/seed/chinese/200/200",
    available: false,
  },
];


export default function CategoryLessonScreen({ navigation, route }) {
  const { category } = route.params || { category: "전체" };
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [sortOption, setSortOption] = useState("인기순");
  const [expandedId, setExpandedId] = useState(null); // ✅ 펼쳐진 카드 id 저장

  // 필터링
  let filteredLessons = dummyLessons.filter(
    (l) =>
      (category === "전체" || l.category === category) &&
      (showUnavailable || l.available)
  );

  // 정렬
  if (sortOption === "최신순") {
    filteredLessons = [...filteredLessons].reverse();
  } else if (sortOption === "리뷰 많은 순") {
    filteredLessons = [...filteredLessons]; // 나중에 리뷰 수 기준 정렬
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} 과외 목록</Text>

      {/* 정렬 옵션 */}
      <View style={styles.sortRow}>
        {["인기순", "최신순", "리뷰 많은 순"].map((option) => (
          <TouchableOpacity key={option} onPress={() => setSortOption(option)}>
            <Text
              style={[
                styles.sortBtn,
                sortOption === option && styles.sortBtnActive, // ✅ 선택된 옵션 강조
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 토글 */}
      <View style={styles.switchRow}>
        <Text>신청 불가 항목 보기</Text>
        <Switch value={showUnavailable} onValueChange={setShowUnavailable} />
      </View>

      {/* 카드형 리스트 */}
      <FlatList
        data={filteredLessons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isExpanded = expandedId === item.id; // 현재 펼쳐진 카드인지 체크

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("LessonDetail", { lesson: item })}
            >
              {/* 썸네일 */}
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />

              {/* 내용 */}
              <View style={styles.cardContent}>
                <Text style={styles.lessonTitle}>{item.title}</Text>
                
                {/* 설명 */}
                <Text
                  style={styles.description}
                  numberOfLines={isExpanded ? undefined : 2} // ✅ 펼쳐진 경우 전체, 아니면 2줄
                  ellipsizeMode="tail"
                  onPress={(e) => {
                    e.stopPropagation(); // 카드 클릭 이벤트 막음
                    setExpandedId(isExpanded ? null : item.id);
                  }}
                >
                  {item.description}
                </Text>

                <View style={styles.footerRow}>
                  <View>
                    <Text style={styles.tutor}>{item.tutor}</Text>
                    <Text style={styles.capacity}>
                      {item.enrolled}/{item.capacity}
                    </Text>
                  </View>
                  {!item.available && (
                    <Text style={styles.unavailable}>신청 불가</Text>
                  )}
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
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  sortRow: { flexDirection: "row", alignItems: "center"},
  sortBtn: { marginLeft: 10, color: "blue" },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 10,
    marginBottom: 16,
  },
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
  },
  thumbnail: { width: "100%", height: 100 },
  cardContent: { padding: 12 },
  lessonTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  description: { fontSize: 13, color: "#555", marginBottom: 10, lineHeight: 18 },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  tutor: { fontSize: 13, fontWeight: "500" },
  capacity: { fontSize: 12, color: "gray" },
  unavailable: { fontSize: 12, color: "red", fontWeight: "bold" },
});
