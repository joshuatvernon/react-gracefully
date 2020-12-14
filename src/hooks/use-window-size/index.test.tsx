import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, ReactWrapper } from 'enzyme';

import { useWindowSize } from './index';

const Component = () => {
  const { width, height } = useWindowSize();

  return (
    <>
      <p id="width">{JSON.stringify(width)}</p>
      <p id="height">{JSON.stringify(height)}</p>
    </>
  );
};

describe('hooks', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const expectUseWindowSizeHookReturns = (props: { wrapper: ReactWrapper; id: string; expected: string }) => {
    const { wrapper, id, expected } = props;

    const innerHtml: string = wrapper.find(`#${id}`).childAt(0).html();

    expect(innerHtml).toBe(JSON.stringify(expected));
  };

  describe('useWindowSize', () => {
    test('defaults to 1024px width', () => {
      // given/when
      const wrapper = mount(<Component />);

      // then
      const id = 'width';
      const expected = '1024px';
      expectUseWindowSizeHookReturns({ wrapper, id, expected });
    });

    test('defaults to 768px height', () => {
      // given/when
      const wrapper = mount(<Component />);

      // then
      const id = 'height';
      const expected = '768px';
      expectUseWindowSizeHookReturns({ wrapper, id, expected });
    });

    test('defaults to 1024px width and 768px height when window is undefined', () => {
      // given
      const addEventListener = jest.fn().mockImplementation();
      const removeEventListener = jest.fn().mockImplementation();
      window.addEventListener = addEventListener;
      window.removeEventListener = removeEventListener;

      // when
      const wrapper = mount(<Component />);

      // then
      expect(addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
      expectUseWindowSizeHookReturns({ wrapper, id: 'width', expected: '1024px' });
      expectUseWindowSizeHookReturns({ wrapper, id: 'height', expected: '768px' });

      act(() => {
        // when
        wrapper.unmount();
      });

      // then
      expect(removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    });
  });
});
