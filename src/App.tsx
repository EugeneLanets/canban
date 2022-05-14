import React from 'react';
import { AppContainer } from './style';
import Column from './Column';
import Card from './Card';
import AddNewItem from './AddNewItem';

const App = () => (
  <AppContainer>
    <Column text="Column">
      <Card text="NewCard" />
    </Column>
    <AddNewItem toggleButtonText="+ Add another list" onAdd={console.log} />
  </AppContainer>
);

export default App;
