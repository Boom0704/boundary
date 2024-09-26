import {
  IUser,
  IPost,
  IComment,
  IHashtag,
  ProfileVisibility,
} from "@/interface/IModels";

// 더미 유저 1 생성
const user1: IUser = {
  id: "1",
  username: "유저1",
  email: "user1@example.com",
  profilePictureUrl:
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?fit=crop&w=100&h=100&q=80", // 유저1의 프로필 사진
  bio: "안녕하세요! 유저1입니다.",
  website: "https://user1.dev",
  posts: [], // 게시글 나중에 할당
  friends: [], // 팔로워 나중에 추가
  hashtags: [
    { tag: "#밥", count: 20 }, // 해시태그 예시
    { tag: "#여행", count: 5 },
    { tag: "#치킨", count: 5 },
    { tag: "#물", count: 5 },
    { tag: "#물", count: 7 },
    { tag: "#사과주를먹는자랑", count: 2 },
    { tag: "#포도", count: 3 },
    { tag: "#우주", count: 5 },
    { tag: "#비행", count: 4 },
  ],
  gender: "male",
  age: 30, // 나이 추가
  visibility: ProfileVisibility.FULL, // 프로필 완전 공개
  isActive: true, // 활성 상태
  createdAt: new Date(),
  updatedAt: new Date(),
};

// 더미 유저 2 생성
const user2: IUser = {
  id: "2",
  username: "유저2",
  email: "user2@example.com",
  profilePictureUrl:
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?fit=crop&w=100&h=100&q=80", // 유저2의 프로필 사진
  bio: "안녕하세요! 유저2입니다.",
  website: "https://user2.dev",
  posts: [], // 게시글 나중에 할당
  friends: [],
  hashtags: [{ tag: "#카페", count: 3 }],
  gender: "female",
  age: 28, // 나이 추가
  visibility: ProfileVisibility.PARTIAL, // 부분 공개
  isActive: true, // 활성 상태
  createdAt: new Date(),
  updatedAt: new Date(),
};

// 서로 팔로잉/팔로워 관계 설정
user1.friends = [user2, user1, user2, user2, user1];

user2.friends = [user2, user2, user2, user2, user1];

// 더미 댓글 생성
const commentOnPost1ByUser2: IComment = {
  id: "201",
  postId: "1", // 유저1의 포스트에 달린 댓글
  author: user2,
  content: "정말 멋진 사진이에요, 유저1!",
  likes: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const commentOnPost2ByUser1: IComment = {
  id: "202",
  postId: "2", // 유저2의 포스트에 달린 댓글
  author: user1,
  content: "유저2, 너무 잘 찍었어요!",
  likes: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

// 더미 포스트 생성 (유저1과 유저2 각각 한 개씩의 포스트)
const postByUser1: IPost = {
  id: "1",
  author: user1,
  imageUrls: [
    "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?fit=crop&w=600&h=400&q=80",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?fit=crop&w=600&h=400&q=80",
  ],
  caption: "유저1의 멋진 여행 사진",
  comments: [commentOnPost1ByUser2],
  likes: [user2],
  tags: ["#여행", "#사진", "#자연"],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const postByUser2: IPost = {
  id: "2",
  author: user2,
  imageUrls: [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?fit=crop&w=600&h=400&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?fit=crop&w=600&h=400&q=80",
  ],
  caption: "유저2의 일상 사진",
  comments: [commentOnPost2ByUser1],
  likes: [user1],
  tags: ["#일상", "#사진", "#카페"],
  createdAt: new Date(),
  updatedAt: new Date(),
};

// 각각의 포스트를 여러 번 중복하여 사용
const dummyPosts: IPost[] = [
  postByUser1,
  postByUser2,
  postByUser1,
  postByUser2,
  postByUser1,
  postByUser2,
  postByUser1,
  postByUser2,
  postByUser1,
  postByUser2,
];

// 유저들도 포스트를 중복하여 여러 번 추가
user1.posts = dummyPosts.slice(0, 5); // 유저1의 포스트
user2.posts = dummyPosts.slice(5, 10); // 유저2의 포스트

// 더미 유저 배열
const dummyUsers: IUser[] = [
  user1,
  user2,
  user2,
  user2,
  user2,
  user2,
  user2,
  user2,
  user2,
];

// 더미 데이터를 export
export { dummyPosts, dummyUsers };
export { user1, user2 };
