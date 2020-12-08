import isEqual from 'lodash.isequal';

import { configSelectors } from '../../selectors';
import { Breakpoints, ConfigStoreApi } from '../../types';

export const updateBreakpoints = (breakpoints: Breakpoints) => ({ getState, setState }: ConfigStoreApi): void => {
  const state = getState();

  const { getBreakpoints } = configSelectors;

  if (!isEqual(getBreakpoints(state), breakpoints)) {
    setState({
      ...state,
      breakpoints
    });
  }
};
