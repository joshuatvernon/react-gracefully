import { Breakpoints, Device } from '../../stores';

export interface ShowProps {
  /**
   * @example
   * ```react
   * <Show devices={['mobile']}>
   *   <h2>Mobile Title</h2>
   * </Show>
   * <Show devices={['tablet', 'desktop']}>
   *   <h1>Tablet or Desktop Title</h1>
   * </Show>
   * ```
   *
   * @description
   * devices is a list of devices that should be shown
   */
  devices: Device[];
  /**
   * @example
   * ```react
   * <Show breakpoints={['sm']}>
   *   <h2>Small Title</h2>
   * </Show>
   * <Show breakpoints={['md', 'lg']}>
   *   <h1>Medium or Large Title</h1>
   * </Show>
   * ```
   *
   * @description
   * breakpoints is a list of breakpoints that should be shown
   */
  breakpoints: string[];
}

export interface ShowStyleProps {
  shownBreakpoints: string[];
  breakpoints: Breakpoints;
}
