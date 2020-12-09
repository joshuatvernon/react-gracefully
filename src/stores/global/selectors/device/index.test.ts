import cloneDeep from 'lodash.clonedeep';

import { initialGlobalState } from '../../state';
import { globalDeviceSelectors } from './index';

let state = cloneDeep(initialGlobalState);

describe('globalDeviceSelectors', () => {
  beforeEach(() => {
    state = cloneDeep(initialGlobalState);
  });

  test('isMobile returns true when mobile is true', () => {
    // given
    state.devices.mobile = true;

    // when
    const actual = globalDeviceSelectors.isMobile(state);

    // then
    expect(actual).toBeTruthy();
  });

  test('isMobile returns false when mobile is false', () => {
    // given
    state.devices.mobile = false;

    // when
    const actual = globalDeviceSelectors.isMobile(state);

    // then
    expect(actual).toBeFalsy();
  });

  test('isTablet returns true when mobile is true', () => {
    // given
    state.devices.tablet = true;

    // when
    const actual = globalDeviceSelectors.isTablet(state);

    // then
    expect(actual).toBeTruthy();
  });

  test('isTablet returns false when mobile is false', () => {
    // given
    state.devices.tablet = false;

    // when
    const actual = globalDeviceSelectors.isTablet(state);

    // then
    expect(actual).toBeFalsy();
  });

  test('isDesktop returns true when desktop is true', () => {
    // given
    state.devices.desktop = true;

    // when
    const actual = globalDeviceSelectors.isDesktop(state);

    // then
    expect(actual).toBeTruthy();
  });

  test('isDesktop returns false when desktop is false', () => {
    // given
    state.devices.desktop = false;

    // when
    const actual = globalDeviceSelectors.isDesktop(state);

    // then
    expect(actual).toBeFalsy();
  });

  test('isDevice returns true when device is true', () => {
    // given
    state.devices.mobile = true;

    // when
    const actual = globalDeviceSelectors.isDevice(state, 'mobile');

    // then
    expect(actual).toBeTruthy();
  });

  test('isDevice returns false when device is false', () => {
    // given
    state.devices.mobile = false;

    // when
    const actual = globalDeviceSelectors.isDevice(state, 'mobile');

    // then
    expect(actual).toBeFalsy();
  });

  test('getDevicesState returns devices state', () => {
    // given
    const devices = {
      mobile: true,
      tablet: false,
      desktop: false,
      unknown: false
    };
    state.devices = devices;

    // when
    const actual = globalDeviceSelectors.getDevicesState(state);

    // then
    expect(actual).toBe(devices);
  });

  test('getCurrentDevices returns single current device', () => {
    // given
    const devices = {
      mobile: true,
      tablet: false,
      desktop: false,
      unknown: false
    };
    state.devices = devices;

    // when
    const actual = globalDeviceSelectors.getCurrentDevices(state);

    // then
    expect(actual).toMatchObject(['mobile']);
  });

  test('getCurrentDevices returns multiple current devices', () => {
    // given
    const devices = {
      mobile: true,
      ios: true,
      tablet: false,
      desktop: false,
      unknown: false
    };
    state.devices = devices;

    // when
    const actual = globalDeviceSelectors.getCurrentDevices(state);

    // then
    expect(actual).toMatchObject(['mobile', 'ios']);
  });
});
