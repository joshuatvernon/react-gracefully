import { StoreActionApi } from 'react-sweet-state';

export interface Breakpoint {
  min: undefined | string;
  max: undefined | string;
}

export interface Breakpoints {
  [key: string]: Breakpoint;
}

export type Device = 'mobile' | 'tablet' | 'desktop' | 'unknown' | string;

export interface ConfigState {
  breakpoints: Breakpoints;
  devices: Device[];
}

export type ConfigSelectorProps = {
  initialState: ConfigState;
};

export type ConfigStoreApi = StoreActionApi<ConfigState>;
