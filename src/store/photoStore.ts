// src/store/photoStore.ts
import { Module } from "vuex";

interface PhotoState {
  photos: File[];
  currentPhotoIndex: number;
  contentText: string;
  hashtags: string[];
}

const photoStore: Module<PhotoState, any> = {
  namespaced: true, // 네임스페이스 활성화
  state: {
    photos: [],
    currentPhotoIndex: 0,
    contentText: "",
    hashtags: [],
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
    clearDatas(state) {
      state.photos = [];
      state.currentPhotoIndex = 0;
      state.contentText = "";
      state.hashtags = [];
    },
    deletePhoto(state, index: number) {
      state.photos.splice(index, 1);
      if (state.currentPhotoIndex >= index && state.currentPhotoIndex > 0) {
        state.currentPhotoIndex -= 1;
      }
    },
  },
};

export default photoStore;
