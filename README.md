# yunissaem_project

.gitignore 참고

React Native (Expo) + Docker (Nginx) 기본 구조 연습용 프로젝트  
👉 **목표**: RN 앱 화면 전환(nav) 연습 + Nginx 컨테이너 테스트  

1. 프로젝트 만들기
$ npx create-expo-app@latest rn-nav           
% Need to install the following packages:
% create-expo-app@3.5.3

$ cd rn-nav
$ npx expo start (QR 나오면 찍기)

2. 필수 패키지 설치
$ npm install @react-navigation/native @react-navigation/native-stack
$ npx expo install react-native-screens react-native-safe-area-context


3. 탭 네비게이터 설치
$ npm install @react-navigation/bottom-tabs
$ npx expo install react-native-gesture-handler react-native-reanimated

(내가 만든 화면들 띄우려면 기본 템플릿 (add폴더) 삭제해야함)


my-project/                   ← 최상위 폴더 (그냥 이름은 마음대로)
│
├── rn-nav/        ← React Native 앱 (프론트엔드, 휴대폰 앱)
│   ├── App.js
│   └── src/
│       └── screens/
│           ├── HomeScreen.js
│           └── DetailScreen.js
│       └── navigation/
│           └── RootNavigator.js
│
└── docker-nginx-demo/        ← 서버 (Docker로 실행)
    ├── docker-compose.yml
    └── nginx.conf