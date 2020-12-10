import cloneDeep from 'lodash.clonedeep';

import { initialConfigState } from '../../state';
import { Device } from '../../types';
import { configDeviceSelectors } from './index';

let state = cloneDeep(initialConfigState);

describe('configDeviceSelectors', () => {
  beforeEach(() => {
    state = cloneDeep(initialConfigState);
  });

  test('getDevices should return initial devices when NOT updated', () => {
    // given/when
    const actual = configDeviceSelectors.getDevices(state);

    // then
    expect(actual).toMatchObject(initialConfigState.devices);
  });

  test('getDevices should return an empty array when devices is an empty array', () => {
    // given
    const devices: Device[] = [];
    state.devices = devices;

    // when
    const actual = configDeviceSelectors.getDevices(state);

    // then
    expect(actual).toMatchObject(devices);
  });

  test('getDevices should return a devices array when devices is a devices array', () => {
    // given
    const devices: Device[] = ['mobile', 'tablet', 'desktop', 'ios', 'android', 'smartTv'];
    state.devices = devices;

    // when
    const actual = configDeviceSelectors.getDevices(state);

    // then
    expect(actual).toMatchObject(devices);
  });
});
