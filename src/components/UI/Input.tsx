/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

interface IProps {
  type: string;
  value: any;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, value, label, onChange }: IProps) => {
  return (
    <div
      css={css`
        width: 100%;
        padding: 4px;
        border-bottom: 1px solid #aaa;
      `}
    >
      {label && <label>{label}</label>}
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;

