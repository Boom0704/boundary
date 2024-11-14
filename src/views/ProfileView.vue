<template>
  <div class="profile-container">
    <!-- 데이터부 -->
    <div class="data-section" v-if="user">
      <div class="profile-picture">
        <img :src="user.user.profilePictureUrl" alt="Profile Picture" />
      </div>
      <div class="user-info">
        <h2>{{ user.user.username }} , ({{ user.user.email }})</h2>
        <p class="bio">{{ user.user.bio || "No bio available" }}</p>
        <!-- 프로필 공개 상태 표시 -->
        <p class="visibility">
          Profile visibility: {{ user.user.visibilityLabel }}
        </p>
        <div class="tags">
          <span
            v-for="(count, tag) in getHashtagsToShow(user.hashtagCount)"
            :key="tag"
            class="tag-item"
          >
            {{ count[0] }} ({{ count[1] }})
          </span>
          <!-- + n more 표시 -->
          <span v-if="user.hashtagCount.length > 9" class="tag-item">
            +{{ user.hashtagCount.length - 9 }} more
          </span>
        </div>
      </div>
    </div>

    <!-- 게시물부 -->
    <div class="post-section" v-if="user">
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
          Posts
        </button>
        <button
          @click="currentView = 'friends'"
          :class="{ active: currentView === 'friends' }"
        >
          Friends
        </button>
        <button
          @click="currentView = 'hashtags'"
          :class="{ active: currentView === 'hashtags' }"
        >
          Hashtags
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
        <div v-for="post in user.cleanedPosts" :key="post.id" class="grid-item">
          <router-link :to="`/detail/${post.id}`">
            <img :src="post.imageUrls[0]" alt="Post Image" />
          </router-link>
        </div>
      </div>

      <div
        v-else-if="currentView === 'friends'"
        class="grid"
        :style="{ gridTemplateColumns: `repeat(${gridCount}, 1fr)` }"
      >
        <div v-for="friend in user.friends" :key="friend.id" class="grid-item">
          <router-link :to="`/profile/${friend.username}`">
            <img :src="friend.profilePictureUrl" alt="Friend Profile" />
          </router-link>
        </div>
      </div>

      <div
        v-else-if="currentView === 'hashtags'"
        class="grid"
        :style="{ gridTemplateColumns: `repeat(${gridCount}, 1fr)` }"
      >
        <div
          v-for="(count, tag) in user.hashtagCount"
          :key="tag"
          class="grid-item"
        >
          <HashTag :tag="tag" :count="count" :line="gridCount" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { fetchUserDetailData } from "@/utils/api";
import { useRoute } from "vue-router";
import HashTag from "@/components/HashTag.vue";

export default defineComponent({
  name: "ProfileView",
  components: {
    HashTag,
  },
  setup() {
    const user = ref<any>(null); // 유저 정보 초기화
    const route = useRoute();
    const gridCount = ref(3);
    const maxGridCount = ref(4);
    const currentView = ref("posts");

    // 선택된 뷰에 맞는 위치 계산
    const currentViewPosition = computed(() => {
      if (currentView.value === "posts") return 0;
      if (currentView.value === "friends") return 33.33;
      return 66.66;
    });

    const visibilityLabel = computed(() => {
      return user.value?.visibility || "Private";
    });

    // 해시태그 9개만 표시하고 그 외는 + n 표시하는 computed property
    const getHashtagsToShow = computed(() => {
      return (hashtagCount: Record<string, number>) => {
        const hashtags = Object.entries(hashtagCount);
        return hashtags.slice(0, 9); // 9개까지만 반환
      };
    });

    // 컴포넌트 마운트 시 유저 데이터 요청
    onMounted(async () => {
      const username = Array.isArray(route.params.username)
        ? route.params.username[0]
        : route.params.username ?? "";
      const userData = await fetchUserDetailData(username);

      if (userData) {
        // 받은 데이터에 해시태그 카운트와 게시글들을 추가
        userData.user = userData.user || {};
        userData.hashtagCount = userData.hashtagCount || {};
        userData.cleanedPosts = userData.cleanedPosts || [];
        userData.friends = userData.friends || [];
        user.value = userData;
      } else {
        console.error("Failed to fetch user data.");
      }
    });

    return {
      user,
      gridCount,
      maxGridCount,
      currentView,
      currentViewPosition,
      visibilityLabel,
      getHashtagsToShow,
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
  margin: 5% 0;
}

/* 데이터부 */
.data-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: $breakpoint-mobile) {
    flex-direction: column;
  }
}

.profile-picture img {
  border-radius: 50%;
  max-width: 380px;
  min-width: 200px;
  height: auto;
  @media (max-width: $breakpoint-tablet) {
    min-width: 200px;
    height: auto;
  }
  @media (max-width: $breakpoint-mobile) {
    min-width: 200px;
    height: auto;
  }
}

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

.bio {
  margin-top: 30px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* 태그 간의 간격 */
}

.tag-item {
  padding: 5px 10px;
  background-color: white;
  border: 2px solid #60d360; /* 2px 두께의 초록색 선 */
  color: black;
  border-radius: 20px;
  display: flex;
  align-items: center;
  font-weight: bolder;
  gap: 5px;
  transition: background-color 0.3s ease; /* 배경색 전환 효과 */
}

.tag-item:hover {
  background-color: #60d360; /* 호버 시 초록색 배경 */
  color: white; /* 호버 시 글자 색을 흰색으로 변경 */
}
.visibility {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}

/* 게시물부 */
.post-section {
  margin-top: 30px;
  border-top: 1px solid #d3d3d3;
  padding-top: 10px;
}

.settings {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

input[type="range"] {
  accent-color: #4caf50;
}

.selection {
  display: flex;
  justify-content: space-around;
}

.selection button {
  flex: 1;
  font-size: 18px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.selection button.active {
  font-weight: bold;
  color: #000;
}

.selection-indicator {
  width: 33.33%;
  height: 4px;
  background-color: #000;
  transition: left 0.3s ease;
  position: relative;
  top: 5px;
}

/* 그리드 */
.grid {
  display: grid;
  gap: 10px;
  margin-top: 20px;
}

.grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.grid-item {
  position: relative;
  padding-top: 100%;
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
