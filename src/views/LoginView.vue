<template>
  <div class="login-container">
    <SignUp v-if="showSignUp" :close="closeModal" />
    <div class="promo-section" v-if="isTabletOrLarger">
      <img src="@/assets/logo.png" alt="Logo" class="promo-logo" />
      <div class="promo-text-container">
        <p class="promo-text">이웃과 함께 당신의 이야기를 나누고</p>
        <p class="promo-text">새로운 추억을 만들어보세요.</p>
      </div>
    </div>
    <div class="login-box">
      <!-- 상단 로고 -->
      <img
        src="@/assets/logo.png"
        alt="Logo"
        class="logo"
        v-if="!isTabletOrLarger"
      />

      <!-- 로그인 실패 메시지 -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <!-- 이메일 입력 -->
      <input
        type="text"
        v-model="email"
        placeholder="이메일"
        class="input-field"
      />

      <!-- 패스워드 입력 -->
      <input
        type="password"
        v-model="password"
        placeholder="비밀번호"
        class="input-field"
      />

      <!-- 로그인 버튼 -->
      <button class="login-btn" @click="login">로그인</button>

      <!-- 회원가입 및 아이디 찾기 -->
      <p class="additional-options">
        <a href="#" @click.prevent="showSignUp = true">회원가입</a> |
        <a href="#">아이디 찾기</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import SignUp from "@/components/SignUp.vue";
import { useToast } from "vue-toastification";
import { loginUser } from "@/utils/api";

export default {
  name: "LoginView",
  components: {
    SignUp,
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const showSignUp = ref(false);
    const router = useRouter();
    const toast = useToast();
    const isTabletOrLarger = ref(window.innerWidth >= 1024);

    const login = async () => {
      try {
        const response = await loginUser({
          email: email.value,
          password: password.value,
        });

        // response가 false일 경우 처리
        if (response && response.status === 200) {
          toast.success("로그인 성공!", { timeout: 2000 });
          errorMessage.value = "";
          router.push("/"); // 로그인 성공 시 홈으로 이동
        } else {
          throw new Error("Unexpected response status");
        }
      } catch (error: any) {
        // 오류 처리
        if (error.response && error.response.status === 401) {
          toast.error("아이디 또는 비밀번호가 잘못되었습니다.", {
            timeout: 2000,
          });
        } else {
          toast.error("로그인 실패. 다시 시도해주세요.", { timeout: 2000 });
        }
        errorMessage.value = "로그인 실패. 다시 시도해주세요.";
      }
    };

    const closeModal = () => {
      showSignUp.value = false;
    };

    const updateViewport = () => {
      isTabletOrLarger.value = window.innerWidth >= 1024;
    };

    window.addEventListener("resize", updateViewport);

    return {
      email,
      password,
      errorMessage,
      login,
      isTabletOrLarger,
      showSignUp,
      closeModal,
    };
  },
};
</script>

<style lang="scss" scoped>
$breakpoint-mobile: 640px;
$breakpoint-tablet: 1024px;
$primary-color: #e7efe7; // 연한 연두색
$button-color: #60d360; // 버튼 녹색
$text-color: #555;
$border-radius: 10px;

/* 전체 로그인 컨테이너 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background-color: $primary-color;
  padding: 0 5%;
  box-sizing: border-box;
  flex-direction: column;
  margin-bottom: 5%;

  @media (min-width: $breakpoint-tablet) {
    flex-direction: row;
    justify-content: space-around;
  }
}

/* 프로모션 섹션 (테블릿 뷰 이상에서만 표시) */
.promo-section {
  display: flex;
  align-items: center;
  text-align: left;
  max-width: 1400px;
  margin-right: 80px;

  .promo-logo {
    width: 120px;
    margin-right: 20px;
  }

  .promo-text {
    font-size: 24px;
    line-height: 1.5;
    font-weight: bolder;
    color: $text-color;
    text-align: center; /* 중앙 정렬 */
    white-space: normal; /* 여유 공간에 따라 자동으로 줄바꿈 처리 */
  }
}

/* 로그인 박스 */
.login-box {
  background-color: white;
  padding: 40px;
  border-radius: $border-radius;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;

  @media (min-width: $breakpoint-tablet) {
    max-width: 300px;
  }
}

/* 로고 */
.logo {
  width: 100px;
  margin-bottom: 20px;
}

/* 입력 필드 */
.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 2px solid #ddd;
  border-radius: $border-radius;
  font-size: 16px;
  color: $text-color;
  box-sizing: border-box;
}

.input-field::placeholder {
  color: #aaa;
}

/* 로그인 버튼 */
.login-btn {
  width: 100%;
  background-color: $button-color;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 12px;
  border-radius: $border-radius;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: darken($button-color, 10%);
}

/* 추가 옵션 (회원가입/아이디 찾기) */
.additional-options {
  margin-top: 20px;
  color: $text-color;
}

.additional-options a {
  color: $text-color;
  text-decoration: none;
  font-weight: bold;
}

.additional-options a:hover {
  text-decoration: underline;
}

/* 오류 메시지 */
.error-message {
  color: red;
  margin-bottom: 15px;
}

/* 반응형 디자인 */
@media (max-width: $breakpoint-tablet) {
  .login-box {
    padding: 30px;
  }

  .logo {
    width: 80px;
  }
}

@media (max-width: $breakpoint-mobile) {
  .login-box {
    padding: 20px;
  }

  .logo {
    width: 60px;
  }

  .login-btn {
    font-size: 16px;
    padding: 10px;
  }

  .input-field {
    font-size: 14px;
  }

  .additional-options {
    font-size: 14px;
  }
}
</style>
