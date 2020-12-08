import { updateDevices } from './update-devices';
import { updateWindow } from './update-window';

export const globalActions = {
  updateDevices,
  updateWindow
};

export type GlobalActions = typeof globalActions;
