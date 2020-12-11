import { Breakpoints, Device, Orientation } from '../../stores';

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
   * Optional list of devices that should be shown
   *
   * If list of devices prop is passed breakpoints prop will be ignored
   */
  devices?: Device[];
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
   * Optional list of breakpoints that should be shown
   *
   * If list of devices prop is passed breakpoints prop will be ignored
   */
  breakpoints?: string[];
  /**
   * @example
   * ```react
   * <Show orientation={Orientation.Portait}>
   *   <h2>Portrait Title</h2>
   * </Show>
   * <Show orientation={Orientation.Landscape}>
   *   <h1>Landscape Title</h1>
   * </Show>
   * ```
   *
   * @description
   * Optional orienation that should be shown
   */
  orientation?: Orientation;
}

export interface ShowStyleProps {
  breakpoints: Breakpoints;
  shownBreakpoints: string[];
  shownOrientation?: Orientation;
}
