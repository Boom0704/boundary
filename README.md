# https://github.com/Boom0704/boundaryBack

## 이 프로젝트는 위 백엔드와 함께 사용되기 위에 만들었습니다.

# Boundary

이 프로젝트는 Vue.js를 사용하여 개발된 소셜 네트워크 플랫폼의 프론트엔드입니다. 이 프로젝트는 Spring Boot 백엔드와 통신하며 사용자에게 다양한 기능을 제공합니다.

## 기술 스택
- **프레임워크**: Vue.js 3, Vue Router, Vuex
- **상태 관리**: Vuex
- **라우팅**: Vue Router
- **HTTP 통신**: Axios
- **알림 기능**: Vue Toastification
- **PWA**: Service Worker
- **언어**: TypeScript
- **라이브러리**: Heroicons, Lucide Vue, Cookies
- **스타일**: Sass
- **빌드 도구**: Vue CLI

## 주요 기능
- **사용자 관리**: 로그인, 회원가입, 세션 체크
- **게시글 관리**: 게시글 작성, 수정, 삭제, 조회
- **댓글 관리**: 댓글 작성 및 삭제
- **좋아요 기능**: 게시글 및 댓글에 좋아요 추가/삭제
- **친구 관리**: 친구 요청 보내기, 수락/거절, 친구 목록 조회
- **해시태그 기능**: 게시글에 해시태그 추가 및 검색
- **프로필 보기**: 사용자 프로필 조회 및 프로필 사진 변경

## 프로젝트 구조

### 디렉터리 구조
- `dist/`: 빌드된 배포 파일
- `node_modules/`: 설치된 npm 패키지
- `public/`: 정적 파일
- `src/`: 소스 코드
  - `assets/`: 이미지 및 리소스 파일
  - `components/`: Vue 컴포넌트
    - `common/`: 공통 컴포넌트 (`ProfileView.vue`, `ScrollComponent.vue` 등)
    - `modal/`: 모달 관련 컴포넌트
    - 기타 기능별 컴포넌트 (`AddContent.vue`, `PostItem.vue`, `SignUp.vue` 등)
  - `hooks/`: 커스텀 훅 (`useSessionCheck.ts`)
  - `interface/`: TypeScript 인터페이스 (`IModels.ts`)
  - `router/`: 라우터 설정 (`index.ts`)
  - `store/`: Vuex 스토어 (`index.ts`, `photoStore.ts`, `userStore.ts`)
  - `utils/`: 유틸리티 함수 및 상수 (`api.ts`, `breakpoints.ts`, `constants.ts`)
  - `views/`: 페이지 컴포넌트 (`HomeView.vue`, `LoginView.vue`, `ProfileView.vue` 등)
  - `App.vue`: 메인 앱 컴포넌트
  - `main.ts`: 앱 진입점

### 환경 설정 파일
- `.env.development`: 개발 환경 변수
- `.env.production`: 프로덕션 환경 변수

## package.json 설정
프로젝트의 주요 스크립트 및 의존성은 다음과 같습니다.

### 스크립트
- `serve`: 개발 서버 시작 (`vue-cli-service serve`)
- `build`: 프로덕션 빌드 (`vue-cli-service build`)
- `lint`: 코드 린트 (`vue-cli-service lint`)

### 의존성
- **프론트엔드 라이브러리**: `vue`, `vue-router`, `vuex`, `axios`, `core-js`
- **아이콘 라이브러리**: `@heroicons/vue`, `lucide-vue-next`
- **PWA 지원**: `register-service-worker`
- **알림**: `vue-toastification`
- **쿠키 관리**: `vue3-cookies`

### 개발 의존성
- **Vue CLI 플러그인**: `@vue/cli-plugin-babel`, `@vue/cli-plugin-eslint`, `@vue/cli-plugin-pwa`, `@vue/cli-plugin-router`, `@vue/cli-plugin-typescript`, `@vue/cli-plugin-vuex`
- **코드 린트 및 포맷팅**: `eslint`, `eslint-config-prettier`, `eslint-plugin-prettier`, `prettier`, `typescript`
- **스타일**: `sass`, `sass-loader`
  
## ESLint 설정
- **환경**: `node`
- **구성**: `plugin:vue/vue3-essential`, `eslint:recommended`, `@vue/typescript/recommended`, `plugin:prettier/recommended`
- **파서 옵션**: `ecmaVersion 2020`

## 브라우저 지원
- `> 1%`
- `last 2 versions`
- `not dead`
- `not ie 11`


```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
