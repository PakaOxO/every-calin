/** @jsxImportSource @emotion/react */
import React, { ReactEventHandler } from 'react';
import { css } from '@emotion/react';

interface IProps {
  icon: React.ReactNode;
  onClick: ReactEventHandler<HTMLDivElement>;
}

const TopMenuItem = ({ icon, onClick }: IProps) => {
  return (
    <div
      css={css`
        width: 24px;
        height: 24px;

        & > svg {
          width: 100%;
          height: 100%;
        }

        &:hover {
          cursor: pointer;
        }
      `}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export default TopMenuItem;

