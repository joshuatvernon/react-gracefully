import React, { FunctionComponent } from 'react';
import { mount, ReactWrapper } from 'enzyme';

import {
  Breakpoints,
  ConfigState,
  Device,
  DevicesState,
  GlobalState,
  initialConfigState,
  initialGlobalState,
  Orientation,
  useConfigStore,
  useGlobalStore,
  WindowState
} from '../../stores';
import { GraceProvider } from './index';
import { GraceProviderProps } from './types';

const mockUseMediaQuery = (orientation: 'portrait' | 'landscape' | Orientation) => {
  const addEventListener = jest.fn().mockImplementation();
  const removeEventListener = jest.fn().mockImplementation();
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: query.includes(orientation),
    media: query,
    addEventListener,
    removeEventListener
  }));
};

const Component: FunctionComponent = () => {
  const [configState] = useConfigStore();
  const [globalState] = useGlobalStore();
  return (
    <>
      <>{JSON.stringify(configState)}</>
      <>{JSON.stringify(globalState)}</>
    </>
  );
};

describe('GraceProvider', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockUseMediaQuery('landscape');
  });

  const expectProviderStateMatches = (props: {
    wrapper: ReactWrapper;
    configState?: ConfigState;
    globalState?: GlobalState;
  }) => {
    const { wrapper, configState = initialConfigState, globalState = initialGlobalState } = props;
    expect(wrapper.childAt(0).html()).toBe(JSON.stringify(configState));
    expect(wrapper.childAt(1).html()).toBe(JSON.stringify(globalState));
  };

  test('should return initial state when no props are passed', () => {
    // given
    const component = <Component />;
    const graceProviderProps: GraceProviderProps = {};

    // when
    const wrapper = mount(component, {
      wrappingComponent: GraceProvider,
      wrappingComponentProps: graceProviderProps
    });

    // then
    expectProviderStateMatches({ wrapper });
  });

  test('should return initial state when devices is undefined', () => {
    // given
    const component = <Component />;
    const graceProviderProps: GraceProviderProps = {
      devices: undefined
    };

    // when
    const wrapper = mount(component, {
      wrappingComponent: GraceProvider,
      wrappingComponentProps: graceProviderProps
    });

    // then
    expectProviderStateMatches({ wrapper });
  });

  test('should return initial state when devices is an empty array', () => {
    // given
    const component = <Component />;
    const graceProviderProps: GraceProviderProps = {
      devices: []
    };

    // when
    const wrapper = mount(component, {
      wrappingComponent: GraceProvider,
      wrappingComponentProps: graceProviderProps
    });

    // then
    expectProviderStateMatches({ wrapper });
  });

  test('should return initial state when devices is an array with default devices', () => {
    // given
    const component = <Component />;
    const graceProviderProps: GraceProviderProps = {
      devices: ['mobile', 'tablet', 'desktop', 'unknown']
    };

    // when
    const wrapper = mount(component, {
      wrappingComponent: GraceProvider,
      wrappingComponentProps: graceProviderProps
    });

    // then
    expectProviderStateMatches({ wrapper });
  });

  test('should return initial state when devices is a devices state equal to initial state', () => {
    // given
    const component = <Component />;
    const devices: DevicesState = {
      mobile: false,
      tablet: false,
      desktop: false
    };
    const graceProviderProps: GraceProviderProps = {
      devices
    };

    // when
    const wrapper = mount(component, {
      wrappingComponent: GraceProvider,
      wrappingComponentProps: graceProviderProps
    });

    // then
    expectProviderStateMatches({ wrapper });
  });

  test('should return updated state when devices is an array with additional devices', () => {
    // given
    const component = <Component />;
    const devices: Device[] = ['mobile', 'tablet', 'desktop', 'unknown', 'ios', 'android'];
    const graceProviderProps: GraceProviderProps = {
      devices
    };

    // when
    const wrapper = mount(component, {
      wrappingComponent: GraceProvider,
      wrappingComponentProps: graceProviderProps
    });

    // then
    const configState: ConfigState = {
      ...initialConfigState,
      devices
    };
    const globalState: GlobalState = {
      ...initialGlobalState,
      devices: {
        ...initialGlobalState.devices,
        ios: false,
        android: false
      }
    };
    expectProviderStateMatches({ wrapper, configState, globalState });
  });

  test('should return updated state when devices is a devices state NOT equal to initial state', () => {
    // given
    const component = <Component />;
    const devices: DevicesState = {
      mobile: true,
      tablet: false,
      desktop: false
    };
    const graceProviderProps: GraceProviderProps = {
      devices
    };

    // when
    const wrapper = mount(component, {
      wrappingComponent: GraceProvider,
      wrappingComponentProps: graceProviderProps
    });

    // then
    const configState: ConfigState = initialConfigState;
    const globalState: GlobalState = {
      ...initialGlobalState,
      devices: {
        ...initialGlobalState.devices,
        mobile: true,
        unknown: false
      }
    };
    expectProviderStateMatches({ wrapper, configState, globalState });
  });

  test('should return updated state when devices is a devices state contains additional devices', () => {
    // given
    const component = <Component />;
    const devices: DevicesState = {
      mobile: false,
      tablet: false,
      desktop: false,
      ios: false,
      android: false
    };
    const graceProviderProps: GraceProviderProps = {
      devices
    };

    // when
    const wrapper = mount(component, {
      wrappingComponent: GraceProvider,
      wrappingComponentProps: graceProviderProps
    });

    // then
    const configState: ConfigState = {
      ...initialConfigState,
      devices: [...initialConfigState.devices, 'ios', 'android']
    };
    const globalState: GlobalState = {
      ...initialGlobalState,
      devices: {
        ...initialGlobalState.devices,
        ios: false,
        android: false
      }
    };
    expectProviderStateMatches({ wrapper, configState, globalState });
  });

  test('should return initial state when breakpoints is undefined', () => {
    // given
    const component = <Component />;
    const graceProviderProps: GraceProviderProps = {
      breakpoints: undefined
    };

    // when
    const wrapper = mount(component, {
      wrappingComponent: GraceProvider,
      wrappingComponentProps: graceProviderProps
    });

    // then
    expectProviderStateMatches({ wrapper });
  });

  test('should return initial state when breakpoints is equal to initial state', () => {
    // given
    const component = <Component />;
    const breakpoints: Breakpoints = {};
    const graceProviderProps: GraceProviderProps = {
      breakpoints
    };

    // when
    const wrapper = mount(component, {
      wrappingComponent: GraceProvider,
      wrappingComponentProps: graceProviderProps
    });

    // then
    expectProviderStateMatches({ wrapper });
  });

  test('should return updated state when breakpoints is NOT equal to initial state', () => {
    // given
    const component = <Component />;
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
    const graceProviderProps: GraceProviderProps = {
      breakpoints
    };

    // when
    const wrapper = mount(component, {
      wrappingComponent: GraceProvider,
      wrappingComponentProps: graceProviderProps
    });

    // then
    const configState: ConfigState = {
      ...initialConfigState,
      breakpoints
    };
    expectProviderStateMatches({ wrapper, configState });
  });

  test('should return portrait orientation when window is portrait', () => {
    // given
    const component = <Component />;
    const graceProviderProps: GraceProviderProps = {};
    mockUseMediaQuery('portrait');

    // when
    const wrapper = mount(component, {
      wrappingComponent: GraceProvider,
      wrappingComponentProps: graceProviderProps
    });

    // then
    const globalState: GlobalState = {
      ...initialGlobalState,
      window: {
        ...initialGlobalState.window,
        orientation: Orientation.Portait
      }
    };
    expectProviderStateMatches({ wrapper, globalState });
  });

  test('should return landscape orientation when window is landscape', () => {
    // given
    const component = <Component />;
    const graceProviderProps: GraceProviderProps = {};
    mockUseMediaQuery('landscape');

    // when
    const wrapper = mount(component, {
      wrappingComponent: GraceProvider,
      wrappingComponentProps: graceProviderProps
    });

    // then
    const globalState: GlobalState = {
      ...initialGlobalState,
      window: {
        ...initialGlobalState.window,
        orientation: Orientation.Landscape
      }
    };
    expectProviderStateMatches({ wrapper, globalState });
  });

  test('should return initial state when window is undefined', () => {
    // given
    const component = <Component />;
    const graceProviderProps: GraceProviderProps = {
      window: undefined
    };

    // when
    const wrapper = mount(component, {
      wrappingComponent: GraceProvider,
      wrappingComponentProps: graceProviderProps
    });

    // then
    expectProviderStateMatches({ wrapper });
  });

  test('should return initial state when window is equal to initial state', () => {
    // given
    const component = <Component />;
    const window: WindowState = initialGlobalState.window;
    const graceProviderProps: GraceProviderProps = {
      window
    };

    // when
    const wrapper = mount(component, {
      wrappingComponent: GraceProvider,
      wrappingComponentProps: graceProviderProps
    });

    // then
    expectProviderStateMatches({ wrapper });
  });

  test('should return updated state when breakpoints is NOT equal to initial state', () => {
    // given
    const component = <Component />;
    const window: WindowState = {
      width: '1000px',
      height: '500px',
      orientation: Orientation.Landscape
    };
    const graceProviderProps: GraceProviderProps = {
      window
    };

    // when
    const wrapper = mount(component, {
      wrappingComponent: GraceProvider,
      wrappingComponentProps: graceProviderProps
    });

    // then
    const globalState: GlobalState = {
      ...initialGlobalState,
      window
    };
    expectProviderStateMatches({ wrapper, globalState });
  });
});
