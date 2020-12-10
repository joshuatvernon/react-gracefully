import { initialConfigState } from '../../state';
import { Breakpoints } from '../../types';
import { updateBreakpoints } from './index';

const setState = jest.fn();
const getState = jest.fn(() => initialConfigState);
const dispatch = jest.fn();

describe('updateBreakpoints', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should NOT call setState when breakpoints are equal to current breakpoints', () => {
    // given
    const thunk = updateBreakpoints(initialConfigState.breakpoints);
    getState.mockImplementation(() => initialConfigState);

    // when
    thunk({ dispatch, getState, setState });

    // then
    expect(setState).not.toHaveBeenCalled();
  });

  test('should call seState when breakpoints are NOT equal to current breakpoints', () => {
    // given
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
    const thunk = updateBreakpoints(breakpoints);
    getState.mockImplementation(() => initialConfigState);

    // when
    thunk({ dispatch, getState, setState });

    // then
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith({
      ...initialConfigState,
      breakpoints
    });
  });
});
