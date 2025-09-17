# yunissaem_project

.gitignore 참고

React Native (Expo) + Docker (Nginx) 기본 구조 연습용 프로젝트  
👉 **목표**: RN 앱 화면 전환(nav) 연습 + Nginx 컨테이너 테스트  

### 1. 프로젝트 만들기

npx create-expo-app@latest rn-nav           
% Need to install the following packages:
% create-expo-app@3.5.3

$ cd rn-nav
$ npx expo start (QR 나오면 찍기)
단, 실행 중인 컴퓨터와 핸드폰이 연결된 와이파이가 다르다면
$ npx expo start --tunnel

## 🔄 Expo 캐시 초기화 (중요)

간혹 `Welcome to Expo`, `Start by creating a file in the app directory` 같은 기본 화면이 뜰 때가 있습니다.  

이 경우는 **예전 빌드 결과물이 캐시에 남아 있어서** 발생합니다.  
(실제로는 app/index.tsx 파일이 없어도, 캐시에 저장된 옛 코드가 불러와지는 것)

### 해결 방법

1) PC 캐시 삭제
```bash
npx expo start -c
```
2) Expo Go 앱 캐시 삭제
안드로이드:
설정 → 앱 → Expo Go → 저장공간 → 캐시 삭제

    iOS:
Expo Go 앱 삭제 후 다시 설치

3) 다시 실행
cd rn-nav
npx expo start


### 2. 필수 패키지 설치
npm install @react-navigation/native @react-navigation/native-stack

npx expo install react-native-screens react-native-safe-area-context


### 3. 탭 네비게이터 설치
npm install @react-navigation/bottom-tabs

npx expo install react-native-gesture-handler react-native-reanimated

(내가 만든 화면들 띄우려면 기본 템플릿 (add폴더) 삭제해야함)


```
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
```