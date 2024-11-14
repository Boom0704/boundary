<template>
  <div class="mypage-container">
    <!-- 상단 사진부 -->
    <div class="photo-section">
      <div class="profile-info-centered">
        <img
          :src="localUser.profilePictureUrl"
          alt="Profile Picture"
          class="profile-picture"
          @click="openChangeModal"
        />
        <div class="profile-details">
          <div class="username">{{ localUser.username }}</div>
          <div class="email">{{ localUser.email }}</div>
        </div>
      </div>
      <div class="profile-actions">
        <button class="action-btn" @click="goToProfile">내 프로필</button>
        <button class="action-btn" @click="logout">로그아웃</button>
        <button class="action-btn" @click="openDeleteModal">삭제</button>
        <button class="action-btn" @click="openFriendsModal">친구요청</button>
      </div>
    </div>

    <!-- 하단 정보부 -->
    <div class="info-section">
      <div class="info-box">
        <div class="info-item">
          <span class="label">유저네임:</span>
          <span class="label_value">{{ localUser.username }}</span>
        </div>
        <div class="info-item">
          <span class="label">생일:</span>
          <span class="label_value">{{ localUser.birthday }}</span>
        </div>
        <div class="info-item">
          <span class="label">웹사이트:</span>
          <input type="text" class="input-field" v-model="localUser.website" />
          <CogIcon @click="updateUser" class="edit-icon" />
        </div>
        <div class="info-item">
          <span class="label">이메일:</span>
          <input type="text" class="input-field" v-model="localUser.email" />
          <CogIcon @click="updateUser" class="edit-icon" />
        </div>
        <div class="info-item">
          <span class="label">한줄설명:</span>
          <input type="text" class="input-field" v-model="localUser.bio" />
          <CogIcon @click="updateUser" class="edit-icon" />
        </div>
        <div class="info-item">
          <span class="label">공개도:</span>
          <div class="visibility-options">
            <label>
              <input type="radio" value="FULL" v-model="localUser.visibility" />
              전체 공개
            </label>
            <label>
              <input
                type="radio"
                value="PARTIAL"
                v-model="localUser.visibility"
              />
              부분 공개
            </label>
            <label>
              <input
                type="radio"
                value="PRIVATE"
                v-model="localUser.visibility"
              />
              비공개
            </label>
          </div>
          <CogIcon @click="updateUser" class="edit-icon" />
        </div>
        <div class="info-item">
          <span class="label">비밀번호:</span>
          <input
            type="password"
            placeholder="비밀번호 변경"
            class="input-field"
          />
          <CogIcon class="edit-icon" />
        </div>
      </div>

      <div class="info-box">
        <div class="info-item">
          <span class="label">Post:</span>
          <span class="label_value">{{ getPostCount() }}</span>
        </div>
        <div class="info-item">
          <span class="label">Friends:</span>
          <span class="label_value">{{ getFriendsCount() }}</span>
        </div>
        <div class="info-item">
          <span class="label">HashTag:</span>
          <span class="label_value">{{ getHashtagCount() }}</span>
        </div>
        <div class="info-item">
          <span class="label">가입일자:</span>
          <span class="label_value">{{ formatDate(localUser.createdAt) }}</span>
        </div>
      </div>
    </div>

    <!-- 삭제 확인 모달 -->
    <ConfirmDeleteModal
      v-if="showDeleteModal"
      :onConfirm="deleteAccount"
      :onClose="closeModal"
    />
    <!-- 프로필 사진 변경 모달 -->
    <ProfilePictureChangeModal
      v-if="showChangeModal"
      :onConfirm="changeProfilePicture"
      :onClose="closeChangeModal"
    />
    <FriendsModal
      v-if="showFriendsModal"
      :username="localUser.username"
      @close="closeFriendsModal"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { CogIcon } from "@heroicons/vue/24/outline";
import {
  deleteUser,
  logoutUser,
  fetchUserDetailData,
  updateUserInfo,
} from "@/utils/api";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useSessionCheck } from "@/hooks/useSessionCheck";
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal.vue";
import ProfilePictureChangeModal from "@/components/modal/ProfilePictureChangeModal.vue";
import FriendsModal from "@/components/modal/FriendsModal.vue";

export default defineComponent({
  name: "MyPage",
  components: {
    FriendsModal,
    CogIcon,
    ConfirmDeleteModal,
    ProfilePictureChangeModal,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    const showDeleteModal = ref(false);
    const showChangeModal = ref(false);
    const showFriendsModal = ref(false);

    // Vuex에서 현재 유저 정보 가져오기
    const user = computed(() => store.getters["user/getUser"]);
    const localUser = ref({ ...user.value });
    const localUserDetail = ref();

    const updateUser = async () => {
      const updateData = {
        website: localUser.value.website,
        email: localUser.value.email,
        bio: localUser.value.bio,
        visibility: localUser.value.visibility,
      };

      try {
        const success = await updateUserInfo(localUser.value.id, updateData);
        if (success) {
          toast.success("정보가 성공적으로 업데이트되었습니다!");
        } else {
          toast.error("정보 업데이트에 실패했습니다.");
        }
      } catch (error) {
        toast.error("프로필 업데이트 중 오류가 발생했습니다.");
      }
    };

    onMounted(() => {
      const loadUserData = async () => {
        const userData = await fetchUserDetailData(user.value.username);
        if (userData) {
          localUserDetail.value = userData;
          console.log(localUserDetail.value);
        } else {
          toast.error("유저 정보를 가져오는 데 실패했습니다.");
        }
      };
      loadUserData();
    });

    watch(user, (newValue) => {
      localUser.value = { ...newValue };
    });

    const getPostCount = () => {
      return localUserDetail.value?.cleanedPosts?.length || 0;
    };

    const getFriendsCount = () => {
      return localUserDetail.value?.friends?.length || 0;
    };

    const getHashtagCount = () => {
      return Object.keys(localUserDetail.value?.hashtagCount || {}).length;
    };

    const logout = async () => {
      const success = await logoutUser();
      if (success) {
        toast.success("로그아웃 성공!", { timeout: 2000 });
        const { resetSessionCheck, checkSession } = useSessionCheck();
        resetSessionCheck();
        await checkSession();
        await router.push("/login");
        await store.dispatch("user/logout"); // 유저 정보 초기화
      } else {
        toast.error("로그아웃 실패. 다시 시도해주세요.", { timeout: 2000 });
      }
    };

    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString();
    };

    const goToProfile = () => {
      toast.success(`${localUser.value.username} 프로필로 이동!`, {
        timeout: 2000,
      });
      router.push(`/profile/${localUser.value.username}`);
    };

    const openDeleteModal = () => {
      showDeleteModal.value = true;
    };

    const closeModal = () => {
      showDeleteModal.value = false;
    };

    const openFriendsModal = () => {
      console.log("친구 요청 모달 열기");
      showFriendsModal.value = true; // 친구 요청 모달을 true로 설정
      console.log("showFriendsModal:", showFriendsModal.value); // 상태 출력
    };

    const closeFriendsModal = () => {
      showFriendsModal.value = false;
    };

    const openChangeModal = () => {
      showChangeModal.value = true;
    };

    const closeChangeModal = () => {
      showChangeModal.value = false;
    };

    const deleteAccount = async () => {
      if (localUser.value) {
        const success = await deleteUser(localUser.value.id);
        if (success) {
          const { resetSessionCheck, checkSession } = useSessionCheck();
          resetSessionCheck();
          await checkSession();
          await router.push("/login");
          await store.dispatch("user/logout"); // 유저 정보 초기화
        } else {
          toast.error("계정 삭제 실패. 다시 시도해주세요.");
        }
      }
    };

    const changeProfilePicture = async (file: File) => {
      const isSuccess = await store.dispatch("user/updateProfilePicture", file);
      if (isSuccess) {
        // Directly update the local profile picture to reflect the new one
        console.log(isSuccess + "is");
        const updatedUser = store.getters["user/getUser"];
        console.log(updatedUser);
        localUser.value.profilePictureUrl = updatedUser.profilePictureUrl;
      }
      return isSuccess;
    };

    return {
      user,
      localUser,
      formatDate,
      logout,
      openDeleteModal,
      openFriendsModal,
      closeFriendsModal,
      closeModal,
      deleteAccount,
      showDeleteModal,
      showChangeModal,
      showFriendsModal,
      openChangeModal,
      closeChangeModal,
      changeProfilePicture,
      goToProfile,
      getHashtagCount,
      getPostCount,
      getFriendsCount,
      updateUser,
    };
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
