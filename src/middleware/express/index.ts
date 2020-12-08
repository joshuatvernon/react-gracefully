import { NextFunction, Request, Response } from 'express';
import { Details } from 'express-useragent';
import isNil from 'lodash.isnil';
import keys from 'lodash.keys';
import uniq from 'lodash.uniq';

import { registry } from '../../stores';
import { configSelectors, configStore } from '../../stores/config';
import { DevicesState, globalSelectors, globalStore } from '../../stores/global';
import { Config, isDeviceFunction } from './types';

export const express = (config?: Config) => (req: Request, _res: Response, next: NextFunction): void => {
  if (!isNil(config) && !isNil(config.breakpoints)) {
    // Config breakpoints were provided; update config store
    registry.getStore(configStore).getActions().updateBreakpoints(config.breakpoints);
  }

  if (!isNil(config) && !isNil(config.devices)) {
    // Config devices were provided; get the request headers and update config store
    const { headers } = req;

    const configState = registry.getStore(configStore).getState();

    const { getDevices } = configSelectors;

    const devices = uniq(getDevices(configState).concat(keys(config.devices)));

    // Update config store devices
    registry.getStore(configStore).getActions().updateDevices(devices);

    const globalState = registry.getStore(globalStore).getState();

    const { getDevicesState } = globalSelectors;

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
    registry.getStore(globalStore).getActions().updateDevices(devicesState);
  } else {
    // Config was not provided; fallback to getting the useragent details from request
    const details: undefined | Details = req.useragent;

    // Get the device type details from the user agent to update the global store devices
    if (details) {
      registry
        .getStore(globalStore)
        .getActions()
        .updateDevices({
          mobile: !isNil(details.isMobile) ? details.isMobile : false,
          tablet: !isNil(details.isTablet) ? details.isTablet : false,
          desktop: !isNil(details.isDesktop) ? details.isDesktop : false
        });
    }
  }

  // Call next function
  next();
};

export * from './types';
