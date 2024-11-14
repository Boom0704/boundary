<template>
  <div class="request-view">
    <!-- 상단 버튼부 -->
    <div class="button-section">
      <button
        class="request-btn"
        :class="{ active: isSentRequests }"
        @click="toggleRequest('sent')"
      >
        송신요청
      </button>
      <button
        class="request-btn"
        :class="{ active: !isSentRequests }"
        @click="toggleRequest('received')"
      >
        수신요청
      </button>
    </div>

    <!-- 본문 영역 -->
    <div class="content-section">
      <!-- 송신 요청 리스트 -->
      <div v-if="isSentRequests" class="request-list sent">
        <h2>보낸 친구 요청</h2>
        <div
          class="request-item"
          v-for="(request, index) in sentRequests"
          :key="index"
        >
          <!-- 요청 상세 정보 -->
          <div class="request-details">
            <profile-view
              :username="request.receiver.username"
              :size="50"
            ></profile-view>
            <div class="username">{{ request.receiver.username }}</div>
            <div class="time-status">
              <span v-if="request.sentAt" class="request-time">
                {{ formatDate(request.sentAt) || "undefined" }}
              </span>
              <span v-if="request.answerAt" class="request-time">
                {{ formatDate(request.answerAt) || "undefined" }}
              </span>
            </div>
          </div>

          <!-- 상태별 버튼 -->
          <div class="request-actions">
            <button
              v-if="request.status === 'PENDING'"
              class="action-btn status-pending"
            >
              Pending
            </button>
            <button
              v-if="request.status === 'ACCEPTED'"
              class="action-btn status-accepted"
            >
              Accepted
            </button>
            <button
              v-if="request.status === 'REJECTED'"
              class="action-btn status-rejected"
            >
              Rejected
            </button>
          </div>
        </div>
      </div>

      <!-- 수신 요청 리스트 -->
      <div v-if="!isSentRequests" class="request-list received">
        <h2>받은 친구 요청</h2>
        <div
          class="request-item"
          v-for="(request, index) in receivedRequests"
          :key="index"
        >
          <!-- 요청 상세 정보 -->
          <div class="request-details">
            <profile-view
              :username="request.sender.username"
              :size="50"
            ></profile-view>
            <div class="username">{{ request.sender.username }}</div>
            <div class="time-status">
              <span v-if="request.sentAt" class="request-time">
                {{ formatDate(request.sentAt) || "undefined" }}
              </span>
              <span v-if="request.answerAt" class="request-time">
                {{ formatDate(request.answerAt) || "undefined" }}
              </span>
            </div>
          </div>

          <!-- 상태별 버튼 (수신 요청에서만 토글 가능한 버튼) -->
          <div class="request-actions">
            <button
              v-if="request.status === 'PENDING' && !request.isToggleActive"
              class="action-btn status-pending"
              @click="toggleRequestAction(request)"
            >
              Pending
            </button>
            <button
              v-if="request.status === 'PENDING' && request.isToggleActive"
              class="action-btn status-accepted"
              @click="answerRequest(request.id, 'ACCEPTED')"
            >
              Accept
            </button>

            <button
              v-if="request.status === 'PENDING' && request.isToggleActive"
              class="action-btn status-rejected"
              @click="answerRequest(request.id, 'REJECTED')"
            >
              Reject
            </button>

            <button
              v-if="request.status === 'ACCEPTED'"
              class="action-btn status-accepted"
            >
              Accepted
            </button>
            <button
              v-if="request.status === 'REJECTED'"
              class="action-btn status-rejected"
            >
              Rejected
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import {
  getReceivedFriendRequests,
  getSentFriendRequests,
  answerFriendRequest,
} from "@/utils/api"; // API 호출 함수
import ProfileView from "@/components/common/ProfileView.vue"; // ProfileView 컴포넌트

const isSentRequests = ref(false); // 기본적으로 '수신요청'이 활성화됨
const sentRequests = ref<any[]>([]);
const receivedRequests = ref<any[]>([]);
const toast = useToast();

// Vuex에서 username 가져오기
const store = useStore();
const username = store.getters["user/getUser"].username;

// 송신/수신 요청 버튼을 토글하는 함수
const toggleRequest = async (type: "sent" | "received") => {
  isSentRequests.value = type === "sent"; // '송신요청' 버튼을 클릭하면 true, '수신요청' 버튼을 클릭하면 false

  try {
    if (type === "sent") {
      const sentResponse = await getSentFriendRequests(username);
      sentRequests.value = sentResponse;
    } else {
      const receivedResponse = await getReceivedFriendRequests(username);
      receivedRequests.value = receivedResponse;
    }
  } catch (error) {
    console.error(`${type} 친구 요청 가져오기 실패`, error);
  }
};

onMounted(async () => {
  try {
    const receivedResponse = await getReceivedFriendRequests(username);
    receivedRequests.value = receivedResponse; // 받은 요청을 상태에 저장
  } catch (error) {
    console.error("수신 요청을 가져오는 데 실패했습니다.", error);
  }
});

// 날짜 포맷팅 함수
const formatDate = (date: Date) => {
  return new Date(date).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// 토글 버튼 동작 함수
const toggleRequestAction = (request: any) => {
  request.isToggleActive = !request.isToggleActive; // 버튼 클릭 시 토글 상태를 반전시킴
};

const answerRequest = async (
  requestId: number,
  type: "ACCEPTED" | "REJECTED"
) => {
  try {
    // 친구 요청 응답
    const response = await answerFriendRequest(requestId, type);

    // 응답이 성공적일 경우 (응답 코드 200)
    console.log(response.status);
    console.log(response.status === 200);
    if (response.status === 200) {
      // 성공적인 요청 응답에 대한 toast 메시지 표시
      toast.success(`${type === "ACCEPTED" ? "수락" : "거절"}되었습니다!`);

      // 요청 상태가 성공적으로 처리되었으므로, 요청 목록을 새로 고침
      const receivedResponse = await getReceivedFriendRequests(username);
      receivedRequests.value = receivedResponse; // 받은 요청을 상태에 저장
    } else {
      // 응답 코드가 200이 아닌 경우 실패 처리
      toast.error(`${type === "ACCEPTED" ? "수락" : "거절"} 실패`);
    }
  } catch (error) {
    console.error(`${type} 친구 요청 응답 실패`, error);
    toast.error(`${type === "ACCEPTED" ? "수락" : "거절"} 실패`);
  }
};
</script>

<style lang="scss" scoped>
/* 기본 스타일 */
.request-view {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-section {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;

  .request-btn {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &.active {
      background-color: #60d360;
      color: white;
      border-radius: 30px;
      border-color: #60d360;
    }
  }
}

.content-section {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  .request-list {
    &.sent {
      background-color: #e8f9e8;
      border: 1px solid #60d360;
      padding: 10px;
      border-radius: 8px;
    }
    &.received {
      background-color: #f9f9f9;
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 8px;
    }
  }

  .request-item {
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .request-details {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .time-status {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 12px;
    color: #9b9b9b;
  }

  .request-status {
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: capitalize; /* 첫 문자 대문자 처리 */
  }

  .request-actions {
    display: flex;
    gap: 10px;
  }

  .action-btn {
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
    background-color: #ddd; /* 기본 회색 */
    border: none;
    transition: background-color 0.3s ease;
  }

  .action-btn.status-pending {
    color: white;
    background-color: #ffcc00; /* 기본 회색 상태 */
  }

  .action-btn.status-accepted {
    color: white;
    background-color: #60d360; /* 초록색 */
  }

  .action-btn.status-rejected {
    color: white;
    background-color: #f44336; /* 빨간색 */
  }

  /* 호버 효과 */
  .action-btn:hover {
    background-color: #555; /* 호버 시 어두운 회색 */
  }

  .action-btn.status-accepted:hover {
    background-color: #4caf50; /* 호버 시 초록색 */
  }

  .action-btn.status-rejected:hover {
    background-color: #d32f2f; /* 호버 시 붉은색 */
  }
}
</style>
