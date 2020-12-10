import { initialConfigState } from '../../state';
import { Device } from '../../types';
import { updateDevices } from './index';

const setState = jest.fn();
const getState = jest.fn(() => initialConfigState);
const dispatch = jest.fn();

describe('updateDevices', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should NOT call setState when devices are equal to current devices', () => {
    // given
    const thunk = updateDevices(initialConfigState.devices);
    getState.mockImplementation(() => initialConfigState);

    // when
    thunk({ dispatch, getState, setState });

    // then
    expect(setState).not.toHaveBeenCalled();
  });

  test('should call seState when devices are NOT equal to current devices', () => {
    // given
    const devices: Device[] = ['mobile', 'tablet', 'desktop', 'ios', 'android'];
    const thunk = updateDevices(devices);
    getState.mockImplementation(() => initialConfigState);

    // when
    thunk({ dispatch, getState, setState });

    // then
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith({
      ...initialConfigState,
      devices
    });
  });
});
