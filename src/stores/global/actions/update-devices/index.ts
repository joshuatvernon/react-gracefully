import { globalSelectors } from '../../selectors';
import { DevicesState, GlobalStoreApi } from '../../types';

export const updateDevices = (devices: DevicesState) => ({ getState, setState }: GlobalStoreApi): void => {
  const state = getState();

  const { getDevicesState } = globalSelectors;

  if (getDevicesState(state) !== devices) {
    setState({
      ...state,
      devices
    });
  }
};
