import { GlobalState, WindowOrientationState } from '../types';

export const initialGlobalState: GlobalState = {
  devices: {
    mobile: false,
    tablet: false,
    desktop: false
  },
  window: {
    width: '',
    height: '',
    orientation: WindowOrientationState.Portait
  }
};
