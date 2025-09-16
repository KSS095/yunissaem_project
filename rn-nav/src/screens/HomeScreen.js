import { View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="자세히 보기로 이동"
        onPress={() => navigation.navigate('Detail', { id: 1 })}
      />
    </View>
  );
}
