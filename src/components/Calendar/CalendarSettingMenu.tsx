/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { Category, categoryListState } from '../../atom/Category';
import Input from '../UI/Input';
import SvgComponent from './SvgComponent';
import { IoMdAddCircle } from 'react-icons/io';
import { FaTrashAlt } from 'react-icons/fa';

interface IProps {
  categoryAddHandler: () => void;
  categoryUpdateHandler: (category: Category) => void;
  categoryDeleteHandler: (id: string) => void;
}

const CalendarSettingMenu = ({ categoryAddHandler, categoryUpdateHandler, categoryDeleteHandler }: IProps) => {
  const categories = useRecoilValue<Category[]>(categoryListState);

  return (
    <div
      css={css`
        width: 240px;
        height: 100vh;
      `}
    >
      <div>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 4px 8px;
          `}
        >
          <p>Category List</p>
          <SvgComponent icon={<IoMdAddCircle />} onClick={categoryAddHandler} />
        </div>
        <ul
          css={css`
            width: 100%;
            padding: 4px;
          `}
        >
          {categories.map((category) => (
            <li
              css={css`
                display: flex;
                align-items: center;
              `}
              key={category.id}
            >
              <Input
                type="color"
                defaultValue={category.color}
                onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                  categoryUpdateHandler({ ...category, color: e.currentTarget.value })
                }
              />
              <Input
                type="text"
                defaultValue={category.name}
                onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                  categoryUpdateHandler({ ...category, name: e.currentTarget.value })
                }
              />
              <SvgComponent size={16} icon={<FaTrashAlt />} onClick={() => categoryDeleteHandler(category.id)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarSettingMenu;

