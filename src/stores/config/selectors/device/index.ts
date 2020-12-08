import { ConfigState, Device } from '../../types';

export const getDevices = (state: ConfigState): Device[] => state.devices;

export const configDeviceSelectors = {
  getDevices
};
