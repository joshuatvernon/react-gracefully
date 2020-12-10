import { defaultRegistry } from 'react-sweet-state';
import { NextFunction, Request, Response } from 'express';
import { Details } from 'express-useragent';
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';
import keys from 'lodash.keys';
import uniq from 'lodash.uniq';

import { configSelectors, configStore, DevicesState, globalSelectors, globalStore } from '../../stores';
import { Config, isDeviceFunction } from './types';

export const express = (config?: Config) => (req: Request, _res: Response, next: NextFunction): void => {
  // Get config
  const { getDevices } = configSelectors;
  const configState = defaultRegistry.getStore(configStore).storeState.getState();
  const configActions = defaultRegistry.getStore(configStore).actions;

  // Get global
  const { getDevicesState } = globalSelectors;
  const globalState = defaultRegistry.getStore(globalStore).storeState.getState();
  const globalActions = defaultRegistry.getStore(globalStore).actions;

  if (!isNil(config) && !isNil(config.breakpoints) && !isEmpty(config.breakpoints)) {
    // Config breakpoints were provided; update config store
    configActions.updateBreakpoints(config.breakpoints);
  }

  if (!isNil(config) && !isNil(config.devices)) {
    // Config devices were provided; get the request headers and update config store
    const { headers } = req;

    const devices = uniq(getDevices(configState).concat(keys(config.devices)));

    // Update config store devices
    configActions.updateDevices(devices);

    const devicesState: DevicesState = getDevicesState(globalState);

    for (const device of devices) {
      let value = false;

      const functionOrBoolean = config.devices[device];
      if (isDeviceFunction(functionOrBoolean)) {
        // `functionOrBoolean` is a function; evaluate function and save as value
        value = functionOrBoolean(headers);
      } else if (!isNil(functionOrBoolean)) {
        // `functionOrBoolean` is a boolean; save as value
        value = functionOrBoolean;
      }

      devicesState[device] = value;
    }

    const deviceIsUnknown = !devices
      .map((device: string) => devicesState[device])
      .some((isDevice: boolean) => isDevice);
    if (deviceIsUnknown) {
      devicesState['unknown'] = true;
    }

    // Update global store devices
    globalActions.updateDevices(devicesState);
  } else {
    // Config was not provided; fallback to getting the useragent details from request
    const details: undefined | Details = req.useragent;

    // Get the device type details from the user agent to update the global store devices
    if (details) {
      const desktop = !isNil(details.isDesktop) ? details.isDesktop : false;
      const tablet = !isNil(details.isTablet) ? details.isTablet && !desktop : false;
      const mobile = !isNil(details.isMobile) ? details.isMobile && !tablet : false;
      const unknown = !desktop && !tablet && !mobile;
      globalActions.updateDevices({ mobile, tablet, desktop, unknown });
    } else {
      globalActions.updateDevices({ mobile: false, tablet: false, desktop: false, unknown: true });
    }
  }

  // Call next function
  next();
};

export * from './types';
