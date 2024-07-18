/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

interface IProps {
  type: string;
  value: any;
  label: string;
}

const Input = ({ type, value, label }: IProps) => {
  return (
    <div
      css={css`
        width: 100%;
        padding: 4px;
        border-bottom: 1px solid #aaa;
      `}
    >
      {label && <label>{label}</label>}
      <input type={type} value={value} readOnly />
    </div>
  );
};

export default Input;

