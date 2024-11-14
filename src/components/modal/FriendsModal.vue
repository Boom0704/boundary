<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h3>{{ username }}의 친구 요청</h3>

      <!-- 친구 요청 메시지 입력 -->
      <div class="input-section">
        <input
          type="text"
          v-model="friendRequestMessage"
          placeholder="메시지를 입력하세요"
          class="friend-input"
        />
      </div>

      <!-- 하단: 버튼들 -->
      <div class="buttons">
        <button class="cancel-btn" @click="close">취소</button>
        <button class="request-btn" @click="sendFriendRequestHandler">
          친구 요청
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { sendFriendRequest } from "@/utils/api"; // 외부에서 정의된 함수 불러오기
import { useToast } from "vue-toastification"; // 토스트 알림 사용

export default defineComponent({
  name: "FriendRequestModal",
  props: {
    username: {
      type: String,
      required: true,
    },
    onClose: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props) {
    const toast = useToast(); // 토스트 사용 설정
    const friendRequestMessage = ref(""); // 메시지 입력 필드

    const close = () => {
      props.onClose(); // 부모로부터 받은 onClose 함수 호출
    };

    const sendFriendRequestHandler = async () => {
      if (friendRequestMessage.value.trim()) {
        try {
          // 외부에서 불러온 함수로 친구 요청 보내기
          await sendFriendRequest(props.username, friendRequestMessage.value);
          toast.success("친구 요청이 성공적으로 전송되었습니다!"); // 성공 메시지
          close(); // 요청 후 모달 닫기
        } catch (error: any) {
          // error.response가 존재하는 경우 HTTP 상태 코드 확인
          if (error.response && error.response.status === 500) {
            toast.error("요청 아이디를 확인해주세요."); // 500 에러일 경우
          } else {
            toast.error("친구 요청 보내기 실패: " + error.message); // 다른 에러 처리
          }
        }
      } else {
        // 메시지가 비어있다면 오류 처리
        toast.error("친구 요청 메시지가 비어 있습니다.");
      }
    };

    return {
      friendRequestMessage,
      sendFriendRequestHandler,
      close,
    };
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
}
.header {
  margin-bottom: 20px;
}
.header h3 {
  font-size: 18px;
  font-weight: bold;
}
.input-section {
  margin-bottom: 20px;
}
.friend-input {
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
.cancel-btn,
.request-btn {
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.cancel-btn {
  background-color: #ccc;
  color: white;
}
.cancel-btn:hover {
  background-color: #aaa;
}
.request-btn {
  background-color: #4caf50;
  color: white;
}
.request-btn:hover {
  background-color: #45a049;
}
</style>
