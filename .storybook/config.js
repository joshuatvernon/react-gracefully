import { configure } from '@storybook/react';

import { storiesFor } from './utils';

const context = require.context('../src', true, /.stories.tsx$/, 'lazy');

const loadStories = () => {
  context.keys().forEach((key) => {
    context(key).then(module => {
      storiesFor(key, module);
    });
  });
};

configure(loadStories, module);
