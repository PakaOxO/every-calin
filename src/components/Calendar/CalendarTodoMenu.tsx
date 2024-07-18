/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { selectedTodoDateFormat, selectedTodoState, Todo } from '../../atom/Todo';
import Input from '../UI/Input';
import TextArea from '../UI/Textarea';

const CalendarTodoMenu = () => {
  const selected = useRecoilValue<Todo | null>(selectedTodoState);
  const date = useRecoilValue<string>(selectedTodoDateFormat);
  if (!selected) return null;

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
        <Input type="text" value={selected.title} label="" />
        <Input type="datetime-local" value={date} label="" />
        <Input type="text" value={selected.tId} label="캘린더" />
        <TextArea value={selected.desc} label="메모" placeholder="메모를 작성" />
      </form>
    </div>
  );
};

export default CalendarTodoMenu;

