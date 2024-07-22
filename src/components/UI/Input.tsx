/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

interface IProps {
  type: string;
  value?: any;
  defaultValue?: any;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

const Input = ({ type, value, defaultValue, label, onChange, onBlur, readOnly = false }: IProps) => {
  return (
    <div
      css={css`
        padding: 4px;
      `}
    >
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={readOnly ? (e) => e.preventDefault() : () => {}}
      />
    </div>
  );
};

export default Input;

