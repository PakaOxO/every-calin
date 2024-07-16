/** @jsxImportSource @emotion/react */
import React, { Dispatch, SetStateAction } from 'react';
import { css } from '@emotion/react';
import { useSetRecoilState } from 'recoil';
import { currDateState } from '../../atom/Date';
import Button from '../UI/Button';

interface IProps {
  date: Date;
}

const CalendarController = ({ date }: IProps) => {
  const setCurrDate = useSetRecoilState<Date>(currDateState);

  const getPrevMonthHandler = () => {
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    setCurrDate(prevMonth);
  };

  const getNextMonthHandler = () => {
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    setCurrDate(nextMonth);
  };

  const getCurrMonthHandler = () => {
    const today = new Date();
    setCurrDate(today);
  };

  return (
    <div>
      <Button onClick={getPrevMonthHandler}>{'<'}</Button>
      <Button onClick={getCurrMonthHandler}>{'오늘'}</Button>
      <Button onClick={getNextMonthHandler}>{'>'}</Button>
    </div>
  );
};

export default CalendarController;

