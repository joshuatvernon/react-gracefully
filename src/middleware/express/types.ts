import { Breakpoints } from '../../stores/config';

export interface Headers {
  [key: string]: undefined | string | string[];
}

export type DeviceFunction = (headers: Headers) => boolean;

export interface DevicesConfig {
  mobile: undefined | boolean | DeviceFunction;
  tablet: undefined | boolean | DeviceFunction;
  desktop: undefined | boolean | DeviceFunction;
  [key: string]: undefined | boolean | DeviceFunction;
}

export const isDeviceFunction = (device: undefined | boolean | DeviceFunction): device is DeviceFunction =>
  device !== undefined && typeof device !== 'boolean' && typeof device === 'function';

export type BreakpointsConfig = Breakpoints;
export interface Config {
  devices?: DevicesConfig;
  breakpoints?: BreakpointsConfig;
}
