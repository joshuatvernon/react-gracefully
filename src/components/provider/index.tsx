import React, { FunctionComponent } from 'react';

import { UNKNOWN_DEVICE_TYPE } from '../../constants';
import { useMediaQuery } from '../../hooks/use-media-query';
import { useWindowSize } from '../../hooks/use-window-size';
import {
  DevicesState,
  globalSelectors,
  GlobalState,
  GlobalStoreContainer,
  initialConfigState,
  initialGlobalState,
  WindowState
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
    devicesState = Object.assign({}, devicesState, devicesOrDevicesState);
    devices = uniq(getDevices(initialConfigState).concat(keys(devicesState)));
  } else if (!isNil(devicesOrDevicesState)) {
    // `devicesOrDevicesState` is Device[]
    devicesState = devicesOrDevicesState.reduce((prev, curr) => ({ ...prev, [curr]: false }), devicesState);
    devices = uniq(getDevices(initialConfigState).concat(devicesOrDevicesState));
  } else {
    // `devicesOrDevicesState` is undefined
    devices = getDevices(initialConfigState);
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

  let windowState: WindowState = getWindowState(initialGlobalState);
  if (!isNil(window)) {
    windowState = window;
  } else {
    const { width, height } = useWindowSize();
    const orientation = useMediaQuery('(orientation: portrait)') ? 'portrait' : 'landscape';
    windowState = {
      width,
      height,
      orientation
    };
  }

  const globalState: GlobalState = {
    window: windowState,
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
