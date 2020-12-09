import isEqual from 'lodash.isequal';

import { globalSelectors } from '../../selectors';
import { GlobalStoreApi, WindowState } from '../../types';

export const updateWindow = (window: WindowState) => ({ getState, setState }: GlobalStoreApi): void => {
  const state = getState();

  const { getWindowState } = globalSelectors;

  if (!isEqual(getWindowState(state), window)) {
    setState({
      ...state,
      window
    });
  }
};
