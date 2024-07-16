import { atom } from 'recoil';

export interface Todo {
  cId: string;
  title: string;
  date: Date;
}

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
});

export const selectedTodoState = atom<Todo | null>({
  key: 'selectedTodoState',
  default: null,
});

