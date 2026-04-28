import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { VaultBookmark } from '../content/vault/types';

type VaultStoreState = {
  bookmarks: VaultBookmark[];
  bookmarkItem: (itemId: string) => void;
  unbookmarkItem: (itemId: string) => void;
  isBookmarked: (itemId: string) => boolean;
};

export const useVaultStore = create<VaultStoreState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      bookmarkItem: (itemId) => {
        set((state) => {
          if (state.bookmarks.some((b) => b.itemId === itemId)) {
            return state;
          }
          return {
            bookmarks: [
              ...state.bookmarks,
              { itemId, bookmarkedAt: new Date().toISOString() },
            ],
          };
        });
      },
      unbookmarkItem: (itemId) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.itemId !== itemId),
        }));
      },
      isBookmarked: (itemId) => {
        return get().bookmarks.some((b) => b.itemId === itemId);
      },
    }),
    {
      name: 'nlh_vault',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
