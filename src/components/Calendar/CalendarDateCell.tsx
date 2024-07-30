/** @jsxImportSource @emotion/react */
import React, { useMemo } from "react";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { currDateState, dragOverDateState } from "../../atom/Date";
import CalendarTodo from "./CalendarTodo";
import { dragTodoState, Todo } from "../../atom/Todo";
import { datetimeFormatter } from "../../core/date";
import Draggable from "../UI/Draggable";

interface IProps {
  date: Date;
  todos: Todo[] | undefined;
  todoCreateHandler: (date: Date) => boolean;
  isToday: boolean;
}

const areEqualProps = (prevProps: IProps, nextProps: IProps): boolean => {
  if (datetimeFormatter(prevProps.date) !== datetimeFormatter(nextProps.date))
    return false;
  if (prevProps.todos?.length !== nextProps.todos?.length) return false;

  if (prevProps.todos && nextProps.todos) {
    for (let i = 0; i < prevProps.todos.length; i++) {
      if (prevProps.todos[i].title !== nextProps.todos[i].title) return false;
      if (prevProps.todos[i].category !== nextProps.todos[i].category)
        return false;
      if (prevProps.todos[i].color !== nextProps.todos[i].color) return false;
      if (prevProps.todos[i].desc !== nextProps.todos[i].desc) return false;
    }
  }

  return true;
};

const CalendarDateCell = ({date, todos, todoCreateHandler, isToday}: IProps) => {
    const currDate = useRecoilValue<Date>(currDateState);
    const isThisMonth = currDate.getMonth() === date.getMonth();
    const dragOverDate = useRecoilValue<Date | null>(dragOverDateState); // drag중 hover되는 DateCell의 Date 객체 저장
    const dragTodo = useRecoilValue<Todo | null>(dragTodoState); // drag중인 Todo 객체 저장

    // drag중 drop전에 drop된 UI를 미리 표시하는 UI
    const skeletonTodo = useMemo(() => {
      if (dragOverDate && dragOverDate.getMonth() === date.getMonth() && dragOverDate.getDate() === date.getDate() ? true : false) {
        return (<CalendarTodo todo={dragTodo as Todo} />);
      } else return;
    }, [dragOverDate]);

    return (
      // 기존에 CalendarDateCell에 있던 style을 Droppable에 적용함
      <div
        css={css`
          box-sizing:border-box;
          width: 100%;
          height: 100%;
          // flex: 1;
          // height: 101%;
          // border: 1px solid #aaa;
          // margin-top: -1px;
          // margin-right: -1px;
          // overflow: hidden;

          // &:hover {
          //   cursor: pointer;
          // }
        `}
        onDoubleClick={() => todoCreateHandler(date)}
      >
        <div
          css={css`
            width: 100%;
          `}
        >
          <p
            css={css`
              position: relative;
              margin: 0;
              padding: 4px;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              color: ${isThisMonth ? "#000" : "#aaa"};
              -webkit-touch-callout: none; /* iOS Safari */
              -webkit-user-select: none; /* Safari */
              -ms-user-select: none; /* 인터넷익스플로러 */
              user-select: none;
            `}
          >
            <span
              css={css`
                display: block;
                position: relative;
                top: -1px;
                width: ${isToday ? "24px" : "auto"};
                height: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 1rem;
                background: ${isToday ? "#f35d54" : ""};
              `}
            >
              {date.getDate()}
            </span>
            일
          </p>
          <div
            css={css`
              width: 100%;
              padding: 0 1px;
            `}
          >
            {todos &&
              todos.map((todo) => {
                return (
                  <Draggable key={todo.id} todo={todo}>
                    <CalendarTodo key={todo.id} todo={todo} />
                  </Draggable>
                );
              })}
              {skeletonTodo}
          </div>
        </div>
      </div>
    );
  }

export default React.memo(CalendarDateCell, areEqualProps);