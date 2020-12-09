import { initialGlobalState } from '../../state';
import { WindowOrientationState, WindowState } from '../../types';
import { updateWindow } from './index';

const setState = jest.fn();
const getState = jest.fn(() => initialGlobalState);
const dispatch = jest.fn();

describe('updateWindow', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should NOT call setState when new window state is equal to current window state', () => {
    // given
    const thunk = updateWindow(initialGlobalState.window);
    getState.mockImplementation(() => initialGlobalState);

    // when
    thunk({ dispatch, getState, setState });

    // then
    expect(setState).not.toHaveBeenCalled();
  });

  test('should call seState when new window state is NOT equal to current window state', () => {
    // given
    const window: WindowState = {
      width: '1000px',
      height: '1000px',
      orientation: WindowOrientationState.Landscape
    };
    const thunk = updateWindow(window);
    getState.mockImplementation(() => initialGlobalState);

    // when
    thunk({ dispatch, getState, setState });

    // then
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith({
      ...initialGlobalState,
      window
    });
  });
});
