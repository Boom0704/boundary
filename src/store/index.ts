import { createStore } from "vuex";

export default createStore({
  state: {
    photos: [] as File[],
    currentPhotoIndex: 0,
    contentText: "",
    hashtags: [] as string[],
  },
  mutations: {
    addPhoto(state, photo: File) {
      state.photos.push(photo);
    },
    setCurrentPhoto(state, index: number) {
      state.currentPhotoIndex = index;
    },
    setContentText(state, text: string) {
      state.contentText = text;
    },
    setHashtags(state, tags: string[]) {
      state.hashtags = tags;
    },
    clearPhotos(state) {
      state.photos = [];
    },
    deletePhoto(state, index: number) {
      // 특정 인덱스의 사진을 삭제
      state.photos.splice(index, 1);

      // 만약 삭제한 사진이 현재 선택된 사진일 경우 인덱스 조정
      if (state.currentPhotoIndex >= index && state.currentPhotoIndex > 0) {
        state.currentPhotoIndex -= 1;
      }
    },
  },
});
