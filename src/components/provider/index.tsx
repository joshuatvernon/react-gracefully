import React, { FunctionComponent } from 'react';
import merge from 'lodash.merge';

import { UNKNOWN_DEVICE_TYPE } from '../../constants';
import {
  DevicesState,
  globalSelectors,
  GlobalState,
  GlobalStoreContainer,
  initialConfigState,
  initialGlobalState
} from '../../stores';
import { configSelectors, ConfigState, ConfigStoreContainer, Device } from '../../stores/config';
import { isNil, keys, uniq } from '../../utils';
import { GraceProviderProps, isDevicesState } from './types';

export const GraceProvider: FunctionComponent<GraceProviderProps> = (props) => {
  const { devices: devicesOrDevicesState, breakpoints, window, children, scope } = props;

  const { getBreakpoints, getDevices } = configSelectors;

  const { getWindowState, getDevicesState } = globalSelectors;

  let devices: Device[] = [];
  let devicesState: DevicesState = getDevicesState(initialGlobalState);

  if (isDevicesState(devicesOrDevicesState)) {
    // `devicesOrDevicesState` is DevicesState
    devicesState = merge({}, devicesState, devicesOrDevicesState);
    devices = uniq(getDevices(initialConfigState).concat(keys(devicesState)));
  } else if (!isNil(devicesOrDevicesState)) {
    // `devicesOrDevicesState` is Device[]
    devices = uniq(getDevices(initialConfigState).concat(devicesOrDevicesState));
  }

  const deviceIsUnknown = !devices
    .filter((device: string) => device !== UNKNOWN_DEVICE_TYPE)
    .map((device: string) => devicesState[device])
    .some((isDevice: boolean) => isDevice);
  if (deviceIsUnknown) {
    devicesState[UNKNOWN_DEVICE_TYPE] = true;
  } else {
    devicesState[UNKNOWN_DEVICE_TYPE] = false;
  }

  const configState: ConfigState = {
    breakpoints: !isNil(breakpoints) ? breakpoints : getBreakpoints(initialConfigState),
    devices
  };

  // TODO: Add functionality to detect window "width", "height" and "orientation" and update
  // window state when window state is NOT passed to provider
  const globalState: GlobalState = {
    window: !isNil(window) ? window : getWindowState(initialGlobalState),
    devices: devicesState
  };

  return (
    <ConfigStoreContainer initialState={configState} scope={scope}>
      <GlobalStoreContainer initialState={globalState} scope={scope}>
        {children}
      </GlobalStoreContainer>
    </ConfigStoreContainer>
  );
};

export * from './types';
