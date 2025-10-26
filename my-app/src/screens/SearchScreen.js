import { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const popularSearches = ["React", "피아노", "헬스", "영어"];
const recentSearches = ["주식", "프로그래밍"];

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // 더미 결과 (임시)
    setResults([{ id: "1", title: `${query} 과외 예시` }]);
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
        <Text key={idx} style={styles.recent}>
          {item}
        </Text>
      ))}

      {/* 검색 결과 */}
      <Text style={styles.sectionTitle}>검색 결과</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => navigation.navigate("LessonDetail", { lesson: item })}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
  },
  iconButton: {
    marginLeft: 8,
    padding: 6,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginTop: 20, marginBottom: 8 },
  popularRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 4,
    maxWidth: 100,
    alignSelf: 'center',
  },
  recent: { fontSize: 14, color: "gray", marginVertical: 2 },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
