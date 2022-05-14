import { ReactNode } from 'react';
import { ColumnContainer, ColumnTitle } from './style';

type ColumnProps = {
  text: string,
  children?: ReactNode,
};

const Column = ({ text, children = null }: ColumnProps) => (
  <ColumnContainer>
    <ColumnTitle>{text}</ColumnTitle>
    {children}
  </ColumnContainer>
);

export default Column;
