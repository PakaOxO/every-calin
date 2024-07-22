import { useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { dateMappedTodoListState, selectedTodoState, Todo, todoListState } from '../atom/Todo';
import { dateFormatter, resetDatetime } from '../core/date';

const useCalendar = () => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const [todos, setTodos] = useRecoilState(todoListState);
  const setSelectedTodo = useSetRecoilState<Todo | null>(selectedTodoState);
  const map = useRecoilValue<Map<string, Todo[]>>(dateMappedTodoListState);

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
   * @name getTodosWithDate
   * @description 해당 날짜에 등록된 일정들을 가져옵니다.
   *
   * @param {Date} date 일정을 가져올 날짜
   * @returns {Date[] | undefined}
   */
  const getTodosWithDate = useCallback((date: Date): Todo[] | undefined => {
    return map.get(dateFormatter(date));
  }, []);

  /**
   * @name createTodo
   * @description 새로운 일정을 추가합니다.
   *
   * @param {Date} date 일정이 추가될 날짜
   * @returns {boolean}
   */
  const createTodo = useCallback((date: Date): boolean => {
    const todo: Todo = {
      cId: Math.floor(Math.random() * 100) + '',
      title: '오늘의 할일',
      date: date,
      tId: '새로운 캘린더',
      desc: '',
    };

    todo.date = resetDatetime(todo.date);

    setTodos((todos) => [...todos, todo]);
    setSelectedTodo(todo);

    return true;
  }, []);

  const updateTodo = useCallback(
    (todo: Todo) => {
      const copy = todos.map((prev) => (prev.cId === todo.cId ? todo : prev));
      setTodos(copy);
      setSelectedTodo(todo);
    },
    [todos]
  );

  return { days, getThisMonth, getTodosWithDate, createTodo, updateTodo };
};

export default useCalendar;

