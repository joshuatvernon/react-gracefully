import { Breakpoints, Device } from '../../stores';

export interface HideProps {
  /**
   * @example
   * ```react
   * <Hide devices={['mobile']}>
   *   <h1>Tablet or Desktop Title</h1>
   * </Hide>
   * <Hide devices={['tablet', 'desktop']}>
   *   <h2>Mobile Title</h2>
   * </Hide>
   * ```
   *
   * @description
   * devices is a list of devices that should be hidden
   */
  devices: Device[];
  /**
   * @example
   * ```react
   * <Hide breakpoints={['sm']}>
   *   <h1>Medium or Large Title</h1>
   * </Hide>
   * <Hide breakpoints={['md', 'lg']}>
   *   <h2>Small Title</h2>
   * </Hide>
   * ```
   *
   * @description
   * breakpoints is a list of breakpoints that should be hidden
   */
  breakpoints: string[];
}

export interface HideStyleProps {
  hiddenBreakpoints: string[];
  breakpoints: Breakpoints;
}
