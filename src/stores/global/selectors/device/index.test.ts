import cloneDeep from 'lodash.clonedeep';

import { initialGlobalState } from '../../state';
import { globalDeviceSelectors } from './index';

let state = cloneDeep(initialGlobalState);

describe('globalDeviceSelectors', () => {
  beforeEach(() => {
    // Reset state
    state = cloneDeep(initialGlobalState);
  });

  test('isMobile', () => {
    state.devices.mobile = true;
    const expected = true;
    const actual = globalDeviceSelectors.isMobile(state);
    expect(actual).toBe(expected);
  });

  test('isTablet', () => {
    state.devices.tablet = true;
    const expected = true;
    const actual = globalDeviceSelectors.isTablet(state);
    expect(actual).toBe(expected);
  });

  test('isDesktop', () => {
    state.devices.desktop = true;
    const expected = true;
    const actual = globalDeviceSelectors.isDesktop(state);
    expect(actual).toBe(expected);
  });

  test('isDevice', () => {
    state.devices.mobile = true;
    const expected = true;
    const actual = globalDeviceSelectors.isDevice(state, 'mobile');
    expect(actual).toBe(expected);
  });

  test('getDevicesState', () => {
    const devices = {
      mobile: true,
      tablet: false,
      desktop: false,
      unknown: false
    };
    state.devices = devices;
    const expected = devices;
    const actual = globalDeviceSelectors.getDevicesState(state);
    expect(actual).toBe(expected);
  });

  test('getCurrentDevices', () => {
    const devices = {
      mobile: true,
      tablet: false,
      desktop: false,
      unknown: false
    };
    state.devices = devices;
    const expected = ['mobile'];
    const actual = globalDeviceSelectors.getCurrentDevices(state);
    expect(actual).toMatchObject(expected);
  });
});
