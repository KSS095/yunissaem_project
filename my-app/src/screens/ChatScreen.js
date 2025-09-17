import { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

export default function ChatScreen({ route }) {
  const { chatId } = route.params;
  const [messages, setMessages] = useState([
    { id: "1", from: "partner", text: "안녕하세요, 수업에 대해 문의주세요!" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;
    const newMsg = { id: Date.now().toString(), from: "me", text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.msg, item.from === "me" ? styles.myMsg : styles.otherMsg]}>
            <Text>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="메시지 입력"
        />
        <Button title="전송" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  msg: {
    padding: 10,
    borderRadius: 6,
    marginVertical: 4,
    maxWidth: "70%",
  },
  myMsg: { backgroundColor: "#d1fcd3", alignSelf: "flex-end" },
  otherMsg: { backgroundColor: "#f1f1f1", alignSelf: "flex-start" },
  inputRow: { flexDirection: "row", alignItems: "center" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginRight: 5,
  },
});
