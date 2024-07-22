/** @jsxImportSource @emotion/react */
import React, { ReactEventHandler } from 'react';
import { css } from '@emotion/react';

interface IProps {
  size?: number;
  icon: React.ReactNode;
  onClick: ReactEventHandler<HTMLDivElement>;
}

const SvgComponent = ({ size = 24, icon, onClick }: IProps) => {
  return (
    <div
      css={css`
        width: ${size}px;
        height: ${size}px;

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

export default SvgComponent;

