import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type AvatarId = 'apex' | 'byte' | 'circuit' | 'delta' | 'echo' | 'flux';

export type AvatarOption = {
  id: AvatarId;
  label: string;
  tone: string;
};

type ProfileState = {
  name: string;
  avatarId: AvatarId;
  joinDate: string | null;
  hasCompletedSetup: boolean;
  completeSetup: (payload: { name: string; avatarId: AvatarId }) => void;
  resetProfile: () => void;
};

export const avatarOptions: AvatarOption[] = [
  { id: 'apex', label: 'Apex', tone: 'tone-apex' },
  { id: 'byte', label: 'Byte', tone: 'tone-byte' },
  { id: 'circuit', label: 'Circuit', tone: 'tone-circuit' },
  { id: 'delta', label: 'Delta', tone: 'tone-delta' },
  { id: 'echo', label: 'Echo', tone: 'tone-echo' },
  { id: 'flux', label: 'Flux', tone: 'tone-flux' },
];

const DEFAULT_AVATAR_ID: AvatarId = 'apex';

export function createDefaultProfileState(): Omit<
  ProfileState,
  'completeSetup' | 'resetProfile'
> {
  return {
    name: '',
    avatarId: DEFAULT_AVATAR_ID,
    joinDate: null,
    hasCompletedSetup: false,
  };
}

export function getAvatarOption(avatarId: AvatarId): AvatarOption {
  return avatarOptions.find((avatar) => avatar.id === avatarId) ?? avatarOptions[0];
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      ...createDefaultProfileState(),
      completeSetup: ({ name, avatarId }) =>
        set((state) => ({
          name: name.trim(),
          avatarId,
          joinDate: state.joinDate ?? new Date().toISOString(),
          hasCompletedSetup: true,
        })),
      resetProfile: () => set(createDefaultProfileState()),
    }),
    {
      name: 'nlh_profile',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
