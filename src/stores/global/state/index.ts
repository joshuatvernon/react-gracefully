import { UNKNOWN_DEVICE_TYPE } from '../../../constants';
import { GlobalState, Orientation } from '../types';

export const initialGlobalState: GlobalState = {
  devices: {
    mobile: false,
    tablet: false,
    desktop: false,
    [UNKNOWN_DEVICE_TYPE]: true
  },
  window: {
    width: '1024px',
    height: '768px',
    orientation: Orientation.Landscape
  }
};
