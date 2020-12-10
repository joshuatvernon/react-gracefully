import cloneDeep from 'lodash.clonedeep';

import { initialConfigState } from '../../state';
import { configBreakpointSelectors } from './index';

let state = cloneDeep(initialConfigState);

describe('configBreakpointSelectors', () => {
  beforeEach(() => {
    state = cloneDeep(initialConfigState);
  });

  test('getBreakpoint should return undefined when there are no breakpoints', () => {
    // given
    const breakpoint = 'sm';

    // when
    const actual = configBreakpointSelectors.getBreakpoint(state, breakpoint);

    // then
    expect(actual).toBeUndefined();
  });

  test('getBreakpoint should return breakpoint when breakpoint there is a matching breakpoint', () => {
    // given
    const breakpoints = {
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
    state.breakpoints = breakpoints;
    const breakpoint = 'sm';

    // when
    const actual = configBreakpointSelectors.getBreakpoint(state, breakpoint);

    // then
    expect(actual).toMatchObject(breakpoints[breakpoint]);
  });

  test('getBreakpoint should return undefined when breakpoint there is NOT a matching breakpoint', () => {
    // given
    const breakpoints = {
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
    state.breakpoints = breakpoints;
    const breakpoint = 'xs';

    // when
    const actual = configBreakpointSelectors.getBreakpoint(state, breakpoint);

    // then
    expect(actual).toBeUndefined();
  });

  test('getBreakpoints should return an empty object when breakpoints are NOT defined', () => {
    // given/when
    const actual = configBreakpointSelectors.getBreakpoints(state);

    // then
    expect(actual).toMatchObject(initialConfigState.breakpoints);
  });

  test('getBreakpoints should return breakpoints when breakpoints are defined', () => {
    // given
    const breakpoints = {
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
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.getBreakpoints(state);

    // then
    expect(actual).toMatchObject(breakpoints);
  });

  test('isAboveBreakpoint should return undefined when breakpointKey is NOT present in breakpoints', () => {
    // given
    const breakpointKey = '';
    const windowWidth = '1000px';

    // when
    const actual = configBreakpointSelectors.isAboveBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeUndefined();
  });

  test('isAboveBreakpoint should return false when breakpointKey is present in breakpoints but windowWidth is an empty string', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '';
    const breakpoints = {
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
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isAboveBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeFalsy();
  });

  test('isAboveBreakpoint should return false when breakpointKey is present in breakpoints and pixel windowWidth is below pixel breakpoint.min', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '250px';
    const breakpoints = {
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
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isAboveBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeFalsy();
  });

  test('isAboveBreakpoint should return false when breakpointKey is present in breakpoints and em windowWidth is below em breakpoint.min', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '1em';
    const breakpoints = {
      sm: {
        min: undefined,
        max: '2em'
      },
      md: {
        min: '2em',
        max: '3em'
      },
      lg: {
        min: '3em',
        max: undefined
      }
    };
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isAboveBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeFalsy();
  });

  test('isAboveBreakpoint should return false when breakpointKey is present in breakpoints and pixel windowWidth is equal to pixel breakpoint.max', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '500px';
    const breakpoints = {
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
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isAboveBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeFalsy();
  });

  test('isAboveBreakpoint should return false when breakpointKey is present in breakpoints and em windowWidth is equal to em breakpoint.max', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '1em';
    const breakpoints = {
      sm: {
        min: undefined,
        max: '1em'
      },
      md: {
        min: '1em',
        max: '2em'
      },
      lg: {
        min: '2em',
        max: undefined
      }
    };
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isAboveBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeFalsy();
  });

  test('isAboveBreakpoint should return true when breakpointKey is present in breakpoints and pixel windowWidth is above pixel breakpoint.max', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '501px';
    const breakpoints = {
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
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isAboveBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeTruthy();
  });

  test('isAboveBreakpoint should return true when breakpointKey is present in breakpoints and em windowWidth is above em breakpoint.max', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '2em';
    const breakpoints = {
      sm: {
        min: undefined,
        max: '1em'
      },
      md: {
        min: '1em',
        max: '2em'
      },
      lg: {
        min: '2em',
        max: undefined
      }
    };
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isAboveBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeTruthy();
  });

  test('isAboveBreakpoint should return false when breakpointKey is present in breakpoints and breakpoint.max is undefined', () => {
    // given
    const breakpointKey = 'lg';
    const windowWidth = '1000000px';
    const breakpoints = {
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
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isAboveBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeFalsy();
  });

  test('isBelowBreakpoint should return undefined when breakpointKey is NOT present in breakpoints', () => {
    // given
    const breakpointKey = '';
    const windowWidth = '1000px';

    // when
    const actual = configBreakpointSelectors.isBelowBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeUndefined();
  });

  test('isBelowBreakpoint should return false when breakpointKey is present in breakpoints but windowWidth is an empty string', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '';
    const breakpoints = {
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
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isBelowBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeFalsy();
  });

  test('isBelowBreakpoint should return false when breakpointKey is present in breakpoints and breakpoint.min is undefined', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '0px';
    const breakpoints = {
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
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isBelowBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeFalsy();
  });

  test('isBelowBreakpoint should return true when breakpointKey is present in breakpoints and pixel windowWidth is below pixel breakpoint.min', () => {
    // given
    const breakpointKey = 'md';
    const windowWidth = '499px';
    const breakpoints = {
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
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isBelowBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeTruthy();
  });

  test('isBelowBreakpoint should return true when breakpointKey is present in breakpoints and em windowWidth is below em breakpoint.min', () => {
    // given
    const breakpointKey = 'md';
    const windowWidth = '1em';
    const breakpoints = {
      sm: {
        min: undefined,
        max: '2em'
      },
      md: {
        min: '2em',
        max: '3em'
      },
      lg: {
        min: '3em',
        max: undefined
      }
    };
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isBelowBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeTruthy();
  });

  test('isBelowBreakpoint should return false when breakpointKey is present in breakpoints and pixel windowWidth is equal to pixel breakpoint.max', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '500px';
    const breakpoints = {
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
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isBelowBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeFalsy();
  });

  test('isBelowBreakpoint should return false when breakpointKey is present in breakpoints and em windowWidth is equal to em breakpoint.max', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '1em';
    const breakpoints = {
      sm: {
        min: undefined,
        max: '1em'
      },
      md: {
        min: '1em',
        max: '2em'
      },
      lg: {
        min: '2em',
        max: undefined
      }
    };
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isBelowBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeFalsy();
  });

  test('isBelowBreakpoint should return false when breakpointKey is present in breakpoints and pixel windowWidth is above pixel breakpoint.max', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '501px';
    const breakpoints = {
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
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isBelowBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeFalsy();
  });

  test('isBelowBreakpoint should return false when breakpointKey is present in breakpoints and em windowWidth is above em breakpoint.max', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '2em';
    const breakpoints = {
      sm: {
        min: undefined,
        max: '1em'
      },
      md: {
        min: '1em',
        max: '2em'
      },
      lg: {
        min: '2em',
        max: undefined
      }
    };
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isBelowBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeFalsy();
  });

  test('isCurrentBreakpoint should return undefined when breakpointKey is NOT present in breakpoints', () => {
    // given
    const breakpointKey = '';
    const windowWidth = '1000px';

    // when
    const actual = configBreakpointSelectors.isCurrentBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeUndefined();
  });

  test('isCurrentBreakpoint should return false when breakpointKey is present in breakpoints but windowWidth is an empty string', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '';
    const breakpoints = {
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
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isCurrentBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeFalsy();
  });

  test('isCurrentBreakpoint should return true when breakpointKey is present in breakpoints and pixel windowWidth is below pixel breakpoint.max and breakpoint.min is undefined', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '250px';
    const breakpoints = {
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
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isCurrentBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeTruthy();
  });

  test('isCurrentBreakpoint should return true when breakpointKey is present in breakpoints and pixel windowWidth is above pixel breakpoint.min and breakpoint.max is undefined', () => {
    // given
    const breakpointKey = 'lg';
    const windowWidth = '1250px';
    const breakpoints = {
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
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isCurrentBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeTruthy();
  });

  test('isCurrentBreakpoint should return false when breakpointKey is present in breakpoints and pixel windowWidth is below pixel breakpoint.min', () => {
    // given
    const breakpointKey = 'md';
    const windowWidth = '499px';
    const breakpoints = {
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
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isCurrentBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeFalsy();
  });

  test('isCurrentBreakpoint should return false when breakpointKey is present in breakpoints and em windowWidth is below em breakpoint.min', () => {
    // given
    const breakpointKey = 'md';
    const windowWidth = '1em';
    const breakpoints = {
      sm: {
        min: undefined,
        max: '2em'
      },
      md: {
        min: '2em',
        max: '3em'
      },
      lg: {
        min: '3em',
        max: undefined
      }
    };
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isCurrentBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeFalsy();
  });

  test('isCurrentBreakpoint should return true when breakpointKey is present in breakpoints and pixel windowWidth is equal to pixel breakpoint.max', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '500px';
    const breakpoints = {
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
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isCurrentBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeTruthy();
  });

  test('isCurrentBreakpoint should return true when breakpointKey is present in breakpoints and em windowWidth is equal to em breakpoint.max', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '1em';
    const breakpoints = {
      sm: {
        min: undefined,
        max: '1em'
      },
      md: {
        min: '1em',
        max: '2em'
      },
      lg: {
        min: '2em',
        max: undefined
      }
    };
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isCurrentBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeTruthy();
  });

  test('isCurrentBreakpoint should return false when breakpointKey is present in breakpoints and pixel windowWidth is above pixel breakpoint.max', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '501px';
    const breakpoints = {
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
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isCurrentBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeFalsy();
  });

  test('isCurrentBreakpoint should return false when breakpointKey is present in breakpoints and em windowWidth is above em breakpoint.max', () => {
    // given
    const breakpointKey = 'sm';
    const windowWidth = '2em';
    const breakpoints = {
      sm: {
        min: undefined,
        max: '1em'
      },
      md: {
        min: '1em',
        max: '2em'
      },
      lg: {
        min: '2em',
        max: undefined
      }
    };
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isCurrentBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeFalsy();
  });

  test('isCurrentBreakpoint should return true when breakpointKey is present in breakpoints and pixel windowWidth is above pixel breakpoint.min and below pixel breakpoint.max', () => {
    // given
    const breakpointKey = 'md';
    const windowWidth = '750px';
    const breakpoints = {
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
    state.breakpoints = breakpoints;

    // when
    const actual = configBreakpointSelectors.isCurrentBreakpoint(state, breakpointKey, windowWidth);

    // then
    expect(actual).toBeTruthy();
  });
});
