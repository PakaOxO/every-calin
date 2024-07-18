/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

interface IProps {
  value: any;
  placeholder: string;
  label: string;
}

const TextArea = ({ value, placeholder, label }: IProps) => {
  return (
    <div
      css={css`
        width: 100%;
        padding: 4px;
        border-bottom: 1px solid #aaa;
      `}
    >
      {label && (
        <label
          css={css`
            display: block;
          `}
        >
          {label}
        </label>
      )}
      <textarea value={value} placeholder={placeholder} readOnly />
    </div>
  );
};

export default TextArea;

