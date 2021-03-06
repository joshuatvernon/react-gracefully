import { Breakpoints, Device, DevicesState, WindowState } from '../../stores';
import { isNil } from '../../utils';

export interface GraceProviderProps {
  devices?: undefined | Device[] | DevicesState;
  breakpoints?: undefined | Breakpoints;
  window?: undefined | WindowState;
  /**
   * @description
   * scope is an optional string that will make the GraceProvider get (or create) a global provider with the scope as the id.
   */
  scope?: string;
}

export const isDevicesState = (devices: undefined | Device[] | DevicesState): devices is DevicesState =>
  !isNil(devices) && !Array.isArray(devices);
