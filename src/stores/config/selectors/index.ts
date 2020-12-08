import { configBreakpointSelectors } from './breakpoints';
import { configDeviceSelectors } from './device';

export const configSelectors = {
  ...configBreakpointSelectors,
  ...configDeviceSelectors
};
