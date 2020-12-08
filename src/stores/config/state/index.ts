import { ConfigState } from '../types';

export const defaultDevices = ['mobile', 'tablet', 'desktop', 'unknown'];

export const initialConfigState: ConfigState = {
  breakpoints: {},
  devices: defaultDevices
};
