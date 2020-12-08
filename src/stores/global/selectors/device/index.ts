import keys from 'lodash.keys';

import { DevicesState, GlobalState } from '../../types';

export const isMobile = (state: GlobalState): boolean => state.devices.mobile;

export const isTablet = (state: GlobalState): boolean => state.devices.tablet;

export const isDesktop = (state: GlobalState): boolean => state.devices.desktop;

export const isDevice = (state: GlobalState, device: string): boolean => state.devices[device];

export const getDevicesState = (state: GlobalState): DevicesState => state.devices;

export const getCurrentDevices = (state: GlobalState): string[] =>
  keys(state.devices).reduce((devices: string[], device: string) => {
    return state.devices[device] ? [...devices, device] : devices;
  }, []);

export const globalDeviceSelectors = {
  isMobile,
  isTablet,
  isDesktop,
  isDevice,
  getDevicesState,
  getCurrentDevices
};
