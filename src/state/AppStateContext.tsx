import {
  createContext, Dispatch, ReactNode, useContext, useEffect,
} from 'react';
import { useImmerReducer } from 'use-immer';
import {
  AppState, appStateReducer, List, Task,
} from './appStateReducer';
import { Action } from './actions';
import { DragItem } from '../DragItem';
import { save } from '../api';
import { withInitialState } from '../withInitialState';

type AppStateContextProps = {
  draggedItem: DragItem | null;
  lists: List[];
  getTasksByListId(id: string): Task[],
  dispatch: Dispatch<Action>,
}
const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);
type AppStateProviderProps = {
  children: ReactNode,
  initialState: AppState,
};

export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState);
    const { lists, draggedItem } = state;
    const getTasksByListId = (id: string) => lists.find((list) => list.id === id)?.tasks || [];

    useEffect(() => {
      save(state);
    }, [state]);
    return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
      <AppStateContext.Provider value={{
        lists, getTasksByListId, dispatch, draggedItem,
      }}
      >
        {children}
      </AppStateContext.Provider>
    );
  },
);

export const useAppState = () => useContext(AppStateContext);
