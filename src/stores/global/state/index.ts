import { GlobalState, Orientation } from '../types';

export const initialGlobalState: GlobalState = {
  devices: {
    mobile: false,
    tablet: false,
    desktop: false
  },
  window: {
    width: '',
    height: '',
    orientation: Orientation.Portait
  }
};
