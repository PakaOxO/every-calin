import { atom, selector } from 'recoil';
import { dateFormatter, datetimeFormatter } from '../core/date';

export interface Todo {
  cId: string;
  title: string;
  date: Date;
  tId: string;
  desc: string;
}

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
});

export const dateMappedTodoListState = selector<Map<string, Todo[]>>({
  key: 'dateMappedTodoListState',
  get: ({ get }) => {
    const todos = get(todoListState);
    const mappedList: Map<string, Todo[]> = new Map();

    todos.forEach((todo) => {
      const date = dateFormatter(todo.date);
      const list = mappedList.get(date);
      if (list) {
        mappedList.set(date, [...list, todo]);
      } else {
        mappedList.set(date, [todo]);
      }
    });

    return mappedList;
  },
});

export const selectedTodoState = atom<Todo | null>({
  key: 'selectedTodoState',
  default: null,
});

export const selectedTodoDateFormat = selector<string>({
  key: 'selectedTodoDateFormat',
  get: ({ get }) => {
    const todo = get<Todo | null>(selectedTodoState);
    if (!todo) return '';

    return datetimeFormatter(todo.date);
  },
});

