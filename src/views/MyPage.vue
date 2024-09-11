<template>
  <div class="mypage-container">
    <!-- 상단 사진부 -->
    <div class="photo-section">
      <!-- 가운데 정렬된 프로필 정보 -->
      <div class="profile-info-centered">
        <!-- 둥근 사각형 프로필 사진 -->
        <img
          :src="user.profilePictureUrl"
          alt="Profile Picture"
          class="profile-picture"
        />
        <div class="profile-details">
          <div class="username">{{ user.username }}</div>
          <div class="email">{{ user.email }}</div>
        </div>
      </div>
      <!-- 내 프로필 버튼 -->
      <div class="profile-actions">
        <button class="action-btn">내 프로필</button>
      </div>
    </div>

    <!-- 하단 정보부 -->
    <div class="info-section">
      <!-- 첫 번째 박스 -->
      <div class="info-box">
        <div class="info-item">
          <span class="label">id:</span>
          <span class="label_value"></span>
        </div>
        <div class="info-item">
          <div>
            <span class="label">이메일:</span>
            <span class="label_value">{{ user.email }}</span>
          </div>
          <div></div>
        </div>
        <div class="info-item">
          <div>
            <span class="label">유저네임:</span>
            <input type="text" class="input-field" v-model="user.username" />
          </div>
          <CogIcon class="edit-icon" />
        </div>
        <div class="info-item">
          <div>
            <span class="label">비밀번호:</span>
            <input
              type="password"
              placeholder="비밀번호 변경"
              class="input-field"
            />
          </div>
          <CogIcon class="edit-icon" />
        </div>
      </div>

      <!-- 두 번째 박스 -->
      <div class="info-box">
        <div class="info-item">
          <div>
            <span class="label">포스트 수:</span>
            <span class="label_value">{{ user.posts.length }}</span>
          </div>
          <div></div>
        </div>
        <div class="info-item">
          <div>
            <span class="label">팔로워:</span>
            <span class="label_value">{{ user.followers.length }}</span>
          </div>
          <div></div>
        </div>
        <div class="info-item">
          <div>
            <span class="label">팔로잉:</span>
            <span class="label_value">{{ user.following.length }}</span>
          </div>
          <div></div>
        </div>
        <div class="info-item">
          <div>
            <span class="label">가입일자:</span>
            <span class="label_value">{{ formatDate(user.createdAt) }}</span>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CogIcon } from "@heroicons/vue/24/outline"; // 연필 모양 아이콘 임포트
import { user1 } from "@/data/dubbyModel"; // 더미 유저 데이터 가져오기

export default defineComponent({
  name: "MyPage",
  setup() {
    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString();
    };

    return {
      user: user1,
      formatDate,
    };
  },
  components: {
    CogIcon,
  },
});
</script>

<style lang="scss" scoped>
/* 반응형을 위한 브레이크포인트 변수 설정 */
$breakpoint-mobile: 640px;
$breakpoint-tablet: 1024px;

/* 전체 컨테이너 */
.mypage-container {
  width: 100%;
  max-width: 100%;
  margin: 20px auto;
  padding: 20px;
  box-sizing: border-box;
}

/* 사진부 */
.photo-section {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #ddd;
  flex-wrap: wrap; /* 화면 크기가 작으면 요소들이 아래로 이동 */
}

/* 가운데 정렬된 프로필 정보 */
.profile-info-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 40px;
  max-width: 100%;
}

/* 둥근 사각형 프로필 사진 */
.profile-picture {
  width: 100%;
  max-width: 400px; /* 최대 400px로 설정 */
  height: auto;
  border-radius: 20%;
  margin-bottom: 20px;
}

/* 유저 이름 및 이메일 */
.username {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.email {
  font-size: 16px;
  color: #555;
  text-align: center;
}

/* 프로필 액션 버튼 */
.profile-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  margin: 20px 0;
}

.action-btn {
  background-color: transparent;
  color: #a5a5a5;
  font-size: 20px;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.action-btn:hover {
  color: #555555;
}

/* 정보부 */
.info-section {
  margin-top: 20px;
}

.info-box {
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #60d360;
  box-shadow: 0 0 15px 5px rgba(96, 211, 96, 0.11);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
  font-size: large;
  color: #555;
}

.label_value {
  margin-left: 20px;
  color: #9b9b9b;
}

.input-field {
  background-color: transparent;
  border: none;
  padding: 8px;
  font-size: large;
  color: #555;
  margin-left: 20px;
  outline: none;
  font-weight: bold;
}

.edit-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

/* 반응형 디자인 */
@media (min-width: $breakpoint-mobile) {
  .photo-section {
    margin-right: 60px; /* 마진 라이트 80 적용 */
  }
  .info-section {
    margin-right: 60px; /* 마진 라이트 80 적용 */
  }
}

@media (max-width: $breakpoint-tablet) {
  .profile-picture {
    max-width: 100%; /* 사진 크기 조정 */
  }

  .profile-actions {
    align-items: center; /* 버튼들을 중앙 정렬 */
  }
}

@media (max-width: $breakpoint-mobile) {
  .profile-picture {
    max-width: 100%; /* 작은 화면에서는 최대 너비를 100%로 설정 */
  }
  .profile-actions {
    margin: 10px 0;
  }
}
</style>
