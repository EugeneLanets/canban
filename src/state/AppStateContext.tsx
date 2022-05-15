import {
  createContext, Dispatch, ReactNode, useContext,
} from 'react';
import { useImmerReducer } from 'use-immer';
import {
  AppState, appStateReducer, List, Task,
} from './appStateReducer';
import { Action } from './actions';

const appData: AppState = {
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }],
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{ id: 'c2', text: 'Learn Typescript' }],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c3', text: 'Begin to use static typing' }],
    },
  ],
};
type AppStateContextProps = {
  lists: List[]
  getTasksByListId(id: string): Task[],
  dispatch: Dispatch<Action>,
}
const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);
type AppStateProviderProps = {
  children: ReactNode
};

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);
  const { lists } = state;
  const getTasksByListId = (id: string) => lists.find((list) => list.id === id)?.tasks || [];

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AppStateContext.Provider value={{ lists, getTasksByListId, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
