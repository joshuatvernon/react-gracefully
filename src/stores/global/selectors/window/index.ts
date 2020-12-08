import toPx from 'to-px';

import { GlobalState, WindowOrientationState } from '../../types';

// width

export const getWindowWidth = (state: GlobalState): string => state.window.width;

export const isWindowWidthEqual = (state: GlobalState, width: string): boolean =>
  toPx(width) === toPx(state.window.width);

export const isWindowWidthLessThan = (state: GlobalState, width: string): boolean =>
  toPx(width) < toPx(state.window.width);

export const isWindowWidthGreaterThan = (state: GlobalState, width: string): boolean =>
  toPx(width) > toPx(state.window.width);

// height

export const getWindowHeight = (state: GlobalState): string => state.window.height;

export const isWindowHeightEqual = (state: GlobalState, height: string): boolean =>
  toPx(height) === toPx(state.window.height);

export const isWindowHeightLessThan = (state: GlobalState, height: string): boolean =>
  toPx(height) < toPx(state.window.height);

export const isWindowHeightGreaterThan = (state: GlobalState, height: string): boolean =>
  toPx(height) > toPx(state.window.height);

// orientation

export const getWindowOrientation = (state: GlobalState): WindowOrientationState => state.window.orientation;

export const isWindowOrientationEqual = (state: GlobalState, orientation: WindowOrientationState): boolean =>
  orientation === state.window.orientation;

export const globalWindowSelectors = {
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
