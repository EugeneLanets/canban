import { ReactNode } from 'react';
import AddNewItem from './AddNewItem';
import { ColumnContainer, ColumnTitle } from './style';

type ColumnProps = {
  text: string,
  children?: ReactNode,
};

const Column = ({ text, children = null }: ColumnProps) => (
  <ColumnContainer>
    <ColumnTitle>{text}</ColumnTitle>
    {children}
    <AddNewItem
      toggleButtonText="+ Add another task"
      onAdd={console.log}
      dark
    />
  </ColumnContainer>
);

export default Column;
