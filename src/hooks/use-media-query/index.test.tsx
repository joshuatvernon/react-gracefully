import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { Orientation } from '../../stores';
import { useMediaQuery } from './index';

const addEventListener = jest.fn().mockImplementation();
const removeEventListener = jest.fn().mockImplementation();

const mockUseMediaQuery = (orientation: 'portrait' | 'landscape' | Orientation) => {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: query.includes(orientation),
    media: query,
    addEventListener,
    removeEventListener
  }));
};

const Component = () => {
  const isPortrait = useMediaQuery('(orientation: portrait)');
  const isLandscape = useMediaQuery('(orientation: landscape)');
  return (
    <>
      <p id="isPortrait">{JSON.stringify(isPortrait)}</p>
      <p id="isLandscape">{JSON.stringify(isLandscape)}</p>
    </>
  );
};

describe('useMediaQuery', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('returns boolean values for media queries when orientation is portrait', () => {
    // given
    mockUseMediaQuery('portrait');

    // when
    const wrapper = mount(<Component />);

    // then
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(wrapper.find(`#isPortrait`).childAt(0).html()).toBe(JSON.stringify(true));
    expect(wrapper.find(`#isLandscape`).childAt(0).html()).toBe(JSON.stringify(false));

    act(() => {
      // when
      wrapper.unmount();
    });

    // then
    expect(removeEventListener).toHaveBeenCalledTimes(2);
  });

  test('returns boolean values for media queries when orientation is landscape', () => {
    // given
    mockUseMediaQuery('landscape');

    // when
    const wrapper = mount(<Component />);

    // then
    expect(addEventListener).toHaveBeenCalledTimes(2);
    expect(wrapper.find(`#isPortrait`).childAt(0).html()).toBe(JSON.stringify(false));
    expect(wrapper.find(`#isLandscape`).childAt(0).html()).toBe(JSON.stringify(true));

    act(() => {
      // when
      wrapper.unmount();
    });

    // then
    expect(removeEventListener).toHaveBeenCalledTimes(2);
  });
});
