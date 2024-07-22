/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { selectedTodoState, Todo, todoListState } from '../../atom/Todo';
import Input from '../UI/Input';
import TextArea from '../UI/Textarea';
import { dateFormatter, datetimeFormatter } from '../../core/date';

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
        width: 100%;
        padding: 8px;
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
          label=""
          onChange={(e) => onTodoUpdate({ type: 'title', id: selected.cId, value: e.currentTarget.value })}
        />
        <Input
          type="datetime-local"
          value={datetimeFormatter(selected.date)}
          label=""
          onChange={(e) => onTodoUpdate({ type: 'date', id: selected.cId, value: e.currentTarget.value })}
        />
        <Input
          type="text"
          value={selected.tId}
          label="캘린더"
          onChange={(e) => onTodoUpdate({ type: 'tId', id: selected.cId, value: e.currentTarget.value })}
        />
        <TextArea
          value={selected.desc}
          label="메모"
          placeholder="메모를 작성"
          onChange={(e) => onTodoUpdate({ type: 'desc', id: selected.cId, value: e.currentTarget.value })}
        />
      </form>
    </div>
  );
};

export default CalendarTodoMenu;

