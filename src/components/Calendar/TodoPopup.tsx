import React from 'react';
import Popup from '../UI/Popup';
import CalendarTodoMenu from './CalendarTodoMenu';
import { Todo } from '../../atom/Todo';

interface IProps {
  open: boolean;
  anchor: HTMLDivElement | null;
  todoUpdateHandler: (todo: Todo) => void;
}

const TodoPopup = ({ open, anchor, todoUpdateHandler }: IProps) => {
  const [anchorTop, anchorLeft] = [anchor?.offsetTop || 0, anchor?.offsetLeft || 0];
  const [windowHeight, windowWidth] = [window.innerHeight, window.innerWidth];

  const aVertical = anchorTop < windowHeight / 2 ? 'top' : 'bottom';
  const aHorizontal = anchorLeft < windowWidth / 2 ? 'right' : 'left';

  const tVertical = anchorTop < windowHeight / 2 ? 'top' : 'bottom';
  const tHorizontal = anchorLeft < windowWidth / 2 ? 'left' : 'right';

  if (anchor === null) return null;

  return (
    <Popup
      open={open}
      width={280}
      height={300}
      anchorEl={anchor}
      anchorOrigin={{ vertical: aVertical, horizontal: aHorizontal }}
      transformOrigin={{ vertical: tVertical, horizontal: tHorizontal }}
    >
      <CalendarTodoMenu todoUpdateHandler={todoUpdateHandler} />
    </Popup>
  );
};

export default TodoPopup;

