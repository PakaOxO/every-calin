import { useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { dateMappedTodoListState, selectedTodoState, Todo, todoListState } from '../atom/Todo';
import { dateFormatter, resetDatetime } from '../core/date';
import { Category, categoryListState, categoryMapState } from '../atom/Category';

const useCalendar = () => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const [categories, setCatetories] = useRecoilState<Category[]>(categoryListState);
  const [todos, setTodos] = useRecoilState<Todo[]>(todoListState);
  const setSelectedTodo = useSetRecoilState<Todo | null>(selectedTodoState);
  const todoMap = useRecoilValue<Map<string, Todo[]>>(dateMappedTodoListState);

  /**
   * @name getThisMonth
   * @description 이번 달 모든 날짜를 반환합니다.
   *
   * @param {number} maxWeekLen 달력에 표시할 주(행)의 길이
   * @returns {Date[]}
   */
  const getThisMonth = (refDate: Date, maxWeekLen: number): Date[][] => {
    const today = new Date(refDate);
    const year = today.getFullYear();
    const month = today.getMonth();

    const thisFirstDay = new Date(year, month, 1);

    const result = [];
    let week = [];

    const currDate = new Date(thisFirstDay);
    while (currDate.getDay() > 0) {
      currDate.setDate(currDate.getDate() - 1);
      week.push(new Date(currDate));
      if (week.length === 7) {
        week.sort((a, b) => (a < b ? -1 : 1));
        result.push(week);
        week = [];
      }
      if (currDate.getDay() === 0) break;
    }

    currDate.setMonth(thisFirstDay.getMonth(), 1);

    while (result.length < maxWeekLen) {
      week.push(new Date(currDate));
      if (week.length === 7) {
        week.sort((a, b) => (a < b ? -1 : 1));
        result.push(week);
        week = [];
      }
      currDate.setDate(currDate.getDate() + 1);
    }

    return result;
  };

  /**
   * @name getCategoryList
   * @description 현재 캘린더가 보유한 일정 카테고리 목록을 불러옵니다
   */
  const getCategoryList = () => {
    const DUMMY_LIST: Category[] = [
      {
        id: '1',
        name: '새로운 일정',
        color: '#5DA7EF',
      },
    ];

    setCatetories([...DUMMY_LIST]);
  };

  /**
   * @name addCategory
   * @description 새로운 일정 분류를 추가합니다
   */
  const addCategory = useCallback(() => {
    const DEFAULT_CATEGORY: Category = {
      id: Math.random() * 100 + '',
      name: '추가된 일정',
      color: '#5DA7EF',
    };

    setCatetories((prev) => [...prev, DEFAULT_CATEGORY]);
  }, []);

  /**
   * @name updateCategory
   * @description 일정 분류의 요소를 수정합니다. 기존의 목록(categories)에 수정된 분류(category)를 id로 식별해 수정합니다.
   *
   * @param {Category} category 수정된 분류
   */
  const updateCategory = useCallback(
    (category: Category) => {
      const copy = categories.map((prev) => (prev.id !== category.id ? prev : category));
      setCatetories(copy);
    },
    [categories]
  );

  /**
   * @name deleteCategory
   * @description 일정 목록에서 넘겨받은 id를 가진 일정 분류를 제거합니다
   *
   * @param {string} id 제거할 분류 식별 id
   */
  const deleteCategory = useCallback(
    (id: string) => {
      const newCategories = categories.filter((category) => category.id !== id);
      setCatetories(newCategories);
    },
    [categories]
  );

  /**
   * @name getTodosWithDate
   * @description 해당 날짜에 등록된 일정들을 가져옵니다.
   *
   * @param {Date} date 일정을 가져올 날짜
   * @returns {Date[] | undefined}
   */
  const getTodosWithDate = useCallback(
    (date: Date): Todo[] | undefined => {
      return todoMap.get(dateFormatter(date));
    },
    [todoMap]
  );

  /**
   * @name createTodo
   * @description 새로운 일정을 추가합니다.
   *
   * @param {Date} date 일정이 추가될 날짜
   * @returns {boolean}
   */
  const createTodo = useCallback((date: Date): boolean => {
    const todo: Todo = {
      id: Math.floor(Math.random() * 100) + '',
      title: '새로운 일정',
      date: date,
      category: '1',
      desc: '',
    };

    todo.date = resetDatetime(todo.date);

    setTodos((todos) => [...todos, todo]);
    setSelectedTodo(todo);

    return true;
  }, []);

  /**
   * @name updateTodo
   * @description 일정 목록의 요소를 수정합니다. 기존의 일정 목록(todos)에 변경된 일정(todo)만을 수정해 상태값을 변경합니다
   *
   * @param {Todo} 변경된 일정
   */
  const updateTodo = useCallback(
    (todo: Todo) => {
      const copy = todos.map((prev) => (prev.id === todo.id ? todo : prev));
      setTodos(copy);
      setSelectedTodo(todo);
    },
    [todos]
  );

  return {
    days,
    getThisMonth,
    getCategoryList,
    addCategory,
    updateCategory,
    deleteCategory,
    getTodosWithDate,
    createTodo,
    updateTodo,
  };
};

export default useCalendar;

