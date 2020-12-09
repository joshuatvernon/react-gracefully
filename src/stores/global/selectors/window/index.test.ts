import cloneDeep from 'lodash.clonedeep';

import { initialGlobalState } from '../../state';
import { WindowOrientationState } from '../../types';
import { globalWindowSelectors } from './index';

let state = cloneDeep(initialGlobalState);

describe('globalWindowSelectors', () => {
  beforeEach(() => {
    state = cloneDeep(initialGlobalState);
  });

  test('getWindowState', () => {
    // given
    const window = {
      width: '1000px',
      height: '1000px',
      orientation: WindowOrientationState.Portait
    };
    state.window = window;

    // when
    const actual = globalWindowSelectors.getWindowState(state);

    // then
    expect(actual).toMatchObject(window);
  });

  test('getWindowHeight returns correct height in pixel units', () => {
    // given
    const height = '1000px';
    state.window.height = height;

    // when
    const actual = globalWindowSelectors.getWindowHeight(state);

    // then
    expect(actual).toBe(height);
  });

  test('getWindowHeight returns correct height in pixel units', () => {
    // given
    const height = '2em';
    state.window.height = height;

    // when
    const actual = globalWindowSelectors.getWindowHeight(state);

    // then
    expect(actual).toBe(height);
  });

  test('getWindowWidth returns correct width in em units', () => {
    // given
    const width = '1000px';
    state.window.width = width;

    // when
    const actual = globalWindowSelectors.getWindowWidth(state);

    // then
    expect(actual).toBe(width);
  });

  test('getWindowWidth returns correct width in em units', () => {
    // given
    const width = '2em';
    state.window.width = width;

    // when
    const actual = globalWindowSelectors.getWindowWidth(state);

    // then
    expect(actual).toBe(width);
  });

  test('getWindowOrientation returns portrait when orientation is portrait', () => {
    // given
    const orientation = WindowOrientationState.Portait;
    state.window.orientation = orientation;

    // when
    const actual = globalWindowSelectors.getWindowOrientation(state);

    // then
    expect(actual).toBe(orientation);
  });

  test('getWindowOrientation returns landscape when orientation is landscape', () => {
    // given
    const orientation = WindowOrientationState.Landscape;
    state.window.orientation = orientation;

    // when
    const actual = globalWindowSelectors.getWindowOrientation(state);

    // then
    expect(actual).toBe(orientation);
  });

  test('isWindowWidthEqual returns true when pixel width is equal to window pixel width', () => {
    // given
    const width = '1000px';
    state.window.width = '1000px';

    // when
    const actual = globalWindowSelectors.isWindowWidthEqual(state, width);

    // then
    expect(actual).toBeTruthy();
  });

  test('isWindowWidthEqual returns true when em width is equal to window em width', () => {
    // given
    const width = '2em';
    state.window.width = '2em';

    // when
    const actual = globalWindowSelectors.isWindowWidthEqual(state, width);

    // then
    expect(actual).toBeTruthy();
  });

  test('isWindowWidthEqual returns true when pixel width is NOT equal to window pixel width', () => {
    // given
    const width = '950px';
    state.window.width = '1000px';

    // when
    const actual = globalWindowSelectors.isWindowWidthEqual(state, width);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowWidthEqual returns false when em width is NOT equal to window em width', () => {
    // given
    const width = '1em';
    state.window.width = '2em';

    // when
    const actual = globalWindowSelectors.isWindowWidthEqual(state, width);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowWidthLessThan returns true when window pixel width is less than pixel width', () => {
    // given
    const width = '1000px';
    state.window.width = '950px';

    // when
    const actual = globalWindowSelectors.isWindowWidthLessThan(state, width);

    // then
    expect(actual).toBeTruthy();
  });

  test('isWindowWidthLessThan returns true when window em width is less than em width', () => {
    // given
    const width = '2em';
    state.window.width = '1em';

    // when
    const actual = globalWindowSelectors.isWindowWidthLessThan(state, width);

    // then
    expect(actual).toBeTruthy();
  });

  test('isWindowWidthLessThan returns false when window pixel width is equal to pixel width', () => {
    // given
    const width = '1000px';
    state.window.width = '1000px';

    // when
    const actual = globalWindowSelectors.isWindowWidthLessThan(state, width);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowWidthLessThan returns false when window em width is equal to em width', () => {
    // given
    const width = '2em';
    state.window.width = '2em';

    // when
    const actual = globalWindowSelectors.isWindowWidthLessThan(state, width);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowWidthLessThan returns false when window pixel width is greater than pixel width', () => {
    // given
    const width = '950px';
    state.window.width = '1000px';

    // when
    const actual = globalWindowSelectors.isWindowWidthLessThan(state, width);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowWidthLessThan returns false when window em width is greater than em width', () => {
    // given
    const width = '1em';
    state.window.width = '2em';

    // when
    const actual = globalWindowSelectors.isWindowWidthLessThan(state, width);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowWidthGreaterThan returns true when window pixel width is greater than pixel width', () => {
    // given
    const width = '950px';
    state.window.width = '1000px';

    // when
    const actual = globalWindowSelectors.isWindowWidthGreaterThan(state, width);

    // then
    expect(actual).toBeTruthy();
  });

  test('isWindowWidthGreaterThan returns true when window em width is greater than em width', () => {
    // given
    const width = '1em';
    state.window.width = '2em';

    // when
    const actual = globalWindowSelectors.isWindowWidthGreaterThan(state, width);

    // then
    expect(actual).toBeTruthy();
  });

  test('isWindowWidthGreaterThan returns false when window pixel width is equal to pixel width', () => {
    // given
    const width = '1000px';
    state.window.width = '1000px';

    // when
    const actual = globalWindowSelectors.isWindowWidthGreaterThan(state, width);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowWidthGreaterThan returns false when window em width is equal to em width', () => {
    // given
    const width = '2em';
    state.window.width = '2em';

    // when
    const actual = globalWindowSelectors.isWindowWidthGreaterThan(state, width);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowWidthGreaterThan returns false when window pixel width is less than pixel width', () => {
    // given
    const width = '1000px';
    state.window.width = '950px';

    // when
    const actual = globalWindowSelectors.isWindowWidthGreaterThan(state, width);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowWidthGreaterThan returns false when window em width is less than em width', () => {
    // given
    const width = '2em';
    state.window.width = '1em';

    // when
    const actual = globalWindowSelectors.isWindowWidthGreaterThan(state, width);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowHeightEqual returns true when window pixel height is equal to pixel height', () => {
    // given
    const height = '1000px';
    state.window.height = '1000px';

    // when
    const actual = globalWindowSelectors.isWindowHeightEqual(state, height);

    // then
    expect(actual).toBeTruthy();
  });

  test('isWindowHeightEqual returns true when window em height is equal to em height', () => {
    // given
    const height = '2em';
    state.window.height = '2em';

    // when
    const actual = globalWindowSelectors.isWindowHeightEqual(state, height);

    // then
    expect(actual).toBeTruthy();
  });

  test('isWindowHeightEqual returns false when window pixel height is greater than pixel height', () => {
    // given
    const height = '950px';
    state.window.height = '1000px';

    // when
    const actual = globalWindowSelectors.isWindowHeightEqual(state, height);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowHeightEqual returns false when window em height is greater than em height', () => {
    // given
    const height = '1em';
    state.window.height = '2em';

    // when
    const actual = globalWindowSelectors.isWindowHeightEqual(state, height);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowHeightEqual returns false when window pixel height is less than pixel height', () => {
    // given
    const height = '950px';
    state.window.height = '1000px';

    // when
    const actual = globalWindowSelectors.isWindowHeightEqual(state, height);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowHeightEqual returns false when window em height is less than em height', () => {
    // given
    const height = '1em';
    state.window.height = '2em';

    // when
    const actual = globalWindowSelectors.isWindowHeightEqual(state, height);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowHeightLessThan returns true when window pixel height is less than pixel height', () => {
    // given
    const height = '1000px';
    state.window.height = '950px';

    // when
    const actual = globalWindowSelectors.isWindowHeightLessThan(state, height);

    // then
    expect(actual).toBeTruthy();
  });

  test('isWindowHeightLessThan returns true when window em height is less than em height', () => {
    // given
    const height = '2em';
    state.window.height = '1em';

    // when
    const actual = globalWindowSelectors.isWindowHeightLessThan(state, height);

    // then
    expect(actual).toBeTruthy();
  });

  test('isWindowHeightLessThan returns false when window pixel height is equal to pixel height', () => {
    // given
    const height = '1000px';
    state.window.height = '1000px';

    // when
    const actual = globalWindowSelectors.isWindowHeightLessThan(state, height);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowHeightLessThan returns false when window em height is equal to em height', () => {
    // given
    const height = '2em';
    state.window.height = '2em';

    // when
    const actual = globalWindowSelectors.isWindowHeightLessThan(state, height);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowHeightLessThan returns false when window pixel height is greater than pixel height', () => {
    // given
    const height = '950px';
    state.window.height = '1000px';

    // when
    const actual = globalWindowSelectors.isWindowHeightLessThan(state, height);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowHeightLessThan returns false when window em height is greater than em height', () => {
    // given
    const height = '1em';
    state.window.height = '2em';

    // when
    const actual = globalWindowSelectors.isWindowHeightLessThan(state, height);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowHeightGreaterThan returns true when window pixel height is greater than pixel height', () => {
    // given
    const height = '950px';
    state.window.height = '1000px';

    // when
    const actual = globalWindowSelectors.isWindowHeightGreaterThan(state, height);

    // then
    expect(actual).toBeTruthy();
  });

  test('isWindowHeightGreaterThan returns true when window em height is greater than em height', () => {
    // given
    const height = '1em';
    state.window.height = '2em';

    // when
    const actual = globalWindowSelectors.isWindowHeightGreaterThan(state, height);

    // then
    expect(actual).toBeTruthy();
  });

  test('isWindowHeightGreaterThan returns false when window pixel height is equal to pixel height', () => {
    // given
    const height = '1000px';
    state.window.height = '1000px';

    // when
    const actual = globalWindowSelectors.isWindowHeightGreaterThan(state, height);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowHeightGreaterThan returns false when window em height is equal to em height', () => {
    // given
    const height = '1em';
    state.window.height = '1em';

    // when
    const actual = globalWindowSelectors.isWindowHeightGreaterThan(state, height);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowHeightGreaterThan returns false when window pixel height is less than pixel height', () => {
    // given
    const height = '1000px';
    state.window.height = '950px';

    // when
    const actual = globalWindowSelectors.isWindowHeightGreaterThan(state, height);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowHeightGreaterThan returns false when window em height is less than em height', () => {
    // given
    const height = '2em';
    state.window.height = '1em';

    // when
    const actual = globalWindowSelectors.isWindowHeightGreaterThan(state, height);

    // then
    expect(actual).toBeFalsy();
  });

  test('isWindowOrientationEqual returns true when orientations are equal', () => {
    // given
    const orientation = WindowOrientationState.Landscape;
    state.window.orientation = WindowOrientationState.Landscape;

    // when
    const actual = globalWindowSelectors.isWindowOrientationEqual(state, orientation);

    // then
    expect(actual).toBeTruthy();
  });

  test('isWindowOrientationEqual returns false when orientations are NOT equal', () => {
    // given
    const orientation = WindowOrientationState.Portait;
    state.window.orientation = WindowOrientationState.Landscape;

    // when
    const actual = globalWindowSelectors.isWindowOrientationEqual(state, orientation);

    // then
    expect(actual).toBeFalsy();
  });
});
