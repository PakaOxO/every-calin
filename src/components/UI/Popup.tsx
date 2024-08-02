/** @jsxImportSource @emotion/react */
import React, { useRef } from 'react';
import { css } from '@emotion/react';

interface IOrigin {
  vertical: 'top' | 'mid' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

interface IProps {
  open: boolean;
  width: number;
  height: number;
  anchorEl: HTMLDivElement;
  anchorOrigin: IOrigin;
  transformOrigin: IOrigin;
  children: React.ReactNode;
}

const Popup = ({ open, width, height, anchorEl, anchorOrigin, transformOrigin, children }: IProps) => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [offsetTop, offsetLeft] = [anchorEl?.offsetTop || 0, anchorEl?.offsetLeft || 0];
  const [anchorWidth, anchorHeight] = [anchorEl?.offsetWidth || 0, anchorEl?.offsetHeight || 0];

  const originTop =
    offsetTop +
    (anchorOrigin.vertical === 'top' ? 0 : anchorOrigin.vertical === 'mid' ? anchorHeight / 2 : anchorHeight);
  const originLeft =
    offsetLeft +
    (anchorOrigin.horizontal === 'left' ? 0 : anchorOrigin.horizontal === 'center' ? anchorWidth / 2 : anchorWidth);

  const transformTop = -(transformOrigin.vertical === 'top'
    ? 0
    : transformOrigin.vertical === 'mid'
    ? height / 2
    : height);
  const transformLeft = -(transformOrigin.horizontal === 'left'
    ? 0
    : transformOrigin.horizontal === 'center'
    ? width / 2
    : width);

  return (
    <dialog
      css={css`
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        border: none;
        background: transparent;
        z-index: 10;
      `}
      open={open}
    >
      <div
        css={css`
          position: absolute;
          top: ${originTop + transformTop}px;
          left: ${originLeft + transformLeft}px;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        `}
        ref={popupRef}
      >
        {children}
      </div>
    </dialog>
  );
};

export default Popup;

