<template>
  <div class="signup-overlay" @click.self="closeModal">
    <div class="signup-container">
      <h2 class="signup-title">가입하기</h2>

      <!-- 사용자 이름 입력 -->
      <input
        v-model="username"
        type="text"
        placeholder="사용자 이름"
        class="input-field"
      />

      <!-- 이메일 입력 -->
      <input
        v-model="email"
        type="email"
        placeholder="이메일"
        class="input-field"
      />

      <!-- 비밀번호 입력 -->
      <input
        v-model="password"
        type="password"
        placeholder="새 비밀번호"
        class="input-field"
      />

      <!-- 생일 입력 -->
      <div class="birthday-input">
        <input
          v-model="birthdayText"
          type="text"
          placeholder="YYYY-MM-DD"
          @blur="validateBirthday"
          class="input-field"
        />
        <input type="date" v-model="birthday" class="input-field date-picker" />
      </div>

      <!-- 성별 선택 -->
      <div class="gender-input">
        <button
          :class="{ selected: gender === 'female' }"
          @click="selectGender('female')"
          class="input-field gender-btn"
        >
          여성
        </button>
        <button
          :class="{ selected: gender === 'male' }"
          @click="selectGender('male')"
          class="input-field gender-btn"
        >
          남성
        </button>
      </div>

      <!-- 가입 버튼 -->
      <button class="signup-btn" @click="signup">가입하기</button>

      <!-- 취소 버튼 -->
      <button class="cancel-btn" @click="closeModal">취소</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { signupUser } from "@/utils/api";

export default {
  name: "SignUp",
  props: {
    close: {
      type: Function,
      required: true,
    },
  },
  setup(props: { close: () => void }) {
    const toast = useToast();

    const username = ref("");
    const email = ref("");
    const password = ref("");
    const birthday = ref(""); // Date input
    const birthdayText = ref(""); // Text input ("YYYY-MM-DD" 형식)
    const gender = ref("");

    // 입력값 검증
    const validateInputs = () => {
      if (!username.value) {
        toast.error("사용자 이름을 입력해주세요.", { timeout: 2000 });
        return false;
      }
      if (!email.value) {
        toast.error("이메일을 입력해주세요.", { timeout: 2000 });
        return false;
      }
      if (!password.value) {
        toast.error("비밀번호를 입력해주세요.", { timeout: 2000 });
        return false;
      }
      if (!birthdayText.value || !validateBirthday()) {
        toast.error("올바른 생년월일을 입력해주세요.", { timeout: 2000 });
        return false;
      }
      if (!gender.value) {
        toast.error("성별을 선택해주세요.", { timeout: 2000 });
        return false;
      }
      return true;
    };

    // 생일 입력 유효성 검사 (텍스트 필드)
    const validateBirthday = () => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(birthdayText.value)) {
        toast.error("올바른 생년월일을 입력해주세요. (YYYY-MM-DD 형식)", {
          timeout: 2000,
        });
        birthdayText.value = "";
        return false;
      }
      return true;
    };

    // 성별 선택
    const selectGender = (selectedGender: string) => {
      gender.value = selectedGender;
    };

    // Text 형식의 생일 입력이 date input과 동기화
    watch(birthdayText, (newVal) => {
      birthday.value = newVal; // 텍스트가 변경될 때 date picker와 동기화
    });

    // Date picker로 선택된 생일이 텍스트 입력 필드에 반영됨
    watch(birthday, (newVal) => {
      birthdayText.value = newVal; // 날짜 선택 시 텍스트 인풋 필드 업데이트
    });

    // 생일 데이터를 YYYY.MM.DD 형식으로 변환하여 저장
    const formatBirthday = (date: string) => {
      const parts = date.split("-");
      if (parts.length === 3) {
        return `${parts[0]}.${parts[1]}.${parts[2]}`;
      }
      return date;
    };

    // 회원가입 처리
    const signup = async () => {
      if (!validateInputs()) {
        return;
      }

      const formattedBirthday = formatBirthday(birthday.value);

      // User 데이터를 객체로 생성
      const User = {
        username: username.value,
        email: email.value,
        password: password.value,
        birthday: formattedBirthday, // 생일 저장
        gender: gender.value,
      };

      try {
        const response = await signupUser(User); // API 호출

        // 응답이 200일 때만 성공 처리
        if (response && response.status === 200) {
          toast.success("회원가입 성공!", { timeout: 2000 });
          props.close();
        } else {
          throw new Error("회원가입 실패: 예상치 못한 응답 상태");
        }
      } catch (error: any) {
        // 오류 메시지를 상세히 전달
        const message =
          error.response && error.response.status === 401
            ? "회원가입 실패: 권한이 없습니다."
            : "회원가입 실패: " + error.message;
        toast.error(message, {
          timeout: 2000,
        });
      }
    };

    // 모달 닫기
    const closeModal = () => {
      props.close();
    };

    return {
      username,
      email,
      password,
      birthday,
      birthdayText,
      gender,
      validateBirthday,
      selectGender,
      signup,
      closeModal,
    };
  },
};
</script>

<style scoped lang="scss">
.signup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.signup-container {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  position: relative;
}

.signup-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
}

.input-field {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
}

.date-picker {
  width: 48%;
  margin-left: 4%;
}

.birthday-input {
  display: flex;
}

.gender-input {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.gender-btn {
  flex: 1;
  margin-right: 10px;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  background-color: #f9f9f9;
  transition: background-color 0.3s;
}

.gender-btn.selected {
  background-color: #b6ffb6;
}

.gender-btn:hover {
  background-color: rgba(142, 199, 142, 0.721);
}

.signup-btn {
  width: 100%;
  padding: 12px;
  background-color: #60d360;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

.signup-btn:hover {
  background-color: darken(#60d360, 10%);
}

.cancel-btn {
  width: 100%;
  padding: 12px;
  background-color: rgb(249, 84, 84);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  margin-top: 10px;
  cursor: pointer;
}

.cancel-btn:hover {
  background-color: darken(rgb(206, 69, 69), 10%);
}
</style>
