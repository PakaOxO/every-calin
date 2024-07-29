/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { selectedTodoState, Todo } from '../../atom/Todo';
import Input from '../UI/Input';
import TextArea from '../UI/Textarea';
import { datetimeFormatter } from '../../core/date';
import { Category, categoryListState } from '../../atom/Category';

interface IProps {
  todoUpdateHandler: (todo: Todo) => void;
}

interface IAction {
  type: string;
  id: string;
  value: string | Date;
}

const CalendarTodoMenu = ({ todoUpdateHandler }: IProps) => {
  const selected = useRecoilValue<Todo | null>(selectedTodoState);
  const categories = useRecoilValue<Category[]>(categoryListState);

  if (!selected) return null;

  const onTodoUpdate = (action: IAction) => {
    let value = action.value;
    if (action.type === 'date') {
      value = new Date(action.value);
    }

    const updated = { ...selected, [action.type]: value };
    todoUpdateHandler(updated);
  };

  return (
    <div
      css={css`
        width: 280px;
        height: 300px;
        padding: 8px;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid white;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      `}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        return;
      }}
    >
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: center;
          text-align: center;
          padding: 8px 4px;
        `}
      >
        <span>일정 세부사항</span>
      </div>
      <form
        css={css`
          width: 100%;
        `}
      >
        <Input
          type="text"
          value={selected.title}
          onChange={(e) => onTodoUpdate({ type: 'title', id: selected.id, value: e.currentTarget.value })}
        />
        <Input
          type="datetime-local"
          value={datetimeFormatter(selected.date)}
          onChange={(e) => onTodoUpdate({ type: 'date', id: selected.id, value: e.currentTarget.value })}
        />
        <select
          name="category"
          value={selected.category}
          onChange={(e) => onTodoUpdate({ type: 'category', id: selected.id, value: e.currentTarget.value })}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <TextArea
          value={selected.desc}
          label="메모"
          placeholder="메모를 작성"
          onChange={(e) => onTodoUpdate({ type: 'desc', id: selected.id, value: e.currentTarget.value })}
        />
      </form>
    </div>
  );
};

export default CalendarTodoMenu;

