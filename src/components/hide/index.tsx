import React, { FunctionComponent } from 'react';
import isEmpty from 'lodash.isempty';

import { configSelectors, globalSelectors, useConfigStore, useGlobalStore } from '../../stores';
import { StyledMedia } from './styles';
import { HideProps } from './types';

export const Hide: FunctionComponent<HideProps> = (props) => {
  const {
    breakpoints: hiddenBreakpoints = [],
    devices: hiddenDevices = [],
    orientation: hiddenOrientation,
    children
  } = props;

  const [configState] = useConfigStore();
  const [globalState] = useGlobalStore();

  const { getBreakpoints } = configSelectors;
  const { getDevicesState } = globalSelectors;

  const devicesState = getDevicesState(globalState);
  if (!isEmpty(hiddenDevices) && !isEmpty(hiddenDevices.filter((hiddenDevice) => devicesState[hiddenDevice]))) {
    // hidden devices contains a device that matches a current device; render null to hide children
    return null;
  }

  // no matching hidden orientation or devices; render a styled
  return (
    <StyledMedia
      breakpoints={getBreakpoints(configState)}
      hiddenBreakpoints={hiddenBreakpoints}
      hiddenOrientation={hiddenOrientation}
    >
      {children}
    </StyledMedia>
  );
};

export * from './types';
