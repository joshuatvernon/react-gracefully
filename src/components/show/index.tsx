import React, { FunctionComponent } from 'react';

import { configSelectors, globalSelectors, useConfigStore, useGlobalStore } from '../../stores';
import { isEmpty, isNil } from '../../utils';
import { StyledMedia } from './styles';
import { ShowProps } from './types';

export const Show: FunctionComponent<ShowProps> = (props) => {
  const { devices: shownDevices, breakpoints: shownBreakpoints = [], orientation: shownOrientation, children } = props;

  const [configState] = useConfigStore();
  const [globalState] = useGlobalStore();

  const { getBreakpoints } = configSelectors;
  const { getDevicesState } = globalSelectors;

  const devicesState = getDevicesState(globalState);

  if (
    (!isNil(shownDevices) && isEmpty(shownDevices)) ||
    (!isNil(shownDevices) && isEmpty(shownDevices.filter((shownDevice) => devicesState[shownDevice])))
  ) {
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
