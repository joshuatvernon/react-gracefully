import isArray from 'lodash.isarray';
import isNil from 'lodash.isnil';

import { Breakpoints, Device, DevicesState } from '../../stores';

export interface GracefulProviderProps {
  devices: undefined | Device[] | DevicesState;
  breakpoints: undefined | Breakpoints;
}

export const isDevicesState = (devices: undefined | Device[] | DevicesState): devices is DevicesState =>
  !isNil(devices) && !isArray(devices);
