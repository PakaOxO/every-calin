import { atom } from 'recoil';

export const currDateState = atom<Date>({
  key: 'currDate',
  default: new Date(),
});

