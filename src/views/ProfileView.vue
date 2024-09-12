<template>
  <div class="profile-container">
    <!-- 데이터부 -->
    <div class="data-section">
      <div class="profile-picture">
        <img :src="user.profilePictureUrl" alt="Profile Picture" />
      </div>
      <div class="user-info">
        <h2>{{ user.username }}</h2>
        <p class="bio">{{ user.bio }}</p>
        <!-- bio 적용 -->
        <div class="tags">
          <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <div class="icon-buttons">
          <!-- 아이콘 버튼들 추가 (예시로 하나만 추가) -->
          <button class="icon-btn">버튼</button>
        </div>
      </div>
    </div>

    <!-- 게시물부 -->
    <div class="post-section">
      <!-- 세팅파트 -->
      <div class="settings">
        <input type="range" v-model="gridCount" min="1" :max="maxGridCount" />
      </div>

      <!-- 선택파트 -->
      <div class="selection">
        <button
          @click="currentView = 'posts'"
          :class="{ active: currentView === 'posts' }"
        >
          게시글
        </button>
        <button
          @click="currentView = 'followers'"
          :class="{ active: currentView === 'followers' }"
        >
          팔로워
        </button>
        <button
          @click="currentView = 'following'"
          :class="{ active: currentView === 'following' }"
        >
          팔로잉
        </button>
      </div>

      <!-- 선택한 파트 하단 블록 -->
      <div
        class="selection-indicator"
        :style="{ left: currentViewPosition + '%' }"
      ></div>

      <!-- 보여주는 파트 -->
      <div
        v-if="currentView === 'posts'"
        class="grid"
        :style="{ gridTemplateColumns: `repeat(${gridCount}, 1fr)` }"
      >
        <div v-for="post in user.posts" :key="post.id" class="grid-item">
          <img :src="post.imageUrls[0]" alt="Post Image" />
        </div>
      </div>

      <div
        v-else-if="currentView === 'followers'"
        class="grid"
        :style="{ gridTemplateColumns: `repeat(${gridCount}, 1fr)` }"
      >
        <div
          v-for="follower in user.followers"
          :key="follower.id"
          class="grid-item"
        >
          <img :src="follower.profilePictureUrl" alt="Post Image" />
        </div>
      </div>

      <div
        v-else-if="currentView === 'following'"
        class="grid"
        :style="{ gridTemplateColumns: `repeat(${gridCount}, 1fr)` }"
      >
        <div
          v-for="following in user.following"
          :key="following.id"
          class="grid-item"
        >
          <img :src="following.profilePictureUrl" alt="Post Image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { user1 } from "@/data/dubbyModel";

export default defineComponent({
  name: "ProfileView",
  setup() {
    const user = ref(user1);
    const tags = ref(["태그1", "태그2", "태그3"]);
    const gridCount = ref(1);
    const maxGridCount = ref(4);
    const currentView = ref("posts");

    const currentViewPosition = computed(() => {
      if (currentView.value === "posts") return 0;
      if (currentView.value === "followers") return 33.33;
      return 66.66;
    });

    return {
      user,
      tags,
      gridCount,
      maxGridCount,
      currentView,
      currentViewPosition,
    };
  },
});
</script>

<style lang="scss" scoped>
$breakpoint-mobile: 640px;
$breakpoint-tablet: 1024px;

.profile-container {
  padding: 20px;
  border-bottom: 1px solid #d3d3d3;
  margin: 5% 0; /* 상하 10px의 마진 */
}

/* 데이터부 */
.data-section {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 공간을 균등 분배 */
  @media (max-width: $breakpoint-mobile) {
    flex-direction: column; /* 모바일에서는 세로 정렬 */
  }
}

/* 프로필 사진 */
.profile-picture img {
  border-radius: 80%;
  max-width: 500px;
  height: 440px;
  @media (max-width: $breakpoint-tablet) {
    min-width: 320px;
    height: auto;
  }
  @media (max-width: $breakpoint-mobile) {
    min-width: 400px;
    height: auto;
  }
}

/* 유저 정보 */
.user-info {
  margin-right: 7%;
  margin-left: 20px;
  @media (max-width: $breakpoint-tablet) {
    margin-left: 0;
  }
  @media (max-width: $breakpoint-mobile) {
    margin-left: 0;
    margin-right: 0;
    margin-top: 20px;
    text-align: center;
  }
}

/* bio와 태그 사이 간격 조정 */
.bio {
  margin-top: 30px; /* 간격을 기존보다 20px 더 추가 */
}

.tags {
  margin-top: 30px; /* 태그와 bio 사이 간격 추가 */
}

/* 태그 스타일 */
.tag {
  background-color: #e0e0e0;
  padding: 5px;
  border-radius: 5px;
  margin-right: 5px;
}

/* 아이콘 버튼 */
.icon-btn {
  background-color: transparent;
  border: 2px solid #ccc;
  border-radius: 10px; /* 둥근 모서리 */
  width: 50px;
  height: 50px; /* 정사각형 */
  margin-top: 30px; /* 태그와의 마진 */
  cursor: pointer;
}

.icon-btn:hover {
  border-color: #aaa;
}

/* 게시물부 */
.post-section {
  margin-top: 30px;
  border-top: 1px solid #d3d3d3; /* 구분선 추가 */
  border-bottom: 1px solid #d3d3d3;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-right: 5%;
}

/* 세팅파트 */
.settings {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px; /* 아래로 마진 추가 */
}

input[type="range"] {
  accent-color: #4caf50; /* 녹색 슬라이더 */
}

/* 선택파트 */
.selection {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.selection button {
  flex: 1; /* 버튼들이 가로로 가득 채우도록 설정 */
  font-size: 18px; /* 글씨 크기 증가 */
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.selection button:hover {
  font-weight: bold; /* 호버 시 강조 */
}

/* 선택한 파트 하단 블록 */
.selection-indicator {
  width: 33.33%;
  height: 4px;
  background-color: #000;
  transition: left 0.3s ease;
  position: relative;
  top: 5px;
}

/* 게시글, 팔로워, 팔로잉 그리드 */
.grid {
  display: grid;
  gap: 10px;
  margin-top: 20px;
  grid-template-columns: repeat(3, 1fr); /* 기본값으로 3줄 그리드 */
}

.grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 사진이 맞지 않으면 가운데 정렬 */
  background-color: #000; /* 사진이 없는 부분은 검정 */
  display: block;
}

.grid-item {
  width: 100%;
  padding-top: 100%; /* 정사각형 유지 */
  position: relative;
}

.grid-item img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
