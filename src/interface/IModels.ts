// 유저가 사용하는 해시태그 정보 (해시태그 이름과 사용 횟수)
export interface IHashtag {
  tag: string; // 해시태그 이름
  count: number; // 해당 해시태그가 사용된 횟수
}

// 유저의 공개도 설정
export enum ProfileVisibility {
  FULL = "full",
  PARTIAL = "partial",
  CLOSED = "closed",
  PRIVATE = "private",
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  profilePictureUrl: string;
  bio: string;
  website?: string; // Optional
  posts: IPost[]; // 사용자가 올린 게시글들
  friends: IUser[]; // 유저의 팔로워들
  hashtags: IHashtag[]; // 유저가 자주 사용하는 해시태그
  gender: "male" | "female"; // 성별
  birthday: string; // 생일 ("YYYY.MM.DD" 형식으로 저장)
  visibility: ProfileVisibility; // 유저의 프로필 공개도
  isActive: boolean; // 유저가 활성 상태인지 여부
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
  tags: string[]; // 게시글 해시태그
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
