import { DevicesState, GlobalStoreApi } from '../../types';

export const updateDevices = (devices: DevicesState) => ({ getState, setState }: GlobalStoreApi): void => {
  const state = getState();

  // Update devices state
  setState({
    ...state,
    devices
  });
};
