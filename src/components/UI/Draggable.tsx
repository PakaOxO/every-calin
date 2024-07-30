/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { useRecoilState } from "recoil";
import { dragTodoState, Todo } from "../../atom/Todo";

interface IProps {
  children: React.ReactElement;
  todo: Todo;
}

const Draggable = ({ children, todo }: IProps) => {
  const childRef = useRef<HTMLDivElement | null>(null);
  const [dragTodo, setDragTodo] = useRecoilState(dragTodoState);

  const onDragStartHandler = (e: React.DragEvent<HTMLDivElement>, todo: Todo) => {
    setDragTodo(todo);
    if (childRef.current) {
      childRef.current.style.opacity = "0.5";
    }
  }

  useEffect(() => {
    if (dragTodo === null && childRef.current) {
      childRef.current.style.opacity = "1";
    }
  }, [dragTodo]);

  return (
    <div
      css={css``}
      onDragStart={(e) => onDragStartHandler(e, todo)}
      draggable={true}
    >
      {React.Children.map(children, (child: React.ReactElement) => {
        return React.cloneElement(child, { ref: childRef });
      })}
    </div>
  );
};

export default Draggable;