// src/utils/api.ts
import axios from "axios";
import { useCookies } from "vue3-cookies";
import store from "@/store";
import { IPost } from "@/interface/IModels";

// 쿠키 설정
const { cookies } = useCookies();

// Axios 기본 설정
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// 로그인 API 호출 함수
export const loginUser = async (loginData: {
  username: string;
  password: string;
}) => {
  try {
    const response = await api.post("/users/signin", loginData);
    if (response && response.status === 200) {
      const jsessionid = response.headers["set-cookie"]?.find((cookie) =>
        cookie.startsWith("JSESSIONID")
      );
      if (jsessionid) {
        const sessionId = jsessionid.split(";")[0].split("=")[1];
        cookies.set("JSESSIONID", sessionId, "7d");
      }

      store.commit("user/setUser", response.data.user);
      return response;
    }
    return false;
  } catch (error) {
    console.error("로그인 실패:", error);
    return false;
  } finally {
    const storedUser = store.getters["user/getUser"];
    console.log("스토어에 저장된 유저 데이터:", storedUser);
  }
};

// 회원가입 API 호출 함수
export const signupUser = async (userData: {
  email: string;
  password: string;
  username: string;
  birthday: string;
  gender: string;
}) => {
  try {
    const formattedBirthday =
      userData.birthday.replace(/\./g, "-") + "T00:00:00";
    return await api.post("/users/signup", {
      ...userData,
      birthday: formattedBirthday,
    });
  } catch (error) {
    console.error("회원가입 실패:", error);
    return false;
  }
};

// 로그아웃 API 호출 함수
export const logoutUser = async () => {
  try {
    const response = await api.post("/users/logout");
    if (response.status === 200) {
      const domain = window.location.hostname;
      document.cookie = `JSESSIONID=; Path=/; Domain=${domain}; Max-Age=0;`;
      store.commit("user/clearUser");
      console.log("로그아웃 성공: JSESSIONID 쿠키가 삭제되었습니다.");
      return true;
    }
    console.error("로그아웃 실패: 서버 응답이 200이 아님");
    return false;
  } catch (error) {
    console.error("로그아웃 요청 중 오류 발생:", error);
    return false;
  }
};

// 계정 삭제 API 호출 함수
export const deleteUser = async (userId: number) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.status === 200;
  } catch (error) {
    console.error("계정 삭제 실패:", error);
    return false;
  }
};

// 유저 정보를 가져오는 API 함수
export const fetchUserData = async (userId: number) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("유저 정보 가져오기 실패:", error);
    return null;
  }
};

// 유저 정보를 가져오는 API 함수
export const fetchUserDetailData = async (username: string) => {
  try {
    const response = await api.get(`/users/detail/${username}`);
    return response.data;
  } catch (error) {
    console.error("유저 정보 가져오기 실패:", error);
    return null;
  }
};

export const uploadMultipleFiles = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await api.post("/common/upload-multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // 파일 URL 리스트 반환
  } catch (error) {
    console.error("파일 업로드 실패:", error);
    return [];
  }
};

export const uploadSingleFile = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/common/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // 파일 URL 반환
  } catch (error) {
    console.error("파일 업로드 실패:", error);
    return null;
  }
};

export const createPost = async (postPayload: IPost) => {
  try {
    console.log("postPayload: ", postPayload);
    const response = await api.post("/posts", postPayload);
    return response.data;
  } catch (error) {
    console.error("게시물 생성 실패:", error);
    throw error;
  }
};

// 활성화된 게시물 목록을 가져오는 함수
export const fetchActivePosts = async () => {
  try {
    const response = await api.get("/posts/active");

    return response.data; // 게시물 데이터 반환
  } catch (error) {
    console.error("Error fetching active posts:", error);
    throw error;
  }
};

export const fetchUserProfileImage = async (username: string) => {
  try {
    const response = await axios.get(`/users/${username}/profile-image`);
    return response.data; // 이미지 URL 반환
  } catch (error) {
    console.error("Failed to fetch profile picture:", error);
    // 기본 이미지 URL을 반환하도록 처리
    return "https://cdn-icons-png.flaticon.com/512/5741/5741333.png";
  }
};

export const updateUserProfilePicture = async (
  userId: string,
  file: File
): Promise<boolean> => {
  try {
    // Step 1: 이미지 파일 업로드 및 URL 반환
    const profilePictureUrl = await uploadSingleFile(file);
    if (!profilePictureUrl) {
      console.error("프로필 이미지 업로드에 실패했습니다.");
      return false;
    }

    // Step 2: 유저 정보 업데이트 요청
    const updateData = {
      profilePictureUrl,
      username: store.getters["user/getUser"].username,
    };

    const response = await api.put(`/users/${userId}/update`, updateData);
    if (response.status === 200) {
      // Step 3: 성공적으로 Vuex 스토어와 localStorage 업데이트
      localStorage.setItem("profilePictureUrl", profilePictureUrl);
      store.commit("user/setProfilePicture", profilePictureUrl); // Vuex 상태 업데이트

      return true;
    } else {
      console.error("유저 정보 업데이트 실패");
      return false;
    }
  } catch (error) {
    console.error("프로필 업데이트 중 오류 발생:", error);
    return false;
  }
};

export const createComment = async (commentData: {
  authorId: number;
  postId: number;
  content: string;
}) => {
  try {
    const response = await api.post("/comments", commentData);
    return response.data;
  } catch (error) {
    console.error("Failed to create comment:", error);
    throw error;
  }
};

export const createCommentDetail = async (commentData: {
  authorId: number;
  postId: number;
  content: string;
}) => {
  try {
    const response = await api.post("/comments/detail", commentData);
    return response.data;
  } catch (error) {
    console.error("Failed to create comment:", error);
    throw error;
  }
};

// 포스트에 대한 좋아요 상태 변경
export const updateLikeStatus = async (postId: number, userId: number) => {
  try {
    // 서버로 좋아요 상태 변경 요청
    const response = await api.post(`/posts/${postId}/like`, null, {
      params: { userId }, // userId를 쿼리 파라미터로 전달
    });

    // 서버에서 반환된 데이터 (예시)
    // { likeCount: number, likedByCurrentUser: boolean }
    return response.data;
  } catch (error) {
    console.error("Error updating like status:", error);
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리하게 함
  }
};

export const getPostById = async (id: number) => {
  try {
    const response = await api.get(`/posts/${id}`); // API 요청
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("게시글을 가져오는 데 실패했습니다.", error);
    throw error; // 에러를 던져서 호출한 곳에서 처리하도록 함
  }
};

export const updateUserInfo = async (userId: number, updateData: any) => {
  try {
    // 비밀번호를 제외한 데이터를 백엔드에 전송
    const { password, ...dataToUpdate } = updateData; // 비밀번호를 제외하고 나머지 값만 보냄
    const response = await api.put(`/users/${userId}/update`, dataToUpdate);

    if (response.status === 200) {
      return true; // 성공 시
    } else {
      console.error("유저 정보 업데이트 실패");
      return false;
    }
  } catch (error) {
    console.error("프로필 업데이트 중 오류 발생:", error);
    return false;
  }
};

// 친구 요청 생성
export const sendFriendRequest = async (
  senderUsername: string,
  receiverUsername: string
) => {
  try {
    const response = await api.post("/friend-requests/send", null, {
      params: { senderUsername, receiverUsername },
    });
    return response.data;
  } catch (error) {
    console.error("친구 요청 보내기 실패:", error);
    throw error;
  }
};

// 친구 요청 수락 또는 거절
export const answerFriendRequest = async (
  requestId: number,
  status: "ACCEPTED" | "REJECTED"
) => {
  try {
    const response = await api.post(
      `/friend-requests/${requestId}/answer`,
      null,
      {
        params: { status },
      }
    );
    return response.data;
  } catch (error) {
    console.error("친구 요청 응답 실패:", error);
    throw error;
  }
};

// 받은 친구 요청 확인
export const getReceivedFriendRequests = async (username: string) => {
  try {
    const response = await api.get("/friend-requests/received", {
      params: { username },
    });
    return response.data;
  } catch (error) {
    console.error("받은 친구 요청 조회 실패:", error);
    throw error;
  }
};

// 보낸 친구 요청 확인
export const getSentFriendRequests = async (username: string) => {
  try {
    const response = await api.get("/friend-requests/sent", {
      params: { username },
    });
    return response.data;
  } catch (error) {
    console.error("보낸 친구 요청 조회 실패:", error);
    throw error;
  }
};

// 상태별 받은 친구 요청 확인
export const getReceivedFriendRequestsByStatus = async (
  username: string,
  status: "PENDING" | "ACCEPTED" | "REJECTED"
) => {
  try {
    const response = await api.get("/friend-requests/received/status", {
      params: { username, status },
    });
    return response.data;
  } catch (error) {
    console.error("상태별 받은 친구 요청 조회 실패:", error);
    throw error;
  }
};

// 상태별 보낸 친구 요청 확인
export const getSentFriendRequestsByStatus = async (
  username: string,
  status: "PENDING" | "ACCEPTED" | "REJECTED"
) => {
  try {
    const response = await api.get("/friend-requests/sent/status", {
      params: { username, status },
    });
    return response.data;
  } catch (error) {
    console.error("상태별 보낸 친구 요청 조회 실패:", error);
    throw error;
  }
};
export default api;
