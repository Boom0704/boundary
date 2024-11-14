export enum ProfileVisibility {
  FULL = "FULL",
  PARTIAL = "PARTIAL",
  PRIVATE = "PRIVATE",
}

export type ProfileVisibilityType = ProfileVisibility | null;

export interface IUser {
  id: number;
  username: string;
  password?: string; // Optional if not needed on the client-side
  email: string;
  profilePictureUrl?: string;
  bio?: string;
  website?: string;
  visibility: ProfileVisibility;
  isActive: boolean;
  birthday: Date;
  createdAt: Date;
  updatedAt: Date;
  friends: IUser[]; // Array of friends of type IUser
  likedPosts: IPost[]; // Array of posts the user has liked
  likedComments: IComment[]; // Array of comments the user has liked
  gender: string; // New field for gender
}

export interface IPost {
  id?: number; // optional for new posts
  authorId: number;
  imageUrls: string[];
  caption: string;
  hashtags: string[];
  comments: IComment[]; // Added comments field
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  activeCommentsCount?: number;
  likeCount?: number;
  likedByCurrentUser?: boolean;
}

export interface IHashtag {
  id?: number;
  name: string;
  posts?: IPost[]; // Optional, depending on if you want to load posts associated with each hashtag
}

export interface IComment {
  id: string;
  postId: string; // 댓글이 달린 게시글 ID
  author: string; // Adjust based on your User model structure
  content: string; // 댓글 내용
  likes: IUser[]; // 댓글에 좋아요를 누른 사람들
  createdAt: Date;
  updatedAt: Date;
}

export interface IFriendRequest {
  id: number; // 친구 요청 ID
  sender: IUser; // 친구 요청을 보낸 사용자
  receiver: IUser; // 친구 요청을 받은 사용자
  status: "PENDING" | "ACCEPTED" | "REJECTED"; // 요청 상태 (대기중, 수락됨, 거절됨)
  sentAt: Date; // 요청이 보낸 시간
}
