import React from 'react';

import { Breakpoints } from '../../stores';
import { withGraceSettings } from '../../storybook';
import { Hide } from './index';

export default withGraceSettings()(() => <Hide>Default</Hide>);

export const withHiddenOnMobile = withGraceSettings({
  scope: 'withHiddenOnMobile',
  devices: {
    mobile: true,
    tablet: false,
    desktop: false,
    unknown: false
  }
})(() => <Hide devices={['mobile']}>Hidden on mobile</Hide>);

export const withHiddenOnTablet = withGraceSettings({
  scope: 'withHiddenOnTablet',
  devices: {
    mobile: false,
    tablet: true,
    desktop: false,
    unknown: false
  }
})(() => <Hide devices={['tablet']}>Hidden on tablet</Hide>);

export const withHiddenOnDesktop = withGraceSettings({
  scope: 'withHiddenOnDesktop',
  devices: {
    mobile: false,
    tablet: false,
    desktop: true,
    unknown: false
  }
})(() => <Hide devices={['desktop']}>Hidden on desktop</Hide>);

export const withHiddenOnUnknown = withGraceSettings({
  scope: 'withHiddenOnUnknown',
  devices: {
    mobile: false,
    tablet: false,
    desktop: false,
    unknown: true
  }
})(() => <Hide devices={['unknown']}>Hidden on unknown</Hide>);

export const withHiddenOnAndroid = withGraceSettings({
  scope: 'withHiddenOnAndroid',
  devices: {
    mobile: false,
    tablet: false,
    desktop: false,
    unknown: false,
    android: true
  }
})(() => <Hide devices={['android']}>Hidden on android</Hide>);

export const withHiddenOnPortraitOrientation = withGraceSettings({
  scope: 'withHiddenOnPortraitOrientation'
})(() => <Hide orientation="portrait">Hidden on portrait orientation</Hide>);

export const withHiddenOnLandscapeOrientation = withGraceSettings({
  scope: 'withHiddenOnLandscapeOrientation'
})(() => <Hide orientation="landscape">Hidden on landscape orientation</Hide>);

const breakpoints: Breakpoints = {
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

export const withHiddenOnSmBreakpoint = withGraceSettings({
  scope: 'withHiddenOnSmBreakpoint',
  breakpoints
})(() => <Hide breakpoints={['sm']}>Hidden on sm breakpoint</Hide>);

export const withHiddenOnMdBreakpoint = withGraceSettings({
  scope: 'withHiddenOnMdBreakpoint',
  breakpoints
})(() => <Hide breakpoints={['md']}>Hidden on md breakpoint</Hide>);

export const withHiddenOnLgBreakpoint = withGraceSettings({
  scope: 'withHiddenOnLgBreakpoint',
  breakpoints
})(() => <Hide breakpoints={['lg']}>Hidden on lg breakpoint</Hide>);
