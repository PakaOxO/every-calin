/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useSetRecoilState } from "recoil";
import { dragTodoState, Todo } from "../../atom/Todo";

interface IProps {
  children: React.ReactNode;
  todo: Todo;
}

const Draggable = ({ children, todo }: IProps) => {
  const setDragTodo = useSetRecoilState(dragTodoState);

  const onDragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    todo: Todo
  ) => {
    setDragTodo(todo);
  };

  return (
    <div
      css={css``}
      onDragStart={(e) => onDragStartHandler(e, todo)}
      draggable={true}
    >
      {children}
    </div>
  );
};

export default Draggable;