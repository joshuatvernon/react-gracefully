import { Breakpoints, Device, Orientation } from '../../stores';

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
   * Optional list of devices that should be hidden
   *
   * If list of devices prop is passed breakpoints prop will be ignored
   */
  devices?: Device[];
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
   * Optional list of breakpoints that should be hidden
   *
   * If list of devices prop is passed breakpoints prop will be ignored
   */
  breakpoints?: string[];
  /**
   * @example
   * ```react
   * <Hide orientation={Orientation.Portait}>
   *   <h1>Landscape Title</h1>
   * </Hide>
   * <Hide orientation={Orientation.Landscape}>
   *   <h2>Portrait Title</h2>
   * </Hide>
   * ```
   *
   * @description
   * Optional orienation that should be hidden
   */
  orientation?: 'portrait' | 'landscape' | Orientation;
}

export interface HideStyleProps {
  breakpoints: Breakpoints;
  hiddenBreakpoints: string[];
  hiddenOrientation?: 'portrait' | 'landscape' | Orientation;
}
