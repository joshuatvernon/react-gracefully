import React, { FunctionComponent } from 'react';
import isEmpty from 'lodash.isempty';

import { configSelectors, globalSelectors, useConfigStore, useGlobalStore } from '../../stores';
import { StyledMedia } from './styles';
import { ShowProps } from './types';

export const Show: FunctionComponent<ShowProps> = (props) => {
  const {
    devices: shownDevices = [],
    breakpoints: shownBreakpoints = [],
    orientation: shownOrientation,
    children
  } = props;

  const [configState] = useConfigStore();
  const [globalState] = useGlobalStore();

  const { getBreakpoints } = configSelectors;
  const { getDevicesState } = globalSelectors;

  const devicesState = getDevicesState(globalState);

  if (!isEmpty(shownDevices) && isEmpty(shownDevices.filter((shownDevice) => devicesState[shownDevice]))) {
    return null;
  }

  return (
    <StyledMedia
      breakpoints={getBreakpoints(configState)}
      shownBreakpoints={shownBreakpoints}
      shownOrientation={shownOrientation}
    >
      {children}
    </StyledMedia>
  );
};

export * from './types';
