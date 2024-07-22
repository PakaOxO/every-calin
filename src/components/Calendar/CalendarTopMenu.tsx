/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import SvgComponent from './SvgComponent';
import { FaBars } from 'react-icons/fa6';
import { useSetRecoilState } from 'recoil';
import { settingMenuState } from '../../atom/Menu';

const CalendarTopMenu = () => {
  const setMenuOpenState = useSetRecoilState<boolean>(settingMenuState);
  const leftMenuOpenHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setMenuOpenState((state) => !state);
  };

  return (
    <div
      css={css`
        width: 100%;
        height: 40px;
        padding: 8px;
        display: flex;
        align-items: center;
      `}
    >
      <SvgComponent icon={<FaBars />} onClick={leftMenuOpenHandler} />
    </div>
  );
};

export default CalendarTopMenu;

