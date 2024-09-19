<template>
  <div class="signup-overlay" @click.self="closeModal">
    <div class="signup-container">
      <h2 class="signup-title">가입하기</h2>

      <!-- 성 입력 -->
      <input
        v-model="lastName"
        type="text"
        placeholder="성"
        class="input-field"
      />
      <!-- 이름 입력 -->
      <input
        v-model="firstName"
        type="text"
        placeholder="이름"
        class="input-field"
      />
      <!-- 이메일/휴대폰 번호 입력 -->
      <input
        v-model="contactInfo"
        type="text"
        placeholder="휴대폰 번호 또는 이메일"
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
          v-model="birthday"
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
import { ref } from "vue";

export default {
  name: "SignUp",
  props: {
    close: {
      type: Function,
      required: true,
    },
  },
  setup(props: { close: () => void }) {
    const lastName = ref("");
    const firstName = ref("");
    const contactInfo = ref("");
    const password = ref("");
    const birthday = ref("");
    const gender = ref("");

    // 생일 입력 유효성 검사
    const validateBirthday = () => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(birthday.value)) {
        alert("올바른 생년월일을 입력해주세요.");
        birthday.value = "";
      }
    };

    // 성별 선택
    const selectGender = (selectedGender: string) => {
      gender.value = selectedGender;
    };

    // 회원가입 처리
    const signup = () => {
      // 여기에 회원가입 로직 추가
      console.log("회원가입 정보", {
        lastName: lastName.value,
        firstName: firstName.value,
        contactInfo: contactInfo.value,
        password: password.value,
        birthday: birthday.value,
        gender: gender.value,
      });
    };

    // 모달 닫기
    const closeModal = () => {
      props.close();
    };

    return {
      lastName,
      firstName,
      contactInfo,
      password,
      birthday,
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
/* 모달의 배경을 어둡게 */
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

/* 회원가입 모달 창 */
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
  background-color: darken(rgba(142, 199, 142, 0.721), 10%);
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
