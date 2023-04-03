import { RootState } from 'types';
import create, { StateCreator } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const configureStore: StateCreator<RootState> = (set, get) => {
  return {
    value: null,
    funct: () => {},
    isProcessed: false,
  };
};

export const useStore = create(
  subscribeWithSelector<RootState>(configureStore),
);
