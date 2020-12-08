import { globalDeviceSelectors } from './device';
import { globalWindowSelectors } from './window';

export const globalSelectors = {
  ...globalDeviceSelectors,
  ...globalWindowSelectors
};
