import React, { FunctionComponent } from 'react';
import isNil from 'lodash.isnil';
import keys from 'lodash.keys';
import merge from 'lodash.merge';
import uniq from 'lodash.uniq';

import { DevicesState, globalSelectors, GlobalState, GlobalStoreContainer, useGlobalStore } from '../../stores';
import { configSelectors, ConfigState, ConfigStoreContainer, Device, useConfigStore } from '../../stores/config';
import { GracefulProviderProps, isDevicesState } from './types';

export const GracefulProvider: FunctionComponent<GracefulProviderProps> = (props) => {
  const { devices: devicesOrDevicesState, breakpoints, children } = props;

  const [configState] = useConfigStore();

  const { getBreakpoints, getDevices } = configSelectors;

  const [globalState] = useGlobalStore();

  const { getDevicesState } = globalSelectors;

  let devices: Device[] = [];
  let devicesState: DevicesState = getDevicesState(globalState);
  if (isDevicesState(devicesOrDevicesState)) {
    // `devicesOrDevicesState` is DevicesState
    devicesState = merge(devicesState, devicesOrDevicesState);
    devices = uniq(getDevices(configState).concat(keys(devicesState)));
  } else if (!isNil(devicesOrDevicesState)) {
    // `devicesOrDevicesState` is Device[]
    devices = uniq(getDevices(configState).concat(devicesOrDevicesState));
  }

  const deviceIsUnknown = !devices.map((device: string) => devicesState[device]).some((isDevice: boolean) => isDevice);
  if (deviceIsUnknown) {
    devicesState['unknown'] = true;
  }

  const initialConfigState: ConfigState = {
    breakpoints: breakpoints ? breakpoints : getBreakpoints(configState),
    devices
  };

  const initialGlobalState: GlobalState = {
    ...globalState,
    devices: devicesState
  };

  return (
    <ConfigStoreContainer initialState={initialConfigState}>
      <GlobalStoreContainer initialState={initialGlobalState}>{children}</GlobalStoreContainer>
    </ConfigStoreContainer>
  );
};
