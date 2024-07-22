import { atom, selector } from 'recoil';

export interface Category {
  id: string;
  name: string;
  color: string;
}

export const categoryListState = atom<Category[]>({
  key: 'categoryListState',
  default: [],
});

export const categoryMapState = selector<Map<string, string>>({
  key: 'categoryMapState',
  get: ({ get }) => {
    const categories = get(categoryListState);
    const map = new Map<string, string>();

    categories.forEach((category) => {
      map.set(category.id, category.color);
    });

    return map;
  },
});

