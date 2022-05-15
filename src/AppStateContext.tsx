import { createContext, ReactNode } from 'react';

type Task = {
  id: string
  text: string
};

type List = {
  id: string
  text: string
  tasks: Task[]
};

export type AppState = {
  lists: List[]
};

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
  getTasksByListId(id: string): Task[]
}
const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);
type AppStateProviderProps = {
  children: ReactNode
};

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const { lists } = appData;

  const getTasksByListId = (id: string) => lists.find((list) => list.id === id)?.tasks || [];

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AppStateContext.Provider value={{ lists, getTasksByListId }}>
      {children}
    </AppStateContext.Provider>
  );
};
