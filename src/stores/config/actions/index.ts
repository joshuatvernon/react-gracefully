import { updateBreakpoints } from './update-breakpoints';
import { updateDevices } from './update-devices';

export const configActions = {
  updateBreakpoints,
  updateDevices
};

export type ConfigActions = typeof configActions;
