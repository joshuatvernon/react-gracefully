import isNil from 'lodash.isnil';
import toPx from 'to-px';

import { Breakpoint, Breakpoints, ConfigState } from '../../types';

export const getBreakpoint = (state: ConfigState, breakpoint: string): undefined | Breakpoint =>
  state.breakpoints[breakpoint];

export const getBreakpoints = (state: ConfigState): Breakpoints => state.breakpoints;

export const isCurrentBreakpoint = (
  state: ConfigState,
  breakpointKey: string,
  windowWidth: string
): undefined | boolean => {
  const breakpoint = getBreakpoint(state, breakpointKey);
  if (!isNil(breakpoint)) {
    // if `breakpoint.min` is undefined it is considered 0
    const isAboveOrEqualToMin = breakpoint.min ? toPx(windowWidth) >= toPx(breakpoint.min) : true;
    // if `breakpoint.max` is undefined it is considered infinity
    const isBelowOrEqualToMax = breakpoint.max ? toPx(windowWidth) <= toPx(breakpoint.max) : true;
    return isAboveOrEqualToMin && isBelowOrEqualToMax;
  }
  return undefined;
};

export const isAboveBreakpoint = (
  state: ConfigState,
  breakpointKey: string,
  windowWidth: string
): undefined | boolean => {
  const breakpoint = getBreakpoint(state, breakpointKey);
  if (!isNil(breakpoint)) {
    // if `breakpoint.max` is undefined it is considered infinity
    return breakpoint.max ? toPx(windowWidth) > toPx(breakpoint.max) : false;
  }
  return undefined;
};

export const isBelowBreakpoint = (
  state: ConfigState,
  breakpointKey: string,
  windowWidth: string
): undefined | boolean => {
  const breakpoint = getBreakpoint(state, breakpointKey);
  if (!isNil(breakpoint)) {
    // if `breakpoint.min` is undefined it is considered 0
    return breakpoint.min ? toPx(windowWidth) < toPx(breakpoint.min) : false;
  }
  return undefined;
};

export const configBreakpointSelectors = {
  getBreakpoint,
  getBreakpoints,
  isCurrentBreakpoint,
  isAboveBreakpoint,
  isBelowBreakpoint
};
