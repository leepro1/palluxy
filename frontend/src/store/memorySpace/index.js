import { create } from 'zustand';

export const useModelPositionStore = create((set) => ({
  position: {
    positionX: 0,
    positionY: 0,
    positionZ: 0,
  },
  rotation: {
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
  },
  updatePosition: (payload) =>
    set((state) => ({
      position: {
        ...state.position,
        ...payload,
      },
    })),
  updateRotation: (payload) =>
    set((state) => ({
      rotation: {
        ...state.rotation,
        ...payload,
      },
    })),

  fetchPosition: (payload) =>
    set(() => ({
      position: payload,
    })),

  fetchRotation: (payload) =>
    set(() => ({
      rotation: payload,
    })),
}));

export const useFrameStore = create((set) => ({
  rotation: 0,
  frame001: 0,
  frame002: 0,
  frame003: 0,
  frame004: 0,
  updateRotation: (payload) => set({ rotation: payload }),
}));

export const useRoomStore = create((set) => ({
  rotation: 0,
  updateRotation: (payload) => set({ rotation: payload }),
}));
