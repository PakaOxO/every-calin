/** @jsxImportSource @emotion/react */
import React, { useCallback } from "react";
import { css } from "@emotion/react";
import { useRecoilState } from "recoil";
import { dragTodoState, Todo } from "../../atom/Todo";
import useCalendar from "../../hooks/useCalendar";
import { dragOverDateState } from "../../atom/Date";

interface IProps {
  date: Date;
  children: React.ReactElement;
}

const Droppable = ({ date, children}: IProps) => {
  const { updateTodo } = useCalendar();
  const [dragTodoValue, setDragTodo] = useRecoilState(dragTodoState);
  const [dragOverDate, setDragOverDate] = useRecoilState(dragOverDateState);

  const onDragEnterHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragOverDate === date) return;
    setDragOverDate(date);
  }, [date]);

  const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDropHandler = useCallback(
    (e: React.DragEvent<HTMLDivElement>, date: Date) => {
      e.preventDefault();
      const newDate = new Date(dragTodoValue?.date as Date);
      newDate.setFullYear(date.getFullYear());
      newDate.setMonth(date.getMonth());
      newDate.setDate(date.getDate());
      updateTodo({ ...dragTodoValue, date: newDate } as Todo);
      setDragTodo(null);
      setDragOverDate(null);
    },
    [dragTodoValue]
  );

  return (
    <div
      css={css`
        flex: 1;
        height: 101%;
        border: 1px solid #aaa;
        margin-top: -1px;
        margin-right: -1px;
        overflow: hidden;

        &:hover {
          cursor: pointer;
        }
      `}
      onDragEnter={onDragEnterHandler}
      onDragOver={onDragOverHandler}
      onDrop={(e) => onDropHandler(e, date)}
    >
      {children}
    </div>
  );
};

export default Droppable;
