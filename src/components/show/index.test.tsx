import React, { ReactElement } from 'react';
import { mount } from 'enzyme';

import { UNKNOWN_DEVICE_TYPE } from '../../constants';
import { Breakpoints, Device, DevicesState, Orientation } from '../../stores';
import { GraceProvider, GraceProviderProps } from '../provider';
import { Show } from './index';

describe('components', () => {
  const mountShowComponent = (props: {
    node?: ReactElement;
    currentDevices?: Device[];
    currentBreakpoints?: Breakpoints;
    shownDevices?: Device[];
    shownBreakpoints?: string[];
    shownOrientation?: Orientation;
  }) => {
    const {
      node,
      currentDevices = [],
      currentBreakpoints = {},
      shownDevices,
      shownBreakpoints,
      shownOrientation
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
      <Show devices={shownDevices} breakpoints={shownBreakpoints} orientation={shownOrientation}>
        {node}
      </Show>,
      {
        wrappingComponent: GraceProvider,
        wrappingComponentProps: graceProviderProps
      }
    );
  };

  describe('Show', () => {
    describe('adds shown style', () => {
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

        describe(`${JSON.stringify(multipleBreakpoints)} and shown breakpoints are`, () => {
          describe('undefined', () => {
            describe('and shown orientation is', () => {
              test('undefined', () => {
                // given
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media:
                    'all and (max-width: 500px), all and (min-width: 500px) and (max-width: 1000px), all and (min-width: 1000px)'
                });
              });

              test('portrait', () => {
                // given
                const shownOrientation = Orientation.Portait;
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media:
                    'all and (max-width: 500px) and (orienation: landscape), all and (min-width: 500px) and (max-width: 1000px) and (orienation: landscape), all and (min-width: 1000px) and (orienation: landscape)'
                });
              });

              test('landscape', () => {
                // given
                const shownOrientation = Orientation.Landscape;
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media:
                    'all and (max-width: 500px) and (orienation: portrait), all and (min-width: 500px) and (max-width: 1000px) and (orienation: portrait), all and (min-width: 1000px) and (orienation: portrait)'
                });
              });
            });
          });

          describe('[]', () => {
            const shownBreakpoints: string[] = [];

            describe('and shown orientation is', () => {
              test('undefined', () => {
                // given
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media:
                    'all and (max-width: 500px), all and (min-width: 500px) and (max-width: 1000px), all and (min-width: 1000px)'
                });
              });

              test('portrait', () => {
                // given
                const shownOrientation = Orientation.Portait;
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints,
                  shownOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media:
                    'all and (max-width: 500px) and (orienation: landscape), all and (min-width: 500px) and (max-width: 1000px) and (orienation: landscape), all and (min-width: 1000px) and (orienation: landscape)'
                });
              });

              test('landscape', () => {
                // given
                const shownOrientation = Orientation.Landscape;
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints,
                  shownOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media:
                    'all and (max-width: 500px) and (orienation: portrait), all and (min-width: 500px) and (max-width: 1000px) and (orienation: portrait), all and (min-width: 1000px) and (orienation: portrait)'
                });
              });
            });
          });

          describe('["invalid"]', () => {
            const shownBreakpoints: string[] = ['invalid'];

            describe('and shown orientation is', () => {
              test('undefined', () => {
                // given
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).not.toHaveStyleRule('display', 'none');
              });

              test('portrait', () => {
                // given
                const shownOrientation = Orientation.Portait;
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints,
                  shownOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media:
                    'all and (max-width: 500px) and (orienation: landscape), all and (min-width: 500px) and (max-width: 1000px) and (orienation: landscape), all and (min-width: 1000px) and (orienation: landscape)'
                });
              });

              test('landscape', () => {
                // given
                const shownOrientation = Orientation.Landscape;
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints,
                  shownOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media:
                    'all and (max-width: 500px) and (orienation: portrait), all and (min-width: 500px) and (max-width: 1000px) and (orienation: portrait), all and (min-width: 1000px) and (orienation: portrait)'
                });
              });
            });
          });

          describe('["sm"]', () => {
            const shownBreakpoints: string[] = ['sm'];

            describe('and shown orientation is', () => {
              test('undefined', () => {
                // given
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 500px) and (max-width: 1000px), all and (min-width: 1000px)'
                });
              });

              test('portrait', () => {
                // given
                const shownOrientation = Orientation.Portait;
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints,
                  shownOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media:
                    'all and (min-width: 500px) and (max-width: 1000px) and (orienation: landscape), all and (min-width: 1000px) and (orienation: landscape)'
                });
              });

              test('landscape', () => {
                // given
                const shownOrientation = Orientation.Landscape;
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints,
                  shownOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media:
                    'all and (min-width: 500px) and (max-width: 1000px) and (orienation: portrait), all and (min-width: 1000px) and (orienation: portrait)'
                });
              });
            });
          });

          describe('["md"]', () => {
            const shownBreakpoints: string[] = ['md'];

            describe('and shown orientation is', () => {
              test('undefined', () => {
                // given
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (max-width: 500px), all and (min-width: 1000px)'
                });
              });

              test('portrait', () => {
                // given
                const shownOrientation = Orientation.Portait;
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints,
                  shownOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media:
                    'all and (max-width: 500px) and (orienation: landscape), all and (min-width: 1000px) and (orienation: landscape)'
                });
              });

              test('landscape', () => {
                // given
                const shownOrientation = Orientation.Landscape;
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints,
                  shownOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media:
                    'all and (max-width: 500px) and (orienation: portrait), all and (min-width: 1000px) and (orienation: portrait)'
                });
              });
            });
          });

          describe('["lg"]', () => {
            const shownBreakpoints: string[] = ['lg'];

            describe('and shown orientation is', () => {
              test('undefined', () => {
                // given
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (max-width: 500px), all and (min-width: 500px) and (max-width: 1000px)'
                });
              });

              test('portrait', () => {
                // given
                const shownOrientation = Orientation.Portait;
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints,
                  shownOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media:
                    'all and (max-width: 500px) and (orienation: landscape), all and (min-width: 500px) and (max-width: 1000px) and (orienation: landscape)'
                });
              });

              test('landscape', () => {
                // given
                const shownOrientation = Orientation.Landscape;
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints,
                  shownOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media:
                    'all and (max-width: 500px) and (orienation: portrait), all and (min-width: 500px) and (max-width: 1000px) and (orienation: portrait)'
                });
              });
            });
          });

          describe('["sm", "md"]', () => {
            const shownBreakpoints: string[] = ['sm', 'md'];

            describe('and shown orientation is', () => {
              test('undefined', () => {
                // given
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 1000px)'
                });
              });

              test('portrait', () => {
                // given
                const shownOrientation = Orientation.Portait;
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints,
                  shownOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 1000px) and (orienation: landscape)'
                });
              });

              test('landscape', () => {
                // given
                const shownOrientation = Orientation.Landscape;
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints,
                  shownOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (min-width: 1000px) and (orienation: portrait)'
                });
              });
            });
          });

          describe('["md", "lg"]', () => {
            const shownBreakpoints: string[] = ['md', 'lg'];

            describe('and shown orientation is', () => {
              test('undefined', () => {
                // given
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (max-width: 500px)'
                });
              });

              test('portrait', () => {
                // given
                const shownOrientation = Orientation.Portait;
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints,
                  shownOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (max-width: 500px) and (orienation: landscape)'
                });
              });

              test('landscape', () => {
                // given
                const shownOrientation = Orientation.Landscape;
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints,
                  shownOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (max-width: 500px) and (orienation: portrait)'
                });
              });
            });
          });

          describe('["sm", "md", "lg"]', () => {
            const shownBreakpoints: string[] = ['sm', 'md', 'lg'];

            describe('and shown orientation is', () => {
              test('undefined', () => {
                // given
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).not.toHaveStyleRule('display', 'none');
              });

              test('portrait', () => {
                // given
                const shownOrientation = Orientation.Portait;
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints,
                  shownOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (orienation: landscape)'
                });
              });

              test('landscape', () => {
                // given
                const shownOrientation = Orientation.Landscape;
                const node = <p>content</p>;

                // when
                const wrapper = mountShowComponent({
                  node,
                  currentBreakpoints: multipleBreakpoints,
                  shownBreakpoints,
                  shownOrientation
                });

                // then
                expect(wrapper).toMatchSnapshot();
                expect(wrapper).toHaveStyleRule('display', 'none', {
                  media: 'all and (orienation: portrait)'
                });
              });
            });
          });
        });
      });
    });

    describe('shows content when', () => {
      describe('shown devices are', () => {
        describe('["mobile"] and current devices are', () => {
          const shownDevices: Device[] = ['mobile'];

          test('["mobile"]', () => {
            // given
            const currentDevices: Device[] = ['mobile'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
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
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });
        });

        describe('["tablet"] and current devices are', () => {
          const shownDevices: Device[] = ['tablet'];

          test('["tablet"]', () => {
            // given
            const currentDevices: Device[] = ['tablet'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });
        });

        describe('["desktop"] and current devices are', () => {
          const shownDevices: Device[] = ['desktop'];

          test('["desktop"]', () => {
            // given
            const currentDevices: Device[] = ['desktop'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });
        });

        describe('["unknown"] and current devices are', () => {
          const shownDevices: Device[] = [UNKNOWN_DEVICE_TYPE];

          test('["unknown"]', () => {
            // given
            const currentDevices: Device[] = [UNKNOWN_DEVICE_TYPE];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });
        });

        describe('["android"] and current devices are', () => {
          const shownDevices: Device[] = ['android'];

          test('["mobile", "android"]', () => {
            // given
            const currentDevices: Device[] = ['mobile', 'android'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });
        });

        describe('["mobile", "android"] and current devices are', () => {
          const shownDevices: Device[] = ['mobile', 'android'];

          test('["mobile", "android"]', () => {
            // given
            const currentDevices: Device[] = ['mobile', 'android'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });
        });

        describe('["mobile", "android", "ios"] and current devices are', () => {
          const shownDevices: Device[] = ['mobile', 'android', 'ios'];

          test('["mobile", "android"]', () => {
            // given
            const currentDevices: Device[] = ['mobile', 'android'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeTruthy();
          });
        });
      });
    });

    describe('does NOT show content when', () => {
      describe('shown devices are', () => {
        describe('["unknown"] and current devices are', () => {
          const shownDevices: Device[] = [UNKNOWN_DEVICE_TYPE];

          test('["mobile"]', () => {
            // given
            const currentDevices: Device[] = ['mobile'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });

          test('["tablet"]', () => {
            // given
            const currentDevices: Device[] = ['tablet'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });

          test('["desktop"]', () => {
            // given
            const currentDevices: Device[] = ['desktop'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });
        });

        describe('["mobile"] and current devices are', () => {
          const shownDevices: Device[] = ['mobile'];

          test('["tablet"]', () => {
            // given
            const currentDevices: Device[] = ['tablet'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });

          test('["tablet", "ipad"]', () => {
            // given
            const currentDevices: Device[] = ['tablet', 'ipad'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });

          test('["desktop"]', () => {
            // given
            const currentDevices: Device[] = ['desktop'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });

          test('["unknown"]', () => {
            // given
            const currentDevices: Device[] = [UNKNOWN_DEVICE_TYPE];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });
        });

        describe('["tablet"] and current devices are', () => {
          const shownDevices: Device[] = ['tablet'];

          test('["mobile"]', () => {
            // given
            const currentDevices: Device[] = ['mobile'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });

          test('["desktop"]', () => {
            // given
            const currentDevices: Device[] = ['desktop'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
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
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });

          test('["unknown"]', () => {
            // given
            const currentDevices: Device[] = [UNKNOWN_DEVICE_TYPE];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });
        });

        describe('["desktop"] and current devices are', () => {
          const shownDevices: Device[] = ['desktop'];

          test('["mobile"]', () => {
            // given
            const currentDevices: Device[] = ['mobile'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });

          test('["tablet"]', () => {
            // given
            const currentDevices: Device[] = ['tablet'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
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
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });

          test('["unknown"]', () => {
            // given
            const currentDevices: Device[] = [UNKNOWN_DEVICE_TYPE];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });
        });

        describe('[] and current devices are', () => {
          const shownDevices: Device[] = [];

          test('["mobile"]', () => {
            // given
            const currentDevices: Device[] = ['mobile'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });

          test('["tablet"]', () => {
            // given
            const currentDevices: Device[] = ['tablet'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });

          test('["desktop"]', () => {
            // given
            const currentDevices: Device[] = ['desktop'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });

          test('["unknown"]', () => {
            // given
            const currentDevices: Device[] = [UNKNOWN_DEVICE_TYPE];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });
        });

        describe('["ios"] and current devices are', () => {
          const shownDevices: Device[] = ['ios'];

          test('["mobile"]', () => {
            // given
            const currentDevices: Device[] = ['mobile'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });

          test('["tablet"]', () => {
            // given
            const currentDevices: Device[] = ['tablet'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });

          test('["desktop"]', () => {
            // given
            const currentDevices: Device[] = ['desktop'];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });

          test('["unknown"]', () => {
            // given
            const currentDevices: Device[] = [UNKNOWN_DEVICE_TYPE];
            const node = <p>content</p>;

            // when
            const wrapper = mountShowComponent({
              node,
              currentDevices,
              shownDevices
            });

            // then
            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('p').exists()).toBeFalsy();
          });
        });
      });
    });
  });
});
