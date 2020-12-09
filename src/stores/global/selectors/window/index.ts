import toPx from 'to-px';

import { GlobalState, WindowOrientationState, WindowState } from '../../types';

export const getWindowState = (state: GlobalState): WindowState => state.window;

export const getWindowWidth = (state: GlobalState): string => state.window.width;

export const isWindowWidthEqual = (state: GlobalState, width: string): boolean =>
  toPx(state.window.width) === toPx(width);

export const isWindowWidthLessThan = (state: GlobalState, width: string): boolean =>
  toPx(state.window.width) < toPx(width);

export const isWindowWidthGreaterThan = (state: GlobalState, width: string): boolean =>
  toPx(state.window.width) > toPx(width);

export const getWindowHeight = (state: GlobalState): string => state.window.height;

export const isWindowHeightEqual = (state: GlobalState, height: string): boolean =>
  toPx(state.window.height) === toPx(height);

export const isWindowHeightLessThan = (state: GlobalState, height: string): boolean =>
  toPx(state.window.height) < toPx(height);

export const isWindowHeightGreaterThan = (state: GlobalState, height: string): boolean =>
  toPx(state.window.height) > toPx(height);

export const getWindowOrientation = (state: GlobalState): WindowOrientationState => state.window.orientation;

export const isWindowOrientationEqual = (state: GlobalState, orientation: WindowOrientationState): boolean =>
  orientation === state.window.orientation;

export const globalWindowSelectors = {
  getWindowState,
  getWindowWidth,
  isWindowWidthEqual,
  isWindowWidthLessThan,
  isWindowWidthGreaterThan,
  getWindowHeight,
  isWindowHeightEqual,
  isWindowHeightLessThan,
  isWindowHeightGreaterThan,
  getWindowOrientation,
  isWindowOrientationEqual
};
