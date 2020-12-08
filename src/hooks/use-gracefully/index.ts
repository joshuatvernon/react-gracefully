import keys from 'lodash.keys';
import pickBy from 'lodash.pickby';

import { configSelectors, globalSelectors, useConfigStore, useGlobalStore, WindowOrientationState } from '../../stores';
import { GracefulState } from './types';

/**
 * @example
 * const { is, breakpoints, devices, window } = useGracefully();
 * const isMobile = is.mobile();
 * const isAboveMedium = is.above.breakpoint('md');
 * const isWindowHeightBelow500px = is.below.window.height('500px');
 * const isLandscape = is.current.window.landscape();
 *
 * console.log(breakpoints); // { sm: { min: undefined, max: '500px' }, md: { min: '501px', max: '1000px' }, lg: { min: '1001px', max: undefined } }
 * console.log(devices); // ['mobile', 'android']
 * console.log(window); // { width: '1000px', height: '1000px', orientation: 'portrait' }
 *
 * @description
 * React hook used to get details about device, breapoints and/or window sizes or orientation
 *
 * @returns {Object} gracefulState - state used to device, breakpoint and window details
 */
export const useGracefully = (): GracefulState => {
  const [globalState] = useGlobalStore();

  const {
    isDevice,
    isMobile,
    isTablet,
    isDesktop,
    getWindowWidth,
    isWindowWidthEqual,
    isWindowWidthLessThan,
    isWindowWidthGreaterThan,
    getWindowHeight,
    isWindowHeightEqual,
    isWindowHeightLessThan,
    isWindowHeightGreaterThan,
    getWindowOrientation,
    isWindowOrientationEqual,
    getDevicesState
  } = globalSelectors;

  const width = getWindowWidth(globalState);
  const height = getWindowHeight(globalState);
  const orientation = getWindowOrientation(globalState);
  const window = {
    width,
    height,
    orientation
  };
  const devices = keys(pickBy(getDevicesState(globalState)));

  const [configState] = useConfigStore();

  const { getBreakpoints, isCurrentBreakpoint, isAboveBreakpoint, isBelowBreakpoint } = configSelectors;

  const breakpoints = getBreakpoints(configState);

  return {
    breakpoints,
    devices,
    window,
    is: {
      above: {
        breakpoint: (breakpoint: string) => isAboveBreakpoint(configState, breakpoint, width),
        window: {
          width: (units: string) => isWindowWidthGreaterThan(globalState, units),
          height: (units: string) => isWindowHeightGreaterThan(globalState, units)
        }
      },
      below: {
        breakpoint: (breakpoint: string) => isBelowBreakpoint(configState, breakpoint, width),
        window: {
          width: (units: string) => isWindowWidthLessThan(globalState, units),
          height: (units: string) => isWindowHeightLessThan(globalState, units)
        }
      },
      current: {
        breakpoint: (breakpoint: string) => isCurrentBreakpoint(configState, breakpoint, width),
        window: {
          width: (units: string) => isWindowWidthEqual(globalState, units),
          height: (units: string) => isWindowHeightEqual(globalState, units),
          orientation: (orientation: WindowOrientationState) => isWindowOrientationEqual(globalState, orientation),
          portrait: () => isWindowOrientationEqual(globalState, WindowOrientationState.Portait),
          landscape: () => isWindowOrientationEqual(globalState, WindowOrientationState.Landscape)
        }
      },
      device: (device: string) => isDevice(globalState, device),
      mobile: () => isMobile(globalState),
      tablet: () => isTablet(globalState),
      desktop: () => isDesktop(globalState)
    }
  };
};

export * from './types';
