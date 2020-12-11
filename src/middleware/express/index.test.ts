import { defaultRegistry } from 'react-sweet-state';
import { NextFunction, Request, Response } from 'express';
import expressUseragent from 'express-useragent';

import {
  ConfigState,
  configStore,
  GlobalState,
  globalStore,
  initialConfigState,
  initialGlobalState
} from '../../stores';
import { isEmpty, isNil } from '../../utils';
import { Config, express } from './index';
import { DevicesConfig, Headers } from './types';

const mockNextFunction = jest.fn().mockImplementation() as NextFunction;

const userAgents = {
  mobile:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
  tablet:
    'Mozilla/5.0 (iPad; U; CPU iPhone OS 3_2 like Mac OS X) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10',
  desktop:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9'
};

describe('middleware', () => {
  const callMiddleware = (props?: { config?: Config; userAgent?: string; headers?: Headers }) => {
    const config = props && props.config;
    const headers = props && props.headers ? props.headers : {};

    // mock req, res and next with user agent
    const req = ({
      method: 'GET',
      headers: {
        'User-Agent': props && props.userAgent ? props.userAgent : '',
        ...headers
      },
      useragent:
        props && !isNil(props.userAgent)
          ? !isEmpty(props.userAgent)
            ? expressUseragent.parse(props.userAgent)
            : {}
          : undefined
    } as any) as Request;
    const res = ({} as any) as Response;

    // call express middleware with config and user agent
    if (config) {
      express(config)(req, res, mockNextFunction);
    } else {
      express()(req, res, mockNextFunction);
    }
  };

  const resetState = () => {
    defaultRegistry.getStore(configStore).storeState.resetState();
    defaultRegistry.getStore(globalStore).storeState.resetState();
  };

  const expectConfigStateEquals = (configState: ConfigState): void => {
    const state = defaultRegistry.getStore(configStore).storeState.getState();
    expect(state).toMatchObject(configState);
  };

  const expectGlobalStateEquals = (globalState: GlobalState): void => {
    const state = defaultRegistry.getStore(globalStore).storeState.getState();
    expect(state).toMatchObject(globalState);
  };

  describe('express', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      resetState();
    });

    test('does NOT update breakpoints when config is NOT passed', () => {
      // given/when
      callMiddleware();

      // then
      expect(mockNextFunction).toHaveBeenCalledTimes(1);
      expectConfigStateEquals(initialConfigState);
      expectGlobalStateEquals(initialGlobalState);
    });

    test('does NOT update breakpoints when config.breakpoints is NOT set', () => {
      // given
      const config: Config = {};

      // when
      callMiddleware({ config });

      // then
      expect(mockNextFunction).toHaveBeenCalledTimes(1);
      expectConfigStateEquals(initialConfigState);
      expectGlobalStateEquals(initialGlobalState);
    });

    test('updates the breakpoints when config.breakpoints is not empty', () => {
      // given
      const breakpoints = {
        sm: {
          min: undefined,
          max: '500px'
        },
        md: {
          min: '500px',
          max: '1000px'
        },
        lg: {
          min: '1000px',
          max: undefined
        }
      };
      const config: Config = {
        breakpoints
      };

      // when
      callMiddleware({ config });

      // then
      expect(mockNextFunction).toHaveBeenCalledTimes(1);
      expectConfigStateEquals({
        ...initialConfigState,
        breakpoints
      });
      expectGlobalStateEquals(initialGlobalState);
    });

    test('updates device to mobile when user agent is mobile', () => {
      // given
      const userAgent = userAgents.mobile;

      // when
      callMiddleware({ userAgent });

      // then
      expect(mockNextFunction).toHaveBeenCalledTimes(1);
      expectConfigStateEquals({
        ...initialConfigState
      });
      expectGlobalStateEquals({
        ...initialGlobalState,
        devices: {
          ...initialGlobalState.devices,
          unknown: false,
          mobile: true
        }
      });
    });

    test('updates device to tablet when user agent is tablet', () => {
      // given
      const userAgent = userAgents.tablet;

      // when
      callMiddleware({ userAgent });

      // then
      expect(mockNextFunction).toHaveBeenCalledTimes(1);
      expectConfigStateEquals(initialConfigState);
      expectGlobalStateEquals({
        ...initialGlobalState,
        devices: {
          ...initialGlobalState.devices,
          unknown: false,
          tablet: true
        }
      });
    });

    test('updates device to desktop when user agent is desktop', () => {
      // given
      const userAgent = userAgents.desktop;

      // when
      callMiddleware({ userAgent });

      // then
      expect(mockNextFunction).toHaveBeenCalledTimes(1);
      expectConfigStateEquals(initialConfigState);
      expectGlobalStateEquals({
        ...initialGlobalState,
        devices: {
          ...initialGlobalState.devices,
          unknown: false,
          desktop: true
        }
      });
    });

    test('updates device to unknown when user agent is undefined', () => {
      // given
      const userAgent = undefined;

      // when
      callMiddleware({ userAgent });

      // then
      expect(mockNextFunction).toHaveBeenCalledTimes(1);
      expectConfigStateEquals(initialConfigState);
      expectGlobalStateEquals({
        ...initialGlobalState,
        devices: {
          ...initialGlobalState.devices,
          unknown: true
        }
      });
    });

    test('updates mobile, tablet and desktop to false when useragent.isMobile, useragent.isTablet and useragent.isDesktop are undefined', () => {
      // given
      const userAgent = '';

      // when
      callMiddleware({ userAgent });

      // then
      expect(mockNextFunction).toHaveBeenCalledTimes(1);
      expectConfigStateEquals(initialConfigState);
      expectGlobalStateEquals({
        ...initialGlobalState,
        devices: {
          ...initialGlobalState.devices,
          unknown: true
        }
      });
    });

    test('updates device to mobile when config.devices.mobile is true', () => {
      // given
      const devices: DevicesConfig = {
        mobile: true,
        tablet: false,
        desktop: false
      };
      const config: Config = {
        devices
      };

      // when
      callMiddleware({ config });

      // then
      expect(mockNextFunction).toHaveBeenCalledTimes(1);
      expectConfigStateEquals({
        ...initialConfigState
      });
      expectGlobalStateEquals({
        ...initialGlobalState,
        devices: {
          ...initialGlobalState.devices,
          unknown: false,
          mobile: true
        }
      });
    });

    test('updates device to mobile when config.devices.tablet is true', () => {
      // given
      const devices: DevicesConfig = {
        mobile: false,
        tablet: true,
        desktop: false
      };
      const config: Config = {
        devices
      };

      // when
      callMiddleware({ config });

      // then
      expect(mockNextFunction).toHaveBeenCalledTimes(1);
      expectConfigStateEquals(initialConfigState);
      expectGlobalStateEquals({
        ...initialGlobalState,
        devices: {
          ...initialGlobalState.devices,
          unknown: false,
          tablet: true
        }
      });
    });

    test('updates device to mobile when config.devices.desktop is true', () => {
      // given
      const devices: DevicesConfig = {
        mobile: false,
        tablet: false,
        desktop: true
      };
      const config: Config = {
        devices
      };

      // when
      callMiddleware({ config });

      // then
      expect(mockNextFunction).toHaveBeenCalledTimes(1);
      expectConfigStateEquals(initialConfigState);
      expectGlobalStateEquals({
        ...initialGlobalState,
        devices: {
          ...initialGlobalState.devices,
          unknown: false,
          desktop: true
        }
      });
    });

    test('updates device to mobile when config.devices.desktop is true', () => {
      // given
      const devices: DevicesConfig = {
        mobile: false,
        tablet: false,
        desktop: false
      };
      const config: Config = {
        devices
      };

      // when
      callMiddleware({ config });

      // then
      expect(mockNextFunction).toHaveBeenCalledTimes(1);
      expectConfigStateEquals(initialConfigState);
      expectGlobalStateEquals({
        ...initialGlobalState,
        devices: {
          ...initialGlobalState.devices,
          unknown: true
        }
      });
    });

    test('updates device to mobile when config.devices.mobile is device function and device header is mobile', () => {
      // given
      const devices: DevicesConfig = {
        mobile: (headers: Headers) => headers['x-device-type'] === 'mobile',
        tablet: (headers: Headers) => headers['x-device-type'] === 'tablet',
        desktop: (headers: Headers) => headers['x-device-type'] === 'desktop'
      };
      const config: Config = {
        devices
      };
      const headers = {
        'x-device-type': 'mobile'
      };

      // when
      callMiddleware({ config, headers });

      // then
      expect(mockNextFunction).toHaveBeenCalledTimes(1);
      expectConfigStateEquals({
        ...initialConfigState
      });
      expectGlobalStateEquals({
        ...initialGlobalState,
        devices: {
          ...initialGlobalState.devices,
          unknown: false,
          mobile: true
        }
      });
    });

    test('updates device to tablet when config.devices.tablet is device function and device header is tablet', () => {
      // given
      const devices: DevicesConfig = {
        mobile: (headers: Headers) => headers['x-device-type'] === 'mobile',
        tablet: (headers: Headers) => headers['x-device-type'] === 'tablet',
        desktop: (headers: Headers) => headers['x-device-type'] === 'desktop'
      };
      const config: Config = {
        devices
      };
      const headers = {
        'x-device-type': 'tablet'
      };

      // when
      callMiddleware({ config, headers });

      // then
      expect(mockNextFunction).toHaveBeenCalledTimes(1);
      expectConfigStateEquals(initialConfigState);
      expectGlobalStateEquals({
        ...initialGlobalState,
        devices: {
          ...initialGlobalState.devices,
          unknown: false,
          tablet: true
        }
      });
    });

    test('updates device to desktop when config.devices.desktop is device function and device header is desktop', () => {
      // given
      const devices: DevicesConfig = {
        mobile: (headers: Headers) => headers['x-device-type'] === 'mobile',
        tablet: (headers: Headers) => headers['x-device-type'] === 'tablet',
        desktop: (headers: Headers) => headers['x-device-type'] === 'desktop'
      };
      const config: Config = {
        devices
      };
      const headers = {
        'x-device-type': 'desktop'
      };

      // when
      callMiddleware({ config, headers });

      // then
      expect(mockNextFunction).toHaveBeenCalledTimes(1);
      expectConfigStateEquals(initialConfigState);
      expectGlobalStateEquals({
        ...initialGlobalState,
        devices: {
          ...initialGlobalState.devices,
          unknown: false,
          desktop: true
        }
      });
    });

    test('updates device to desktop when config.devices.desktop is device function and device header is desktop', () => {
      // given
      const devices: DevicesConfig = {
        mobile: (headers: Headers) => headers['x-device-type'] === 'mobile',
        tablet: (headers: Headers) => headers['x-device-type'] === 'tablet',
        desktop: (headers: Headers) => headers['x-device-type'] === 'desktop'
      };
      const config: Config = {
        devices
      };
      const headers = {};

      // when
      callMiddleware({ config, headers });

      // then
      expect(mockNextFunction).toHaveBeenCalledTimes(1);
      expectConfigStateEquals(initialConfigState);
      expectGlobalStateEquals({
        ...initialGlobalState,
        devices: {
          ...initialGlobalState.devices,
          unknown: true
        }
      });
    });
  });
});
