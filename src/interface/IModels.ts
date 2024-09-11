export interface IUser {
  id: string;
  username: string;
  email: string;
  profilePictureUrl: string;
  bio: string;
  website?: string; // Optional
  posts: IPost[]; // 사용자가 올린 게시글들
  followers: IUser[]; // 유저의 팔로워들
  following: IUser[]; // 유저가 팔로우 중인 사람들
  createdAt: Date;
  updatedAt: Date;
}

export interface IPost {
  id: string;
  author: IUser; // 게시글 작성자
  imageUrls: string[]; // 하나 이상의 이미지
  caption: string; // 게시글 설명
  comments: IComment[]; // 댓글 목록
  likes: IUser[]; // 좋아요를 누른 사람들
  tags: string[]; // 해시태그
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment {
  id: string;
  postId: string; // 댓글이 달린 게시글 ID
  author: IUser; // 댓글 작성자
  content: string; // 댓글 내용
  likes: IUser[]; // 댓글에 좋아요를 누른 사람들
  createdAt: Date;
  updatedAt: Date;
}
