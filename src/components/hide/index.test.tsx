import React, { ReactElement } from 'react';
import { mount } from 'enzyme';

import { UNKNOWN_DEVICE_TYPE } from '../../constants';
import { Breakpoints, Device, DevicesState, Orientation } from '../../stores';
import { GraceProvider, GraceProviderProps } from '../provider';
import { Hide } from './index';

describe('components', () => {
  const mountHideComponent = (props: {
    node?: ReactElement;
    currentDevices?: Device[];
    currentBreakpoints?: Breakpoints;
    hiddenDevices?: Device[];
    hiddenBreakpoints?: string[];
    hiddenOrientation?: 'portrait' | 'landscape' | Orientation;
  }) => {
    const {
      node,
      currentDevices = [],
      currentBreakpoints = {},
      hiddenDevices,
      hiddenBreakpoints,
      hiddenOrientation
    } = props;

    const graceProviderProps: GraceProviderProps = {
      breakpoints: currentBreakpoints,
      devices: currentDevices.reduce(
        (prev: DevicesState, curr: string) => {
          return { ...prev, [curr]: true };
        },
        {
          mobile: false,
          tablet: false,
          desktop: false
        }
      )
    };

    return mount(
      <Hide devices={hiddenDevices} breakpoints={hiddenBreakpoints} orientation={hiddenOrientation}>
        {node}
      </Hide>,
      {
        wrappingComponent: GraceProvider,
        wrappingComponentProps: graceProviderProps
      }
    );
  };

  describe('Hide', () => {
    describe('adds hidden style', () => {
      describe('when breakpoints are', () => {
        const multipleBreakpoints: Breakpoints = {
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

        describe(`${JSON.stringify(multipleBreakpoints)} and hidden breakpoints are`, () => {
          describe('undefined', () => {
            describe('and hidden orientation is', () => {
              test('undefined', () => {
                // given
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).not.toHaveStyleRule('display', 'none');
              });

              test('portrait', () => {
                // given
                const hiddenOrientation = Orientation.Portait;
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (orienation: portrait)'
                });
              });

              test('landscape', () => {
                // given
                const hiddenOrientation = Orientation.Landscape;
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (orienation: landscape)'
                });
              });
            });
          });

          describe('[]', () => {
            const hiddenBreakpoints: string[] = [];

            describe('and hidden orientation is', () => {
              test('undefined', () => {
                // given
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).not.toHaveStyleRule('display', 'none');
              });

              test('portrait', () => {
                // given
                const hiddenOrientation = Orientation.Portait;
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints,
                  hiddenOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (orienation: portrait)'
                });
              });

              test('landscape', () => {
                // given
                const hiddenOrientation = Orientation.Landscape;
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints,
                  hiddenOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (orienation: landscape)'
                });
              });
            });
          });

          describe('["invalid"]', () => {
            const hiddenBreakpoints: string[] = ['invalid'];

            describe('and hidden orientation is', () => {
              test('undefined', () => {
                // given
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).not.toHaveStyleRule('display', 'none');
              });

              test('portrait', () => {
                // given
                const hiddenOrientation = Orientation.Portait;
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints,
                  hiddenOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (orienation: portrait)'
                });
              });

              test('landscape', () => {
                // given
                const hiddenOrientation = Orientation.Landscape;
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints,
                  hiddenOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (orienation: landscape)'
                });
              });
            });
          });

          describe('["sm"]', () => {
            const hiddenBreakpoints: string[] = ['sm'];

            describe('and hidden orientation is', () => {
              test('undefined', () => {
                // given
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (max-width: 500px)'
                });
              });

              test('portrait', () => {
                // given
                const hiddenOrientation = Orientation.Portait;
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints,
                  hiddenOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (max-width: 500px) and (orienation: portrait)'
                });
              });

              test('landscape', () => {
                // given
                const hiddenOrientation = Orientation.Landscape;
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints,
                  hiddenOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (max-width: 500px) and (orienation: landscape)'
                });
              });
            });
          });

          describe('["md"]', () => {
            const hiddenBreakpoints: string[] = ['md'];

            describe('and hidden orientation is', () => {
              test('undefined', () => {
                // given
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 500px) and (max-width: 1000px)'
                });
              });

              test('portrait', () => {
                // given
                const hiddenOrientation = Orientation.Portait;
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints,
                  hiddenOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 500px) and (max-width: 1000px) and (orienation: portrait)'
                });
              });

              test('landscape', () => {
                // given
                const hiddenOrientation = Orientation.Landscape;
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints,
                  hiddenOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 500px) and (max-width: 1000px) and (orienation: landscape)'
                });
              });
            });
          });

          describe('["lg"]', () => {
            const hiddenBreakpoints: string[] = ['lg'];

            describe('and hidden orientation is', () => {
              test('undefined', () => {
                // given
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 1000px)'
                });
              });

              test('portrait', () => {
                // given
                const hiddenOrientation = Orientation.Portait;
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints,
                  hiddenOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 1000px) and (orienation: portrait)'
                });
              });

              test('landscape', () => {
                // given
                const hiddenOrientation = Orientation.Landscape;
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints,
                  hiddenOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 1000px) and (orienation: landscape)'
                });
              });
            });
          });

          describe('["sm", "md"]', () => {
            const hiddenBreakpoints: string[] = ['sm', 'md'];

            describe('and hidden orientation is', () => {
              test('undefined', () => {
                // given
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (max-width: 500px)'
                });
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 500px) and (max-width: 1000px)'
                });
              });

              test('portrait', () => {
                // given
                const hiddenOrientation = Orientation.Portait;
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints,
                  hiddenOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (max-width: 500px) and (orienation: portrait)'
                });
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 500px) and (max-width: 1000px) and (orienation: portrait)'
                });
              });

              test('landscape', () => {
                // given
                const hiddenOrientation = Orientation.Landscape;
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints,
                  hiddenOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (max-width: 500px) and (orienation: landscape)'
                });
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 500px) and (max-width: 1000px) and (orienation: landscape)'
                });
              });
            });
          });

          describe('["md", "lg"]', () => {
            const hiddenBreakpoints: string[] = ['md', 'lg'];

            describe('and hidden orientation is', () => {
              test('undefined', () => {
                // given
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 500px) and (max-width: 1000px)'
                });
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 1000px)'
                });
              });

              test('portrait', () => {
                // given
                const hiddenOrientation = Orientation.Portait;
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints,
                  hiddenOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 500px) and (max-width: 1000px) and (orienation: portrait)'
                });
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 1000px) and (orienation: portrait)'
                });
              });

              test('landscape', () => {
                // given
                const hiddenOrientation = Orientation.Landscape;
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints,
                  hiddenOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 500px) and (max-width: 1000px) and (orienation: landscape)'
                });
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 1000px) and (orienation: landscape)'
                });
              });
            });
          });

          describe('["sm", "md", "lg"]', () => {
            const hiddenBreakpoints: string[] = ['sm', 'md', 'lg'];

            describe('and hidden orientation is', () => {
              test('undefined', () => {
                // given
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (max-width: 500px)'
                });
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 500px) and (max-width: 1000px)'
                });
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 1000px)'
                });
              });

              test('portrait', () => {
                // given
                const hiddenOrientation = Orientation.Portait;
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints,
                  hiddenOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (max-width: 500px) and (orienation: portrait)'
                });
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 500px) and (max-width: 1000px) and (orienation: portrait)'
                });
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 1000px) and (orienation: portrait)'
                });
              });

              test('landscape', () => {
                // given
                const hiddenOrientation = Orientation.Landscape;
                const node = <p>content</p>;

                // when
                const wrapper = mountHideComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  hiddenBreakpoints,
                  hiddenOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (max-width: 500px) and (orienation: landscape)'
                });
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 500px) and (max-width: 1000px) and (orienation: landscape)'
                });
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 1000px) and (orienation: landscape)'
                });
              });
            });
          });
        });
      });
    });

    describe('hides content when', () => {
      describe('hidden devices are', () => {
        describe('["mobile"] and current devices are', () => {
          const hiddenDevices: Device[] = ['mobile'];

          test('["mobile"]', () => {
            // given
            const currentDevices: Device[] = ['mobile'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });

          test('["mobile", "android"]', () => {
            // given
            const currentDevices: Device[] = ['mobile', 'android'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });
        });

        describe('["tablet"] and current devices are', () => {
          const hiddenDevices: Device[] = ['tablet'];

          test('["tablet"]', () => {
            // given
            const currentDevices: Device[] = ['tablet'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });
        });

        describe('["desktop"] and current devices are', () => {
          const hiddenDevices: Device[] = ['desktop'];

          test('["desktop"]', () => {
            // given
            const currentDevices: Device[] = ['desktop'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });
        });

        describe('["unknown"] and current devices are', () => {
          const hiddenDevices: Device[] = [UNKNOWN_DEVICE_TYPE];

          test('["unknown"]', () => {
            // given
            const currentDevices: Device[] = [UNKNOWN_DEVICE_TYPE];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });
        });

        describe('["android"] and current devices are', () => {
          const hiddenDevices: Device[] = ['android'];

          test('["mobile", "android"]', () => {
            // given
            const currentDevices: Device[] = ['mobile', 'android'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });
        });

        describe('["mobile", "android"] and current devices are', () => {
          const hiddenDevices: Device[] = ['mobile', 'android'];

          test('["mobile", "android"]', () => {
            // given
            const currentDevices: Device[] = ['mobile', 'android'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });
        });

        describe('["mobile", "android", "ios"] and current devices are', () => {
          const hiddenDevices: Device[] = ['mobile', 'android', 'ios'];

          test('["mobile", "android"]', () => {
            // given
            const currentDevices: Device[] = ['mobile', 'android'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });
        });
      });
    });

    describe('does NOT hide content when', () => {
      describe('hidden devices are', () => {
        describe('["unknown"] and current devices are', () => {
          const hiddenDevices: Device[] = [UNKNOWN_DEVICE_TYPE];

          test('["mobile"]', () => {
            // given
            const currentDevices: Device[] = ['mobile'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });

          test('["tablet"]', () => {
            // given
            const currentDevices: Device[] = ['tablet'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });

          test('["desktop"]', () => {
            // given
            const currentDevices: Device[] = ['desktop'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });
        });

        describe('["mobile"] and current devices are', () => {
          const hiddenDevices: Device[] = ['mobile'];

          test('["tablet"]', () => {
            // given
            const currentDevices: Device[] = ['tablet'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });

          test('["tablet", "ipad"]', () => {
            // given
            const currentDevices: Device[] = ['tablet', 'ipad'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });

          test('["desktop"]', () => {
            // given
            const currentDevices: Device[] = ['desktop'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });

          test('["unknown"]', () => {
            // given
            const currentDevices: Device[] = [UNKNOWN_DEVICE_TYPE];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });
        });

        describe('["tablet"] and current devices are', () => {
          const hiddenDevices: Device[] = ['tablet'];

          test('["mobile"]', () => {
            // given
            const currentDevices: Device[] = ['mobile'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });

          test('["desktop"]', () => {
            // given
            const currentDevices: Device[] = ['desktop'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });

          test('["mobile", "android"]', () => {
            // given
            const currentDevices: Device[] = ['mobile', 'android'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });

          test('["unknown"]', () => {
            // given
            const currentDevices: Device[] = [UNKNOWN_DEVICE_TYPE];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });
        });

        describe('["desktop"] and current devices are', () => {
          const hiddenDevices: Device[] = ['desktop'];

          test('["mobile"]', () => {
            // given
            const currentDevices: Device[] = ['mobile'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });

          test('["tablet"]', () => {
            // given
            const currentDevices: Device[] = ['tablet'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });

          test('["mobile", "android"]', () => {
            // given
            const currentDevices: Device[] = ['mobile', 'android'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });

          test('["unknown"]', () => {
            // given
            const currentDevices: Device[] = [UNKNOWN_DEVICE_TYPE];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });
        });

        describe('[] and current devices are', () => {
          const hiddenDevices: Device[] = [];

          test('["mobile"]', () => {
            // given
            const currentDevices: Device[] = ['mobile'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });

          test('["tablet"]', () => {
            // given
            const currentDevices: Device[] = ['tablet'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });

          test('["desktop"]', () => {
            // given
            const currentDevices: Device[] = ['desktop'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });

          test('["unknown"]', () => {
            // given
            const currentDevices: Device[] = [UNKNOWN_DEVICE_TYPE];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });
        });

        describe('["ios"] and current devices are', () => {
          const hiddenDevices: Device[] = ['ios'];

          test('["mobile"]', () => {
            // given
            const currentDevices: Device[] = ['mobile'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });

          test('["tablet"]', () => {
            // given
            const currentDevices: Device[] = ['tablet'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });

          test('["desktop"]', () => {
            // given
            const currentDevices: Device[] = ['desktop'];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });

          test('["unknown"]', () => {
            // given
            const currentDevices: Device[] = [UNKNOWN_DEVICE_TYPE];
            const node = <p>content</p>;

            // when
            const wrapper = mountHideComponent({
              node,
              currentDevices,
              hiddenDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });
        });
      });
    });
  });
});
