import React, { FunctionComponent, ReactElement } from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { globalSelectors, GlobalStoreContainer, useGlobalStore } from './index';
import { initialGlobalState } from './state';
import { GlobalState, Orientation } from './types';

const Component: FunctionComponent = () => {
  const [globalState] = useGlobalStore();
  return <>{JSON.stringify(globalState)}</>;
};

export const mountWithGlobalStoreContainer = (node: ReactElement, initialState?: GlobalState): ReactWrapper =>
  mount(node, {
    wrappingComponent: GlobalStoreContainer,
    wrappingComponentProps: {
      initialState: initialState ? initialState : initialGlobalState
    }
  });

describe('global', () => {
  describe('GlobalStoreContainer', () => {
    describe('onInit', () => {
      test('should init state and render children with state', () => {
        // given
        const component = <Component />;

        // when
        const globalState: GlobalState = {
          devices: {
            mobile: true,
            tablet: false,
            desktop: false
          },
          window: {
            width: '1000px',
            height: '1000px',
            orientation: Orientation.Portait
          }
        };
        const wrapper = mountWithGlobalStoreContainer(component, globalState);

        // then
        expect(wrapper.html()).toBe(JSON.stringify(globalState));
      });
    });

    describe('onUpdate', () => {
      test('should update state and render children with state', () => {
        // given
        const component = <Component />;

        // when
        const wrapper = mountWithGlobalStoreContainer(component);

        // then
        expect(wrapper.html()).toBe(JSON.stringify(initialGlobalState));

        // when
        const globalState: GlobalState = {
          devices: {
            mobile: true,
            tablet: false,
            desktop: false
          },
          window: {
            width: '1000px',
            height: '1000px',
            orientation: Orientation.Portait
          }
        };
        wrapper.getWrappingComponent().setProps({
          initialState: globalState
        });

        // then
        expect(wrapper.html()).toBe(JSON.stringify(globalState));
      });
    });
  });

  describe('globalSelectors', () => {
    test('contains global selectors', () => {
      // given/when/then
      expect(globalSelectors).toHaveProperty('getCurrentDevices');
      expect(globalSelectors).toHaveProperty('getDevicesState');
      expect(globalSelectors).toHaveProperty('getWindowHeight');
      expect(globalSelectors).toHaveProperty('getWindowOrientation');
      expect(globalSelectors).toHaveProperty('getWindowState');
      expect(globalSelectors).toHaveProperty('getWindowWidth');
      expect(globalSelectors).toHaveProperty('isDesktop');
      expect(globalSelectors).toHaveProperty('isDevice');
      expect(globalSelectors).toHaveProperty('isMobile');
      expect(globalSelectors).toHaveProperty('isTablet');
      expect(globalSelectors).toHaveProperty('isWindowHeightEqual');
      expect(globalSelectors).toHaveProperty('isWindowHeightGreaterThan');
      expect(globalSelectors).toHaveProperty('isWindowHeightLessThan');
      expect(globalSelectors).toHaveProperty('isWindowOrientationEqual');
      expect(globalSelectors).toHaveProperty('isWindowWidthEqual');
      expect(globalSelectors).toHaveProperty('isWindowWidthGreaterThan');
      expect(globalSelectors).toHaveProperty('isWindowWidthLessThan');
    });
  });
});
