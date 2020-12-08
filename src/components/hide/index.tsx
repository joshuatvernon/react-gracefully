import React, { FunctionComponent } from 'react';
import isEmpty from 'lodash.isempty';

import { configSelectors, globalSelectors, useConfigStore, useGlobalStore } from '../../stores';
import { StyledMedia } from './styles';
import { HideProps } from './types';

export const Hide: FunctionComponent<HideProps> = (props) => {
  const { breakpoints = [], devices = [], children } = props;

  const [configState] = useConfigStore();
  const [globalState] = useGlobalStore();

  const { getBreakpoints } = configSelectors;
  const { getDevicesState } = globalSelectors;

  const devicesState = getDevicesState(globalState);

  if (!isEmpty(devices) && isEmpty(devices.filter((device) => devicesState[device]))) {
    return null;
  }

  return (
    <StyledMedia hiddenBreakpoints={breakpoints} breakpoints={getBreakpoints(configState)}>
      {children}
    </StyledMedia>
  );
};

export * from './types';
