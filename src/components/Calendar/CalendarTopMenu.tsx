/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import TopMenuItem from './TopMenuItem';
import { FaBars } from 'react-icons/fa6';
import { useSetRecoilState } from 'recoil';
import { settingMenuState } from '../../atom/Menu';

const CalendarTopMenu = () => {
  const setMenuOpenState = useSetRecoilState<boolean>(settingMenuState);
  const leftMenuOpenHandler = () => {
    setMenuOpenState((state) => !state);
  };

  return (
    <div
      css={css`
        width: 100%;
        height: 40px;
        padding: 8px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
      `}
    >
      <TopMenuItem icon={<FaBars />} onClick={leftMenuOpenHandler} />
    </div>
  );
};

export default CalendarTopMenu;

