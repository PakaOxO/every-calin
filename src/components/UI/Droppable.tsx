/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useRecoilState } from "recoil";
import { dragTodoState, Todo } from "../../atom/Todo";
import useCalendar from "../../hooks/useCalendar";

interface IProps {
  date: Date;
  children: React.ReactNode;
}

const Droppable = ({ date, children }: IProps) => {
  const { updateTodo } = useCalendar();
  const [dragTodoValue, setDragTodo] = useRecoilState(dragTodoState);

  const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>, date: Date) => {
    updateTodo({ ...dragTodoValue, date: date } as Todo);
    setDragTodo(null);
  };

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
      onDragOver={onDragOverHandler}
      onDrop={(e) => onDropHandler(e, date)}
    >
      {children}
    </div>
  );
};

export default Droppable;
