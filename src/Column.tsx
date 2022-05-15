import AddNewItem from './AddNewItem';
import { ColumnContainer, ColumnTitle } from './style';
import { useAppState } from './state/AppStateContext';
import Card from './Card';
import { addTask } from './state/actions';

type ColumnProps = {
  text: string,
  id: string,
};

const Column = ({ text, id }: ColumnProps) => {
  const { getTasksByListId, dispatch } = useAppState();
  const tasks = getTasksByListId(id);
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} id={task.id} key={task.id} />
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
