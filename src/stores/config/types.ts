import { StoreActionApi } from 'react-sweet-state';

import { UNKNOWN_DEVICE_TYPE } from '../../constants';

export interface Breakpoint {
  min: undefined | string;
  max: undefined | string;
}

export interface Breakpoints {
  [key: string]: Breakpoint;
}

export type Device = 'mobile' | 'tablet' | 'desktop' | typeof UNKNOWN_DEVICE_TYPE | string;

export interface ConfigState {
  breakpoints: Breakpoints;
  devices: Device[];
}

export type ConfigSelectorProps = {
  initialState: ConfigState;
};

export type ConfigStoreApi = StoreActionApi<ConfigState>;
