import { defaultRegistry, Store, StoreInstance } from 'react-sweet-state';

/**
 * Get global or scoped store from store instance
 *
 * @param store store instance
 * @param scope scope id used to get the scoped store instance within the global store
 */
const getStore = <S = Record<string, unknown>>(
  store: Store<S, any>,
  scope?: string
): { getActions: () => any; getState: () => S } => {
  const { actions, storeState } = scope ? defaultRegistry.getStore(store, scope) : defaultRegistry.getStore(store);
  return {
    getActions: () => actions,
    getState: () => storeState.getState()
  };
};

/**
 * Delete global or scoped store from store instance
 *
 * @param store store instance
 * @param scope scope id used to get the scoped store instance within the global store
 */
const deleteStore = (store: Store<any, any>, scope?: string): void => {
  if (scope) {
    defaultRegistry.deleteStore(store, scope);
  } else {
    defaultRegistry.deleteStore(store);
  }
};

/**
 * Initialize a store instance
 *
 * @param store store instance
 * @param key key used to identify the store instance
 */
const initStore = (store: Store<any, any>, key: string): StoreInstance<any, any> => {
  return defaultRegistry.initStore(store, key);
};

/**
 * `registry` can be used to get access to the the store outside of react functional and
 * class components. This registry is a wrapper around the `react-sweet-state` defaultRegistry
 * to ensure if the defaultRegistry inner API changes this can still be used
 */
export const registry = {
  deleteStore,
  getStore,
  initStore,
  stores: defaultRegistry.stores
};
