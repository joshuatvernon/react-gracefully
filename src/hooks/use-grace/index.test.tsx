import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { GraceProvider, GraceProviderProps } from '../../components/provider';
import { Breakpoints, Device, DevicesState, initialGlobalState, WindowState } from '../../stores';
import { useGrace } from './index';

const defaultBreakpoints: Breakpoints = {
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

const defaultDevices: DevicesState = initialGlobalState.devices;

const defaultWindow: WindowState = initialGlobalState.window;

const Component = () => {
  const { breakpoints, devices, window, is } = useGrace();

  // is.above.breakpoint
  const isAboveBreakpointInvalid = is.above.breakpoint('invalid');
  const isAboveBreakpointSm = is.above.breakpoint('sm');
  const isAboveBreakpointMd = is.above.breakpoint('md');
  const isAboveBreakpointLg = is.above.breakpoint('lg');

  // is.below.breakpoint
  const isBelowBreakpointInvalid = is.below.breakpoint('invalid');
  const isBelowBreakpointSm = is.below.breakpoint('sm');
  const isBelowBreakpointMd = is.below.breakpoint('md');
  const isBelowBreakpointLg = is.below.breakpoint('lg');

  // is.current.breakpoint
  const isCurrentBreakpointInvalid = is.current.breakpoint('invalid');
  const isCurrentBreakpointSm = is.current.breakpoint('sm');
  const isCurrentBreakpointMd = is.current.breakpoint('md');
  const isCurrentBreakpointLg = is.current.breakpoint('lg');

  // is.device
  const isDeviceInvalid = is.device('invalid');
  const isDeviceMobile = is.device('mobile');
  const isDeviceTablet = is.device('tablet');
  const isDeviceDesktop = is.device('desktop');
  const isDeviceUnknown = is.device('unknown');
  const isDeviceAndroid = is.device('android');

  // is.mobile
  const isMobile = is.mobile();

  // is.tablet
  const isTablet = is.tablet();

  // is.desktop
  const isDesktop = is.desktop();

  // is.above.window.width
  const isAbove1000pxWindowWidth = is.above.window.width('1000px');

  // is.below.window.width
  const isBelow1000pxWindowWidth = is.below.window.width('1000px');

  // is.current.window.width
  const isCurrent1000pxWindowWidth = is.current.window.width('1000px');

  // is.above.window.height
  const isAbove1000pxWindowHeight = is.above.window.height('1000px');

  // is.below.window.height
  const isBelow1000pxWindowHeight = is.below.window.height('1000px');

  // is.current.window.height
  const isCurrent1000pxWindowHeight = is.current.window.height('1000px');

  // is.current.window.orientation
  const isCurrentWindowOrientationPortrait = is.current.window.orientation('portrait');
  const isCurrentWindowOrientationLandscape = is.current.window.orientation('landscape');

  // is.current.window.portrait
  const isCurrentWindowPortrait = is.current.window.portrait();

  // is.current.window.landscape
  const isCurrentWindowLandscape = is.current.window.landscape();

  return (
    <>
      <p id="breakpoints">{JSON.stringify(breakpoints)}</p>
      <p id="devices">{JSON.stringify(devices)}</p>
      <p id="window">{JSON.stringify(window)}</p>
      <p id="isAboveBreakpointInvalid">{JSON.stringify(isAboveBreakpointInvalid)}</p>
      <p id="isAboveBreakpointSm">{JSON.stringify(isAboveBreakpointSm)}</p>
      <p id="isAboveBreakpointMd">{JSON.stringify(isAboveBreakpointMd)}</p>
      <p id="isAboveBreakpointLg">{JSON.stringify(isAboveBreakpointLg)}</p>
      <p id="isBelowBreakpointInvalid">{JSON.stringify(isBelowBreakpointInvalid)}</p>
      <p id="isBelowBreakpointSm">{JSON.stringify(isBelowBreakpointSm)}</p>
      <p id="isBelowBreakpointMd">{JSON.stringify(isBelowBreakpointMd)}</p>
      <p id="isBelowBreakpointLg">{JSON.stringify(isBelowBreakpointLg)}</p>
      <p id="isCurrentBreakpointInvalid">{JSON.stringify(isCurrentBreakpointInvalid)}</p>
      <p id="isCurrentBreakpointSm">{JSON.stringify(isCurrentBreakpointSm)}</p>
      <p id="isCurrentBreakpointMd">{JSON.stringify(isCurrentBreakpointMd)}</p>
      <p id="isCurrentBreakpointLg">{JSON.stringify(isCurrentBreakpointLg)}</p>
      <p id="isDeviceInvalid">{JSON.stringify(isDeviceInvalid)}</p>
      <p id="isDeviceMobile">{JSON.stringify(isDeviceMobile)}</p>
      <p id="isDeviceTablet">{JSON.stringify(isDeviceTablet)}</p>
      <p id="isDeviceDesktop">{JSON.stringify(isDeviceDesktop)}</p>
      <p id="isDeviceUnknown">{JSON.stringify(isDeviceUnknown)}</p>
      <p id="isDeviceAndroid">{JSON.stringify(isDeviceAndroid)}</p>
      <p id="isMobile">{JSON.stringify(isMobile)}</p>
      <p id="isTablet">{JSON.stringify(isTablet)}</p>
      <p id="isDesktop">{JSON.stringify(isDesktop)}</p>
      <p id="isAbove1000pxWindowWidth">{JSON.stringify(isAbove1000pxWindowWidth)}</p>
      <p id="isBelow1000pxWindowWidth">{JSON.stringify(isBelow1000pxWindowWidth)}</p>
      <p id="isCurrent1000pxWindowWidth">{JSON.stringify(isCurrent1000pxWindowWidth)}</p>
      <p id="isAbove1000pxWindowHeight">{JSON.stringify(isAbove1000pxWindowHeight)}</p>
      <p id="isBelow1000pxWindowHeight">{JSON.stringify(isBelow1000pxWindowHeight)}</p>
      <p id="isCurrent1000pxWindowHeight">{JSON.stringify(isCurrent1000pxWindowHeight)}</p>
      <p id="isCurrentWindowOrientationPortrait">{JSON.stringify(isCurrentWindowOrientationPortrait)}</p>
      <p id="isCurrentWindowOrientationLandscape">{JSON.stringify(isCurrentWindowOrientationLandscape)}</p>
      <p id="isCurrentWindowPortrait">{JSON.stringify(isCurrentWindowPortrait)}</p>
      <p id="isCurrentWindowLandscape">{JSON.stringify(isCurrentWindowLandscape)}</p>
    </>
  );
};

describe('hooks', () => {
  const jsonStringify = JSON.stringify;
  const replacer = (_key: string, value: any) => (typeof value === 'undefined' ? 'undefined' : value);

  beforeAll(() => {
    // Override JSON.stringify function with custom replacer to print undefined values to make assertions against
    JSON.stringify = (value: any, _replacer: any, space?: string | number) => jsonStringify(value, replacer, space);
  });

  afterAll(() => {
    JSON.stringify = jsonStringify;
  });

  const mountComponentWithUseGraceHook = (props?: GraceProviderProps) => {
    return mount(<Component />, {
      wrappingComponent: GraceProvider,
      wrappingComponentProps: props ? props : {}
    });
  };

  const expectUseGraceHookReturns = (props: {
    wrapper: ReactWrapper;
    id: string;
    expected: Breakpoints | Device[] | WindowState | undefined | boolean;
  }) => {
    const { wrapper, id, expected } = props;

    const innerHtml: string = wrapper.find(`#${id}`).childAt(0).html();

    expect(innerHtml).toBe(JSON.stringify(expected));
  };

  describe('useGrace', () => {
    describe('breakpoints', () => {
      test('returns empty breakpoints when breakpoints are empty', () => {
        // given/when
        const wrapper = mountComponentWithUseGraceHook();

        // then
        const id = 'breakpoints';
        const expected = {};
        expectUseGraceHookReturns({ wrapper, id, expected });
      });

      test('returns breakpoints when breakpoints are NOT empty', () => {
        // given
        const breakpoints: Breakpoints = defaultBreakpoints;

        // when
        const wrapper = mountComponentWithUseGraceHook({ breakpoints });

        // then
        const id = 'breakpoints';
        const expected = defaultBreakpoints;
        expectUseGraceHookReturns({ wrapper, id, expected });
      });
    });

    describe('devices', () => {
      test('returns unknwon device when device is unknown', () => {
        // given/when
        const wrapper = mountComponentWithUseGraceHook();

        // then
        const id = 'devices';
        const expected: Device[] = ['unknown'];
        expectUseGraceHookReturns({ wrapper, id, expected });
      });

      test('returns mobile device when device is mobile', () => {
        // given
        const devices: DevicesState = { ...defaultDevices, unknown: false, mobile: true };

        // when
        const wrapper = mountComponentWithUseGraceHook({ devices });

        // then
        const id = 'devices';
        const expected: Device[] = ['mobile'];
        expectUseGraceHookReturns({ wrapper, id, expected });
      });

      test('returns tablet device when device is tablet', () => {
        // given
        const devices: DevicesState = { ...defaultDevices, unknown: false, tablet: true };

        // when
        const wrapper = mountComponentWithUseGraceHook({ devices });

        // then
        const id = 'devices';
        const expected: Device[] = ['tablet'];
        expectUseGraceHookReturns({ wrapper, id, expected });
      });

      test('returns desktop device when device is desktop', () => {
        // given
        const devices: DevicesState = { ...defaultDevices, unknown: false, desktop: true };

        // when
        const wrapper = mountComponentWithUseGraceHook({ devices });

        // then
        const id = 'devices';
        const expected: Device[] = ['desktop'];
        expectUseGraceHookReturns({ wrapper, id, expected });
      });

      test('returns custom android device when device is android', () => {
        // given
        const devices: DevicesState = { ...defaultDevices, unknown: false, android: true };

        // when
        const wrapper = mountComponentWithUseGraceHook({ devices });

        // then
        const id = 'devices';
        const expected: Device[] = ['android'];
        expectUseGraceHookReturns({ wrapper, id, expected });
      });
    });

    describe('window', () => {
      test('returns initial window state when window is NOT set', () => {
        // given
        const window: WindowState = defaultWindow;

        // when
        const wrapper = mountComponentWithUseGraceHook({ window });

        // then
        const id = 'window';
        const expected: WindowState = window;
        expectUseGraceHookReturns({ wrapper, id, expected });
      });

      test('returns updated window width when widnow width is updated', () => {
        // given
        const window: WindowState = {
          ...defaultWindow,
          width: '1000px'
        };

        // when
        const wrapper = mountComponentWithUseGraceHook({ window });

        // then
        const id = 'window';
        const expected: WindowState = window;
        expectUseGraceHookReturns({ wrapper, id, expected });
      });

      test('returns updated window height when widnow height is updated', () => {
        // given
        const window: WindowState = {
          ...defaultWindow,
          height: '1000px'
        };

        // when
        const wrapper = mountComponentWithUseGraceHook({ window });

        // then
        const id = 'window';
        const expected: WindowState = window;
        expectUseGraceHookReturns({ wrapper, id, expected });
      });

      test('returns updated window orientation when widnow orientation is updated', () => {
        // given
        const window: WindowState = {
          ...defaultWindow,
          orientation: 'landscape'
        };

        // when
        const wrapper = mountComponentWithUseGraceHook({ window });

        // then
        const id = 'window';
        const expected: WindowState = window;
        expectUseGraceHookReturns({ wrapper, id, expected });
      });
    });

    describe('is', () => {
      describe('above', () => {
        describe('breakpoint', () => {
          test('returns undefined for "invalid" breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '1000px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isAboveBreakpointInvalid';
            const expected: undefined | boolean = undefined;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns true for "sm" breakpoint when window width is above breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '501px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isAboveBreakpointSm';
            const expected: undefined | boolean = true;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns false for "sm" breakpoint when window width is equal to breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '500px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isAboveBreakpointSm';
            const expected: undefined | boolean = false;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns true for "md" breakpoint when window width is above breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '1001px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isAboveBreakpointMd';
            const expected: undefined | boolean = true;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns false for "md" breakpoint when window width is equal to breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '1000px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isAboveBreakpointMd';
            const expected: undefined | boolean = false;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns false for "md" breakpoint when window width is below breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '999px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isAboveBreakpointMd';
            const expected: undefined | boolean = false;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns false for "lg" breakpoint when window width is equal to breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '1001px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isAboveBreakpointLg';
            const expected: undefined | boolean = false;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns false for "lg" breakpoint when window width is below breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '999px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isAboveBreakpointLg';
            const expected: undefined | boolean = false;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });
        });

        describe('window', () => {
          describe('width', () => {
            test('returns false when window width is below width', () => {
              // given
              const window: WindowState = { ...defaultWindow, width: '999px' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isAbove1000pxWindowWidth';
              const expected: undefined | boolean = false;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });

            test('returns false when window width is equal to width', () => {
              // given
              const window: WindowState = { ...defaultWindow, width: '1000px' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isAbove1000pxWindowWidth';
              const expected: undefined | boolean = false;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });

            test('returns true when window width is above width', () => {
              // given
              const window: WindowState = { ...defaultWindow, width: '1001px' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isAbove1000pxWindowWidth';
              const expected: undefined | boolean = true;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });
          });

          describe('height', () => {
            test('returns false when window height is below height', () => {
              // given
              const window: WindowState = { ...defaultWindow, height: '999px' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isAbove1000pxWindowHeight';
              const expected: undefined | boolean = false;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });

            test('returns false when window height is equal to height', () => {
              // given
              const window: WindowState = { ...defaultWindow, height: '1000px' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isAbove1000pxWindowHeight';
              const expected: undefined | boolean = false;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });

            test('returns true when window height is above height', () => {
              // given
              const window: WindowState = { ...defaultWindow, height: '1001px' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isAbove1000pxWindowHeight';
              const expected: undefined | boolean = true;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });
          });
        });
      });

      describe('below', () => {
        describe('breakpoint', () => {
          test('returns undefined for "invalid" breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '1000px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isBelowBreakpointInvalid';
            const expected: undefined | boolean = undefined;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns false for "sm" breakpoint when window width is above breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '501px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isBelowBreakpointSm';
            const expected: undefined | boolean = false;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns false for "sm" breakpoint when window width is equal to breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '500px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isBelowBreakpointSm';
            const expected: undefined | boolean = false;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns false for "md" breakpoint when window width is above breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '1001px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isBelowBreakpointMd';
            const expected: undefined | boolean = false;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns false for "md" breakpoint when window width is equal to breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '1000px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isBelowBreakpointMd';
            const expected: undefined | boolean = false;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns true for "md" breakpoint when window width is below breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '499px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isBelowBreakpointMd';
            const expected: undefined | boolean = true;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns false for "lg" breakpoint when window width is equal to breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '1001px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isBelowBreakpointLg';
            const expected: undefined | boolean = false;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns true for "lg" breakpoint when window width is below breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '999px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isBelowBreakpointLg';
            const expected: undefined | boolean = true;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });
        });

        describe('window', () => {
          describe('width', () => {
            test('returns true when window width is below width', () => {
              // given
              const window: WindowState = { ...defaultWindow, width: '999px' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isBelow1000pxWindowWidth';
              const expected: undefined | boolean = true;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });

            test('returns false when window width is equal to width', () => {
              // given
              const window: WindowState = { ...defaultWindow, width: '1000px' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isBelow1000pxWindowWidth';
              const expected: undefined | boolean = false;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });

            test('returns false when window width is above width', () => {
              // given
              const window: WindowState = { ...defaultWindow, width: '1001px' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isBelow1000pxWindowWidth';
              const expected: undefined | boolean = false;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });
          });

          describe('height', () => {
            test('returns true when window height is below height', () => {
              // given
              const window: WindowState = { ...defaultWindow, height: '999px' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isBelow1000pxWindowHeight';
              const expected: undefined | boolean = true;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });

            test('returns false when window height is equal to height', () => {
              // given
              const window: WindowState = { ...defaultWindow, height: '1000px' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isBelow1000pxWindowHeight';
              const expected: undefined | boolean = false;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });

            test('returns false when window height is above height', () => {
              // given
              const window: WindowState = { ...defaultWindow, height: '1001px' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isBelow1000pxWindowHeight';
              const expected: undefined | boolean = false;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });
          });
        });
      });

      describe('current', () => {
        describe('breakpoint', () => {
          test('returns undefined for "invalid" breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '1000px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isCurrentBreakpointInvalid';
            const expected: undefined | boolean = undefined;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns false for "sm" breakpoint when window width is above breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '501px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isCurrentBreakpointSm';
            const expected: undefined | boolean = false;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns true for "sm" breakpoint when window width is equal to breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '500px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isCurrentBreakpointSm';
            const expected: undefined | boolean = true;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns false for "md" breakpoint when window width is above breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '1001px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isCurrentBreakpointMd';
            const expected: undefined | boolean = false;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns true for "md" breakpoint when window width is equal to breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '1000px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isCurrentBreakpointMd';
            const expected: undefined | boolean = true;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns false for "md" breakpoint when window width is below breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '499px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isCurrentBreakpointMd';
            const expected: undefined | boolean = false;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns true for "lg" breakpoint when window width is equal to breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '1001px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isCurrentBreakpointLg';
            const expected: undefined | boolean = true;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });

          test('returns false for "lg" breakpoint when window width is below breakpoint', () => {
            // given
            const breakpoints: Breakpoints = defaultBreakpoints;
            const window: WindowState = { ...defaultWindow, width: '999px' };

            // when
            const wrapper = mountComponentWithUseGraceHook({ breakpoints, window });

            // then
            const id = 'isCurrentBreakpointLg';
            const expected: undefined | boolean = false;
            expectUseGraceHookReturns({ wrapper, id, expected });
          });
        });

        describe('window', () => {
          describe('width', () => {
            test('returns false when window width is below width', () => {
              // given
              const window: WindowState = { ...defaultWindow, width: '999px' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isCurrent1000pxWindowWidth';
              const expected: undefined | boolean = false;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });

            test('returns true when window width is equal to width', () => {
              // given
              const window: WindowState = { ...defaultWindow, width: '1000px' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isCurrent1000pxWindowWidth';
              const expected: undefined | boolean = true;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });

            test('returns false when window width is above width', () => {
              // given
              const window: WindowState = { ...defaultWindow, width: '1001px' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isCurrent1000pxWindowWidth';
              const expected: undefined | boolean = false;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });
          });

          describe('height', () => {
            test('returns false when window height is below height', () => {
              // given
              const window: WindowState = { ...defaultWindow, height: '999px' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isCurrent1000pxWindowHeight';
              const expected: undefined | boolean = false;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });

            test('returns true when window height is equal to height', () => {
              // given
              const window: WindowState = { ...defaultWindow, height: '1000px' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isCurrent1000pxWindowHeight';
              const expected: undefined | boolean = true;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });

            test('returns false when window height is above height', () => {
              // given
              const window: WindowState = { ...defaultWindow, height: '1001px' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isCurrent1000pxWindowHeight';
              const expected: undefined | boolean = false;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });
          });

          describe('orientation', () => {
            test('returns true when orientation is portrait and window orientation is portrait', () => {
              // given
              const window: WindowState = { ...defaultWindow, orientation: 'portrait' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isCurrentWindowOrientationPortrait';
              const expected: undefined | boolean = true;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });

            test('returns false when orientation is portrait and window orientation is landscape', () => {
              // given
              const window: WindowState = { ...defaultWindow, orientation: 'landscape' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isCurrentWindowOrientationPortrait';
              const expected: undefined | boolean = false;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });

            test('returns true when orientation is landscape and window orientation is landscape', () => {
              // given
              const window: WindowState = { ...defaultWindow, orientation: 'landscape' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isCurrentWindowOrientationLandscape';
              const expected: undefined | boolean = true;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });

            test('returns false when orientation is portrait and window orientation is portrait', () => {
              // given
              const window: WindowState = { ...defaultWindow, orientation: 'portrait' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isCurrentWindowOrientationLandscape';
              const expected: undefined | boolean = false;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });
          });

          describe('portrait', () => {
            test('returns true when window orientation is portrait', () => {
              // given
              const window: WindowState = { ...defaultWindow, orientation: 'portrait' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isCurrentWindowPortrait';
              const expected: undefined | boolean = true;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });

            test('returns false when window orientation is landscape', () => {
              // given
              const window: WindowState = { ...defaultWindow, orientation: 'landscape' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isCurrentWindowPortrait';
              const expected: undefined | boolean = false;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });
          });

          describe('landscape', () => {
            test('returns true when window orientation is landscape', () => {
              // given
              const window: WindowState = { ...defaultWindow, orientation: 'landscape' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isCurrentWindowLandscape';
              const expected: undefined | boolean = true;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });

            test('returns false when window orientation is portrait', () => {
              // given
              const window: WindowState = { ...defaultWindow, orientation: 'portrait' };

              // when
              const wrapper = mountComponentWithUseGraceHook({ window });

              // then
              const id = 'isCurrentWindowLandscape';
              const expected: undefined | boolean = false;
              expectUseGraceHookReturns({ wrapper, id, expected });
            });
          });
        });
      });

      describe('device', () => {
        test('returns undefined for "invalid" when there is no "invalid" device', () => {
          // given
          const devices: DevicesState = defaultDevices;

          // when
          const wrapper = mountComponentWithUseGraceHook({ devices });

          // then
          const id = 'isDeviceInvalid';
          const expected: undefined | boolean = undefined;
          expectUseGraceHookReturns({ wrapper, id, expected });
        });

        test('returns true for "mobile" when device is "mobile"', () => {
          // given
          const devices: DevicesState = { ...defaultDevices, unknown: false, mobile: true };

          // when
          const wrapper = mountComponentWithUseGraceHook({ devices });

          // then
          const id = 'isDeviceMobile';
          const expected: undefined | boolean = true;
          expectUseGraceHookReturns({ wrapper, id, expected });
        });

        test('returns false for "mobile" when device is NOT "mobile"', () => {
          // given
          const devices: DevicesState = defaultDevices;

          // when
          const wrapper = mountComponentWithUseGraceHook({ devices });

          // then
          const id = 'isDeviceMobile';
          const expected: undefined | boolean = false;
          expectUseGraceHookReturns({ wrapper, id, expected });
        });

        test('returns true for "tablet" when device is "tablet"', () => {
          // given
          const devices: DevicesState = { ...defaultDevices, unknown: false, tablet: true };

          // when
          const wrapper = mountComponentWithUseGraceHook({ devices });

          // then
          const id = 'isDeviceTablet';
          const expected: undefined | boolean = true;
          expectUseGraceHookReturns({ wrapper, id, expected });
        });

        test('returns false for "tablet" when device is NOT "tablet"', () => {
          // given
          const devices: DevicesState = defaultDevices;

          // when
          const wrapper = mountComponentWithUseGraceHook({ devices });

          // then
          const id = 'isDeviceTablet';
          const expected: undefined | boolean = false;
          expectUseGraceHookReturns({ wrapper, id, expected });
        });

        test('returns true for "desktop" when device is "desktop"', () => {
          // given
          const devices: DevicesState = { ...defaultDevices, desktop: true };

          // when
          const wrapper = mountComponentWithUseGraceHook({ devices });

          // then
          const id = 'isDeviceDesktop';
          const expected: undefined | boolean = true;
          expectUseGraceHookReturns({ wrapper, id, expected });
        });

        test('returns false for "desktop" when device is NOT "desktop"', () => {
          // given
          const devices: DevicesState = defaultDevices;

          // when
          const wrapper = mountComponentWithUseGraceHook({ devices });

          // then
          const id = 'isDeviceDesktop';
          const expected: undefined | boolean = false;
          expectUseGraceHookReturns({ wrapper, id, expected });
        });

        test('returns true for "unknown" when device is "unknown"', () => {
          // given
          const devices: DevicesState = defaultDevices;

          // when
          const wrapper = mountComponentWithUseGraceHook({ devices });

          // then
          const id = 'isDeviceUnknown';
          const expected: undefined | boolean = true;
          expectUseGraceHookReturns({ wrapper, id, expected });
        });

        test('returns false for "unknown" when device is NOT "unknown"', () => {
          // given
          const devices: DevicesState = { ...defaultDevices, unknown: false, mobile: true };

          // when
          const wrapper = mountComponentWithUseGraceHook({ devices });

          // then
          const id = 'isDeviceDesktop';
          const expected: undefined | boolean = false;
          expectUseGraceHookReturns({ wrapper, id, expected });
        });

        test('returns false for "android" when device is NOT "android"', () => {
          // given
          const devices: DevicesState = { ...defaultDevices, unknown: false, android: false, desktop: true };

          // when
          const wrapper = mountComponentWithUseGraceHook({ devices });

          // then
          const id = 'isDeviceAndroid';
          const expected: undefined | boolean = false;
          expectUseGraceHookReturns({ wrapper, id, expected });
        });

        test('returns true for "android" when device is "android"', () => {
          // given
          const devices: DevicesState = { ...defaultDevices, unknown: false, android: true };

          // when
          const wrapper = mountComponentWithUseGraceHook({ devices });

          // then
          const id = 'isDeviceAndroid';
          const expected: undefined | boolean = true;
          expectUseGraceHookReturns({ wrapper, id, expected });
        });
      });

      describe('mobile', () => {
        test('returns true when device is "mobile"', () => {
          // given
          const devices: DevicesState = { ...defaultDevices, unknown: false, mobile: true };

          // when
          const wrapper = mountComponentWithUseGraceHook({ devices });

          // then
          const id = 'isMobile';
          const expected: undefined | boolean = true;
          expectUseGraceHookReturns({ wrapper, id, expected });
        });

        test('returns false when device is NOT "mobile"', () => {
          // given
          const devices: DevicesState = { ...defaultDevices, unknown: false, mobile: false, desktop: true };

          // when
          const wrapper = mountComponentWithUseGraceHook({ devices });

          // then
          const id = 'isMobile';
          const expected: undefined | boolean = false;
          expectUseGraceHookReturns({ wrapper, id, expected });
        });
      });

      describe('tablet', () => {
        test('returns true when device is "tablet"', () => {
          // given
          const devices: DevicesState = { ...defaultDevices, unknown: false, tablet: true };

          // when
          const wrapper = mountComponentWithUseGraceHook({ devices });

          // then
          const id = 'isTablet';
          const expected: undefined | boolean = true;
          expectUseGraceHookReturns({ wrapper, id, expected });
        });

        test('returns false when device is NOT "tablet"', () => {
          // given
          const devices: DevicesState = { ...defaultDevices, unknown: false, tablet: false, desktop: true };

          // when
          const wrapper = mountComponentWithUseGraceHook({ devices });

          // then
          const id = 'isTablet';
          const expected: undefined | boolean = false;
          expectUseGraceHookReturns({ wrapper, id, expected });
        });
      });

      describe('desktop', () => {
        test('returns true when device is "desktop"', () => {
          // given
          const devices: DevicesState = { ...defaultDevices, unknown: false, desktop: true };

          // when
          const wrapper = mountComponentWithUseGraceHook({ devices });

          // then
          const id = 'isDesktop';
          const expected: undefined | boolean = true;
          expectUseGraceHookReturns({ wrapper, id, expected });
        });

        test('returns false when device is NOT "desktop"', () => {
          // given
          const devices: DevicesState = { ...defaultDevices, unknown: false, desktop: false, mobile: true };

          // when
          const wrapper = mountComponentWithUseGraceHook({ devices });

          // then
          const id = 'isDesktop';
          const expected: undefined | boolean = false;
          expectUseGraceHookReturns({ wrapper, id, expected });
        });
      });
    });
  });
});
