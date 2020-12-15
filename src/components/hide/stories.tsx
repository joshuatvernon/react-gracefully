import React from 'react';

import { withSettings } from '../../storybook';
import { Hide } from './index';

const Component = () => <>Hide me!</>;

export default withSettings()(() => (
  <Hide>
    <Component />
  </Hide>
));

export const withHiddenOnMobile = withSettings()(() => (
  <Hide devices={['mobile']}>
    <Component />
  </Hide>
));

export const withHiddenOnTablet = withSettings()(() => (
  <Hide devices={['tablet']}>
    <Component />
  </Hide>
));

export const withHiddenOnDesktop = withSettings()(() => (
  <Hide devices={['desktop']}>
    <Component />
  </Hide>
));
