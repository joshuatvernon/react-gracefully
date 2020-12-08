import { createContainer, createHook, createStore } from 'react-sweet-state';

import { GlobalActions, globalActions } from './actions';
import { globalSelectors } from './selectors';
import { initialGlobalState } from './state';
import { GlobalSelectorProps, GlobalState } from './types';

export const GLOBAL_STORE_NAME = 'react-gracefully-global-store';

const globalStore = createStore({
  initialState: initialGlobalState,
  name: GLOBAL_STORE_NAME,
  actions: globalActions
});

const useGlobalStore = createHook(globalStore);

const GlobalStoreContainer = createContainer<GlobalState, GlobalActions, GlobalSelectorProps>(globalStore, {
  onInit: () => ({ setState }, { initialState }) => setState(initialState),
  onUpdate: () => ({ setState }, { initialState }) => setState(initialState)
});

export * from './actions';
export * from './selectors';
export * from './state';
export * from './types';
export { globalStore, globalSelectors, useGlobalStore, GlobalStoreContainer };
