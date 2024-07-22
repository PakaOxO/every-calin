import { atom, selector } from 'recoil';
import { dateFormatter } from '../core/date';
import { categoryMapState } from './Category';

export interface Todo {
  id: string;
  title: string;
  date: Date;
  category: string;
  color?: string;
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
    const categoryMap = get(categoryMapState);
    const mappedList: Map<string, Todo[]> = new Map();

    todos.forEach((todo) => {
      const date = dateFormatter(todo.date);
      const list = mappedList.get(date);
      const coloredTodo = { ...todo, color: categoryMap.get(todo.category) };

      if (list) {
        mappedList.set(date, [...list, coloredTodo]);
      } else {
        mappedList.set(date, [coloredTodo]);
      }
    });

    return mappedList;
  },
});

export const selectedTodoState = atom<Todo | null>({
  key: 'selectedTodoState',
  default: null,
});

