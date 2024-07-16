import { create } from 'zustand';

const useModelPositionStore = create((set) => ({
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0,
  },
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
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
}));

export default useModelPositionStore;
