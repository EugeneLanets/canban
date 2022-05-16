import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { throttle } from 'throttle-debounce-ts';
import AddNewItem from './AddNewItem';
import { ColumnContainer, ColumnTitle } from './style';
import { useAppState } from './state/AppStateContext';
import Card from './Card';
import {
  addTask, moveList, moveTask, setDraggedItem,
} from './state/actions';
import { useItemDrag } from './utils/useItemDrag';
import { isHidden } from './utils/isHidden';

type ColumnProps = {
  text: string,
  id: string,
  isPreview?: boolean
};

const Column = ({ text, id, isPreview }: ColumnProps) => {
  const { getTasksByListId, dispatch, draggedItem } = useAppState();
  const tasks = getTasksByListId(id);
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: 'COLUMN', id, text });

  const [, drop] = useDrop({
    accept: ['COLUMN', 'CARD'],
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === 'COLUMN') {
        if (draggedItem.id === id) {
          return;
        }

        dispatch(moveList(draggedItem.id, id));
      } else {
        if (draggedItem.columnId === id) {
          return;
        }
        if (tasks.length) {
          return;
        }

        dispatch(
          moveTask(draggedItem.id, null, draggedItem.columnId, id),
        );
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
      }
    }),
  });

  drag(drop(ref));

  return (
    <ColumnContainer
      ref={ref}
      isHidden={isHidden(draggedItem, 'COLUMN', id, isPreview)}
      isPreview={isPreview}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card
          text={task.text}
          id={task.id}
          columnId={id}
          key={task.id}
        />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another card"
        /* eslint-disable-next-line no-shadow */
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
};

export default Column;
