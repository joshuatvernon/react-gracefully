import React, { FunctionComponent, ReactElement } from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { configSelectors, ConfigStoreContainer, useConfigStore } from './index';
import { initialConfigState } from './state';
import { ConfigState } from './types';

const Component: FunctionComponent = () => {
  const [configState] = useConfigStore();
  return <>{JSON.stringify(configState)}</>;
};

export const mountWithConfigStoreContainer = (node: ReactElement, initialState?: ConfigState): ReactWrapper =>
  mount(node, {
    wrappingComponent: ConfigStoreContainer,
    wrappingComponentProps: {
      initialState: initialState ? initialState : initialConfigState
    }
  });

describe('Config', () => {
  describe('ConfigStoreContainer', () => {
    describe('onInit', () => {
      test('should init state and render children with state', () => {
        // given
        const component = <Component />;

        // when
        const configState: ConfigState = {
          breakpoints: {
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
          },
          devices: ['mobile', 'tablet', 'desktop', 'ios', 'android']
        };
        const wrapper = mountWithConfigStoreContainer(component, configState);

        // then
        expect(wrapper.html()).toBe(JSON.stringify(configState));
      });
    });

    describe('onUpdate', () => {
      test('should update state and render children with state', () => {
        // given
        const component = <Component />;

        // when
        const wrapper = mountWithConfigStoreContainer(component);

        // then
        expect(wrapper.html()).toBe(JSON.stringify(initialConfigState));

        // when
        const configState: ConfigState = {
          breakpoints: {
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
          },
          devices: ['mobile', 'tablet', 'desktop', 'ios', 'android']
        };
        wrapper.getWrappingComponent().setProps({
          initialState: configState
        });

        // then
        expect(wrapper.html()).toBe(JSON.stringify(configState));
      });
    });
  });

  describe('configSelectors', () => {
    test('contains config selectors', () => {
      // given/when/then
      expect(configSelectors).toHaveProperty('getBreakpoint');
      expect(configSelectors).toHaveProperty('getBreakpoints');
      expect(configSelectors).toHaveProperty('getDevices');
      expect(configSelectors).toHaveProperty('isAboveBreakpoint');
      expect(configSelectors).toHaveProperty('isBelowBreakpoint');
      expect(configSelectors).toHaveProperty('isCurrentBreakpoint');
    });
  });
});
