import { View, Text, Button } from 'react-native';

export default function DetailScreen({ route, navigation }) {
  const { id } = route.params || {};
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>상세 화면 (id: {id})</Text>
      <Button title="뒤로가기" onPress={() => navigation.goBack()} />
    </View>
  );
}
