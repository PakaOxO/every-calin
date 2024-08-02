/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { useRecoilState } from "recoil";
import { dragTodoState, Todo } from "../../atom/Todo";
import { dragOverDateState } from "../../atom/Date";
import useCalendar from "../../hooks/useCalendar";

interface IProps {
  children: React.ReactElement;
  todo: Todo;
}

const Draggable = ({ children, todo }: IProps) => {
  const childRef = useRef<HTMLDivElement | null>(null);
  const { updateTodo } = useCalendar();
  const [dragTodo, setDragTodo] = useRecoilState(dragTodoState);
  const [dragOverDate, setDragOverDate] = useRecoilState(dragOverDateState);

  const onDragStartHandler = (e: React.DragEvent<HTMLDivElement>, todo: Todo) => {
    setDragTodo(todo);
    if (childRef.current) {
      childRef.current.style.opacity = "0.5";
    }
  }

  const onDragEndHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragOverDate !== null) {
      const newDate = new Date(dragTodo?.date as Date);
      newDate.setFullYear(dragOverDate.getFullYear());
      newDate.setMonth(dragOverDate.getMonth());
      newDate.setDate(dragOverDate.getDate());
      updateTodo({ ...dragTodo, date: newDate } as Todo);
    }
    setDragTodo(null);
    setDragOverDate(null);
  }, [dragTodo, dragOverDate]);

  useEffect(() => {
    if (dragTodo === null && childRef.current) {
      childRef.current.style.opacity = "1";
    }
  }, [dragTodo]);

  return (
    <div
      css={css``}
      onDragStart={(e) => onDragStartHandler(e, todo)}
      onDragEnd={onDragEndHandler}
      draggable={true}
    >
      {React.Children.map(children, (child: React.ReactElement) => {
        return React.cloneElement(child, { ref: childRef });
      })}
    </div>
  );
};

export default Draggable;