import React from 'react';
import { AppContainer } from './style';
import Column from './Column';
import Card from './Card';

const App = () => (
  <AppContainer>
    <Column text="Column">
      <Card text="NewCard" />
    </Column>
  </AppContainer>
);

export default App;
