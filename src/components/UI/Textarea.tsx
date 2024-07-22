/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

interface IProps {
  value: any;
  placeholder: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({ value, placeholder, label, onChange }: IProps) => {
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
      <textarea value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default TextArea;

