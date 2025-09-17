// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// // Screens
// import LoginScreen from "../screens/LoginScreen";
// import RegisterScreen from "../screens/RegisterScreen";
// import HomeScreen from "../screens/HomeScreen";

// // import CategoryMenuScreen from "../screens/CategoryMenuScreen";
// import CategoryLessonScreen from "../screens/CategoryLessonScreen";

// import LessonCreateScreen from "../screens/LessonCreateScreen";
// import LessonDetailScreen from "../screens/LessonDetailScreen";

// import AIChatbotScreen from "../screens/AIChatbotScreen";
// import ChatListScreen from "../screens/ChatListScreen";
// import ChatScreen from "../screens/ChatScreen";

// import ReviewWriteScreen from "../screens/ReviewWriteScreen";
// import MyPageScreen from "../screens/MyPageScreen";
// import IntroScreen from "../screens/IntroScreen";
// import SearchScreen from "../screens/SearchScreen";

// // import MyLessonsOngoingScreen from "../screens/MyLessonsOngoingScreen";
// // import MyLessonsCompletedScreen from "../screens/MyLessonsCompletedScreen";
// // import MyLessonsFavoriteScreen from "../screens/MyLessonsFavoriteScreen";
// // import MyLessonsCreatedScreen from "../screens/MyLessonsCreatedScreen";
// // import MyLessonsPastCreatedScreen from "../screens/MyLessonsPastCreatedScreen";

// const Stack = createNativeStackNavigator();

// export default function RootNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         {/* Auth */}
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Register" component={RegisterScreen} />

//         {/* Main */}
//         <Stack.Screen name="Home" component={HomeScreen} />
//         {/* <Stack.Screen name="CategoryMenu" component={CategoryMenuScreen} /> */}
//         <Stack.Screen name="CategoryLesson" component={CategoryLessonScreen} />

//         {/* Lessons */}
//         <Stack.Screen name="LessonCreate" component={LessonCreateScreen} />
//         <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />

//         {/* Chat */}
//         <Stack.Screen name="AIChatbot" component={AIChatbotScreen} />
//         <Stack.Screen name="ChatList" component={ChatListScreen} />
//         <Stack.Screen name="Chat" component={ChatScreen} />

//         {/* Review */}
//         <Stack.Screen name="ReviewWrite" component={ReviewWriteScreen} />

//         {/* User */}
//         <Stack.Screen name="MyPage" component={MyPageScreen} />
//         <Stack.Screen name="Intro" component={IntroScreen} />
//         <Stack.Screen name="Search" component={SearchScreen} />

//         {/* My Lessons */}
//         {/* <Stack.Screen name="MyLessonsOngoing" component={MyLessonsOngoingScreen} />
//         <Stack.Screen name="MyLessonsCompleted" component={MyLessonsCompletedScreen} />
//         <Stack.Screen name="MyLessonsFavorite" component={MyLessonsFavoriteScreen} />
//         <Stack.Screen name="MyLessonsCreated" component={MyLessonsCreatedScreen} />
//         <Stack.Screen name="MyLessonsPastCreated" component={MyLessonsPastCreatedScreen} /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // 아이콘 패키지

// Screens
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import LessonCreateScreen from "../screens/LessonCreateScreen";
import ChatListScreen from "../screens/ChatListScreen";
import MyPageScreen from "../screens/MyPageScreen";
import CategoryLessonScreen from "../screens/CategoryLessonScreen";
import LessonDetailScreen from "../screens/LessonDetailScreen";
import FindIdScreen from "../screens/FindIdScreen";
import FindPasswordScreen from "../screens/FindPasswordScreen";
import AIChatbotScreen from "../screens/AIChatbotScreen";
import ChatScreen from "../screens/ChatScreen";
import IntroScreen from "../screens/IntroScreen";
import ReviewWriteScreen from "../screens/ReviewWriteScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "LessonCreate") iconName = "add-circle";
          else if (route.name === "ChatList") iconName = "chatbubbles";
          else if (route.name === "MyPage") iconName = "person";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "홈" }} />
      <Tab.Screen
        name="LessonCreate"
        component={LessonCreateScreen}
        options={{ title: "과외 생성" }}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{ title: "채팅" }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{ title: "마이페이지" }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="FindId" component={FindIdScreen} />
        <Stack.Screen name="FindPassword" component={FindPasswordScreen} />

        {/* Tabs */}
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />

        {/* Extra Screens */}
        <Stack.Screen name="CategoryLesson" component={CategoryLessonScreen} />
        <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
        <Stack.Screen name="AIChatbot" component={AIChatbotScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="ReviewWrite" component={ReviewWriteScreen} />
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
