import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

type UserType = {
  id: string | undefined;
  name: string | undefined;
  avatar: string | undefined;
};

export const userAtom = atomWithStorage<UserType>(
  'user',
  { id: undefined, name: undefined, avatar: undefined },
  createJSONStorage(() => localStorage),
);
