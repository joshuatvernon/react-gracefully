import withCentered from '@storybook/addon-centered';
import { storiesOf } from '@storybook/react';
import path from 'path';

const defaultStoryOptions = {
  decorators: [],
  displayName: ''
};

export const withName = (displayName, StoryComponent) => {
  StoryComponent.displayName = displayName;
  return StoryComponent;
};
const transformStorybookName = (filePath) => {
  // Remove redundant `view` folder from storybook name
  return filePath.replace('/view/', '/');
};

export const getRootPathTillSrc = (filePath) => {
  if (!filePath.includes('src')) {
    filePath = `src/${filePath}`;
  }

  while (path.basename(filePath) != 'src') {
    filePath = path.dirname(filePath);
  }
  filePath = path.dirname(filePath);

  return filePath;
};

export const getStorybookName = (filePath) => {
  filePath = transformStorybookName(filePath);

  // Get path relative to the project root
  const relativeFilePath = path.relative(getRootPathTillSrc(filePath), filePath);

  // Compute directory path and use it as storybook name
  return path.dirname(relativeFilePath);
};

export const decoratedStoriesOf = (
  id, // `module` object within the stories.tsx file
  examples, // import * as examples from './examples';
  storyOptions = defaultStoryOptions
) => {
  // Set kind using display name or module id
  const storybookName = storyOptions.displayName || getStorybookName(id);

  // Create stories from module
  const stories = storiesOf(storybookName, examples);

  const skippedDecorators = [];

  // Add custom decorators
  if (storyOptions.decorators) {
    storyOptions.decorators.forEach((decorator) => {
      if (decorator === withCentered) {
        skippedDecorators.push(decorator);
      } else {
        stories.addDecorator(decorator);
      }
    });
  }

  stories.addDecorator(withCentered);

  return [stories, skippedDecorators];
};

export const isStoryFn = (story) => Object.prototype.toString.call(story) === '[object Function]';
;

export const getStory = (story) => isStoryFn(story) ? story : () => story;

export const isStoryWithStoryOptions = (example) => example.story !== undefined;

export const storiesFor = (
  id, // `module` object within the stories.tsx file
  examples, // import * as examples from './examples';
  storyOptions = defaultStoryOptions
) => {
  const [stories, skippedDecorators] = decoratedStoriesOf(id, examples, storyOptions);

  let keys = Object.keys(examples);

  // Move `default` to top position
  if (keys.find((key) => key === 'default')) {
    keys = ['default', ...keys.filter((key) => key !== 'default')];
  }

  keys
    // Filter out `defaultProps` and `defaultState`
    .filter((key) => key !== 'defaultProps' && key !== 'defaultState')
    .forEach((key) => {
      // We are either exporting a Story or a decorated object containing a story.
      const example = examples[key];

      if (isStoryWithStoryOptions(example)) {
        const componentName = example.displayName ?? key;
        // If `decorators` are passed add the story with it's decorators
        stories.add(componentName, getStory(example.story), {
          decorators: [...skippedDecorators, ...(example.decorators ?? [])]
        });
      } else {
        stories.add(key, getStory(example), {
          decorators: [...skippedDecorators]
        });
      }
    });

  return stories;
};
