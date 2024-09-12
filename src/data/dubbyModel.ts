import { IUser, IPost, IComment } from "@/interface/IModels";

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
  followers: [], // 팔로워 나중에 추가
  following: [], // 팔로잉 나중에 추가
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
  followers: [], // 팔로워 나중에 추가
  following: [], // 팔로잉 나중에 추가
  createdAt: new Date(),
  updatedAt: new Date(),
};

// 서로 팔로잉/팔로워 관계 설정
user1.followers = [user2];
user1.following = [user2];

user2.followers = [user1];
user2.following = [user1];

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

const selfCommentOnPost1ByUser1: IComment = {
  id: "203",
  postId: "1", // 유저1이 자신의 포스트에 댓글
  author: user1,
  content: "이곳은 정말 멋진 장소였어요.",
  likes: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const selfCommentOnPost2ByUser2: IComment = {
  id: "204",
  postId: "2", // 유저2가 자신의 포스트에 댓글
  author: user2,
  content: "여기 정말 추천해요!",
  likes: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

// 더미 포스트 생성 (유저1과 유저2 각각 한 개씩의 포스트)
// 포스트1은 두 장의 이미지, 포스트2는 다섯 장의 이미지를 포함
const postByUser1: IPost = {
  id: "1",
  author: user1,
  imageUrls: [
    "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?fit=crop&w=600&h=400&q=80", // 유저1의 첫 번째 사진
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?fit=crop&w=600&h=400&q=80", // 유저1의 두 번째 사진
  ],
  caption: "유저1의 멋진 여행 사진",
  comments: [commentOnPost1ByUser2, selfCommentOnPost1ByUser1],
  likes: [user2],
  tags: ["#여행", "#사진", "#자연"],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const postByUser2: IPost = {
  id: "2",
  author: user2,
  imageUrls: [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?fit=crop&w=600&h=400&q=80", // 유저2의 첫 번째 사진
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?fit=crop&w=600&h=400&q=80", // 유저2의 두 번째 사진
    "https://images.unsplash.com/photo-1487014679447-9f8336841d58?fit=crop&w=600&h=400&q=80", // 유저2의 세 번째 사진
    "https://images.unsplash.com/photo-1494173853739-c21f58b16055?fit=crop&w=600&h=400&q=80", // 유저2의 네 번째 사진
    "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?fit=crop&w=600&h=400&q=80", // 유저2의 다섯 번째 사진
  ],
  caption: "유저2의 일상 사진",
  comments: [commentOnPost2ByUser1, selfCommentOnPost2ByUser2],
  likes: [user1],
  tags: ["#일상", "#사진", "#카페"],
  createdAt: new Date(),
  updatedAt: new Date(),
};

// 각각의 포스트를 유저의 게시글로 할당
user1.posts = [
  postByUser1,
  postByUser1,
  postByUser1,
  postByUser1,
  postByUser1,
  postByUser1,
  postByUser1,
  postByUser1,
  postByUser1,
  postByUser1,
  postByUser1,
];
user2.posts = [postByUser2];

// 더미 데이터를 export
export const dummyPosts: IPost[] = [
  postByUser1,
  postByUser2,
  postByUser1,
  postByUser2,
  postByUser1,
  postByUser2,
];

export { user1 };
