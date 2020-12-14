import { Breakpoints, Device, Orientation, WindowState } from '../../stores';

export interface UseGraceStateIsFunctions {
  above: {
    /**
     * @example
     * const { is } = useGrace();
     * const isAboveSmall = is.above.breakpoint('sm');
     *
     * @description
     * Looks up breakpoint and returns:
     * - undefined: if breakpoint NOT found
     * - true: if window width is above breakpoint.max
     * - false: if window width is below or equal to breakpoint.max
     *
     * @param {string} breakpoint - breakpoint key to compare against window width.
     *
     * @returns {(undefined|boolean)} isAboveBreakpoint - whether or not window width is above breakpoint.
     */
    breakpoint: (breakpoint: string) => undefined | boolean;
    window: {
      /**
       * @example
       * const { is } = useGrace();
       * const isAbove500px = is.above.window.width('500px');
       * const isAbove50em = is.above.window.width('50em');
       *
       * @description
       * Gets window width and returns:
       * - true: if window width is above units
       * - false: if window width is below or equal to units
       *
       * @param {string} units - units to compare against window width.
       *
       * @returns {boolean} isAboveWindowWidth - whether or not window width is above units.
       */
      width: (units: string) => boolean;
      /**
       * @example
       * const { is } = useGrace();
       * const isAbove500px = is.above.window.height('500px');
       * const isAbove50em = is.above.window.height('50em');
       *
       * @description
       * Gets window height and returns:
       * - true: if window height is above units
       * - false: if window height is below or equal to units
       *
       * @param {string} units - units to compare against window height.
       *
       * @returns {boolean} isAboveWindowHeight - whether or not window height is above units.
       */
      height: (units: string) => boolean;
    };
  };
  below: {
    /**
     * @example
     * const { is } = useGrace();
     * const isBelowLarge = is.above.breakpoint('lg');
     *
     * @description
     * Looks up breakpoint and returns:
     * - undefined: if breakpoint NOT found
     * - true: if window width is below breakpoint.min
     * - false: if window width is above or equal to breakpoint.min
     *
     * @param {string} breakpoint - breakpoint key to compare against window width.
     *
     * @returns {(undefined|boolean)} isBelowBreakpoint - whether or not window width is below breakpoint.
     */
    breakpoint: (breakpoint: string) => undefined | boolean;
    window: {
      /**
       * @example
       * const { is } = useGrace();
       * const isBelow500px = is.below.window.width('500px');
       * const isBelow50em = is.below.window.width('50em');
       *
       * @description
       * Gets window width and returns:
       * - true: if window width is below units
       * - false: if window width is above or equal to units
       *
       * @param {string} units - units to compare against window width.
       *
       * @returns {boolean} isBelowWindowWidth - whether or not window width is below units.
       */
      width: (units: string) => boolean;
      /**
       * @example
       * const { is } = useGrace();
       * const isBelow500px = is.below.window.height('500px');
       * const isBelow50em = is.below.window.height('50em');
       *
       * @description
       * Gets window height and returns:
       * - true: if window height is below units
       * - false: if window height is above or equal to units
       *
       * @param {string} units - units to compare against window height.
       *
       * @returns {boolean} isBelowWindowHeight - whether or not window height is below units.
       */
      height: (units: string) => boolean;
    };
  };
  current: {
    /**
     * @example
     * const { is } = useGrace();
     * const isMedium = is.current.breakpoint('md');
     *
     * @description
     * Looks up breakpoint and returns:
     * - undefined: if breakpoint NOT found
     * - true: if window width is above or equal to breakpoint.min AND below or equal to breakpoint.max
     * - false: if window width is below breakpoint.min OR above breakpoint.max
     *
     * @param {string} breakpoint - breakpoint key to compare against window width.
     *
     * @returns {(undefined|boolean)} isCurrentBreakpoint - whether or not window width is within current breakpoint.
     */
    breakpoint: (breakpoint: string) => undefined | boolean;
    window: {
      /**
       * @example
       * const { is } = useGrace();
       * const isCurrentWidth500px = is.current.window.width('500px');
       * const isCurrentWidth50em = is.current.window.width('50em');
       *
       * @description
       * Gets window width and returns:
       * - true: if window width is currently equal to units
       * - false: if window width is above or below units
       *
       * @param {string} units - units to compare against window width.
       *
       * @returns {boolean} isCurrentWindowWidth - whether or not the current window width is equal to units.
       */
      width: (units: string) => boolean;
      /**
       * @example
       * const { is } = useGrace();
       * const isCurrentHeight500px = is.current.window.height('500px');
       * const isCurrentHeight50em = is.current.window.height('50em');
       *
       * @description
       * Gets window height and returns:
       * - true: if window height is currently equal to units
       * - false: if window height is above or below units
       *
       * @param {string} units - units to compare against window height.
       *
       * @returns {boolean} isCurrentWindowHeight - whether or not the current window height is equal to units.
       */
      height: (units: string) => boolean;
      /**
       * @example
       * const { is } = useGrace();
       * const isPortrait = is.current.window.orientation('portrait');
       * const isLandscape = is.current.window.orientation('landscape');
       *
       * @description
       * Gets orientation and returns:
       * - true: if orientation is the same
       * - false: if orientation is different
       *
       * @param {string} orientation - orientation to compare against current orientation.
       *
       * @returns {boolean} isCurrentOrientation - whether or not the current orientation is equal to orientation.
       */
      orientation: (orientation: 'portrait' | 'landscape' | Orientation) => boolean;
      /**
       * @example
       * const { is } = useGrace();
       * const isPortrait = is.current.window.portrait();
       *
       * @description
       * Gets orientation and returns:
       * - true: if orientation is portrait
       * - false: if orientation is landscape
       *
       * @returns {boolean} isCurrentOrientation - whether or not the current orientation is portrait.
       */
      portrait: () => boolean;
      /**
       * @example
       * const { is } = useGrace();
       * const isLandscape = is.current.window.landscape();
       *
       * @description
       * Gets orientation and returns:
       * - true: if orientation is landscape
       * - false: if orientation is portrait
       *
       * @returns {boolean} isCurrentOrientation - whether or not the current orientation is landscape.
       */
      landscape: () => boolean;
    };
  };
  /**
   * @example
   * const { is } = useGrace();
   * const isAndroid = is.device('android');
   * const isIOS = is.device('iOS');
   * const isSmartTV = is.device('smart-tv');
   *
   * @description
   * Gets device and returns:
   * - true: if device is the same
   * - false: if device is different
   * - undefined: if device has not been provided
   *
   * @param {string} device - device to compare against current device.
   *
   * @returns {boolean} isDevice - whether or not the current device is equal to device.
   */
  device: (device: string) => undefined | boolean;
  /**
   * @example
   * const { is } = useGrace();
   * const isMobile = is.mobile();
   *
   * @description
   * Gets device and returns:
   * - true: if device is mobile
   * - false: if device is NOT mobile
   *
   * @returns {boolean} isMobile - whether or not the current device is a mobile.
   */
  mobile: () => boolean;
  /**
   * @example
   * const { is } = useGrace();
   * const isTablet = is.tablet();
   *
   * @description
   * Gets device and returns:
   * - true: if device is tablet
   * - false: if device is NOT tablet
   *
   * @returns {boolean} isTablet - whether or not the current device is a tablet.
   */
  tablet: () => boolean;
  /**
   * @example
   * const { is } = useGrace();
   * const isDesktop = is.desktop();
   *
   * @description
   * Gets device and returns:
   * - true: if device is desktop
   * - false: if device is NOT desktop
   *
   * @returns {boolean} isDesktop - whether or not the current device is a desktop.
   */
  desktop: () => boolean;
}

export interface UseGraceState {
  /**
   * @example
   * const { is, breakpoints, devices, window } = useGrace();
   * console.log(breakpoints); // { sm: { min: undefined, max: '500px' }, md: { min: '501px', max: '1000px' }, lg: { min: '1001px', max: undefined } }
   *
   * @description
   * Returns currently configured breakpoints
   *
   * @returns {Object} breakpoints - currently configured breakpoints
   */
  breakpoints: Breakpoints;
  /**
   * @example
   * const { is, breakpoints, devices, window } = useGrace();
   * console.log(devices); // ['mobile', 'android']
   *
   * @description
   * Returns list of currently active devices
   *
   * @returns {Object} devices - currently active devices
   */
  devices: Device[];
  /**
   * @example
   * const { is, breakpoints, devices, window } = useGrace();
   * console.log(window); // { width: '1000px', height: '1000px', orientation: 'portrait' }
   *
   * @description
   * Returns current window sizes and orientation
   *
   * @returns {Object} windowState - current window sizes and orientation
   */
  window: WindowState;
  /**
   * @example
   * const { is } = useGrace();
   * const isMobile = is.mobile();
   * const isAboveMedium = is.above.breakpoint('md');
   * const isWindowHeightBelow500px = is.below.window.height('500px');
   * const isLandscape = is.current.window.landscape();
   *
   * @description
   * Collection of functions used to get details about device, breapoints and/or window sizes or orientation
   *
   * @returns {Object} is - collection of functions to get details about device, breakpoint and/or window sizes or orientation
   */
  is: UseGraceStateIsFunctions;
}
