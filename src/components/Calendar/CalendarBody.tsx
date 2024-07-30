/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import CalendarDayCell from "./CalendarDayCell";
import CalendarDateCell from "./CalendarDateCell";
import { dateMappedTodoListState, Todo } from "../../atom/Todo";
import { useRecoilValue } from "recoil";
import { dateFormatter } from "../../core/date";
import Droppable from "../UI/Droppable";

interface IProps {
  days: string[];
  dates: Date[][];
  todoCreateHandler: (date: Date) => boolean;
}

const CalendarBody = React.memo(
  ({ days, dates, todoCreateHandler }: IProps) => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const todoDateMap = useRecoilValue<Map<string, Todo[]>>(
      dateMappedTodoListState
    );
    const today = new Date();

    useEffect(() => {
      window.addEventListener("resize", resizeHandler);

      return () => {
        window.removeEventListener("resize", resizeHandler);
      };
    }, [window.innerWidth]);

    const resizeHandler = () => {
      setWidth(window.innerWidth);
    };

    return (
      <div
        css={css`
          width: 100%;
          height: ${width <= 480
            ? "calc(60vh - 40px - 60px)"
            : "calc(100vh - 40px - 60px)"};
        `}
      >
        <div
          css={css`
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 32px;
          `}
        >
          {days.map((day, idx) => (
            <CalendarDayCell key={idx} day={day} />
          ))}
        </div>
        <div
          css={css`
            width: 100%;
            height: calc((100% - 32px) / 6);
          `}
        >
          {dates.map((week, weekIdx) => (
            <div
              key={weekIdx}
              css={css`
                width: 100%;
                height: 100%;
                display: flex;
              `}
            >
              {week.map((date, dateIdx) => (
                <Droppable key={`${weekIdx}-${dateIdx}`} date={date}>
                  <CalendarDateCell
                    key={`${weekIdx}-${dateIdx}`}
                    date={date}
                    todos={todoDateMap.get(dateFormatter(date))}
                    todoCreateHandler={todoCreateHandler}
                    isToday={
                      today.getFullYear() === date.getFullYear() &&
                      today.getMonth() === date.getMonth() &&
                      date.getDate() === today.getDate()
                    }
                  />
                </Droppable>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default CalendarBody;