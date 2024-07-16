import { atom, selector } from 'recoil';
import { selectedTodoState } from './Todo';

export const settingMenuState = atom<boolean>({
  key: 'settingMenuState',
  default: false,
});

export const todoMenuState = selector<boolean>({
  key: 'todoMenuState',
  get: ({ get }) => {
    const selected = get(selectedTodoState);
    return !!selected;
  },
});

