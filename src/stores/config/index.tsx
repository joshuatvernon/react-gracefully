import { createContainer, createHook, createStore } from 'react-sweet-state';

import { ConfigActions, configActions } from './actions';
import { configSelectors } from './selectors';
import { initialConfigState } from './state';
import { ConfigSelectorProps, ConfigState } from './types';

export const CONFIG_STORE_NAME = 'react-gracefully-config-store';

const configStore = createStore({
  initialState: initialConfigState,
  name: CONFIG_STORE_NAME,
  actions: configActions
});

const useConfigStore = createHook(configStore);

const ConfigStoreContainer = createContainer<ConfigState, ConfigActions, ConfigSelectorProps>(configStore, {
  onInit: () => ({ setState }, { initialState }) => setState(initialState),
  onUpdate: () => ({ setState }, { initialState }) => setState(initialState)
});

export * from './actions';
export * from './selectors';
export * from './state';
export * from './types';
export { configStore, configSelectors, useConfigStore, ConfigStoreContainer };
