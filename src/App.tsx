import React from 'react';
import { AppContainer } from './style';
import Column from './Column';
import AddNewItem from './AddNewItem';
import { useAppState } from './AppStateContext';

const App = () => {
  const { lists } = useAppState();
  return (
    <AppContainer>
      {lists.map((list) => (
        <Column text={list.text} key={list.id} id={list.id} />
      ))}
      <AddNewItem toggleButtonText="+ Add another list" onAdd={console.log} />
    </AppContainer>
  );
};

export default App;
