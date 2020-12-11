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
    width: '',
    height: '',
    orientation: Orientation.Portait
  }
};
