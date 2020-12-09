import { initialGlobalState } from '../../state';
import { DevicesState } from '../../types';
import { updateDevices } from './index';

const setState = jest.fn();
const getState = jest.fn(() => initialGlobalState);
const dispatch = jest.fn();

describe('updateDevices', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should NOT call setState when new devices are equal to current devices', () => {
    // given
    const thunk = updateDevices(initialGlobalState.devices);
    getState.mockImplementation(() => initialGlobalState);

    // when
    thunk({ dispatch, getState, setState });

    // then
    expect(setState).not.toHaveBeenCalled();
  });

  test('should call seState when new devices are NOT equal to current devices', () => {
    // given
    const devices: DevicesState = {
      mobile: true,
      tablet: false,
      desktop: false
    };
    const thunk = updateDevices(devices);
    getState.mockImplementation(() => initialGlobalState);

    // when
    thunk({ dispatch, getState, setState });

    // then
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith({
      ...initialGlobalState,
      devices
    });
  });
});
