import { useEffect, useState } from 'react';

import { UseWindowSizeState } from './types';

export const useWindowSize = (): UseWindowSizeState => {
  /* istanbul ignore if */
  if (typeof window === 'undefined') {
    return {
      width: '1024px',
      height: '768px'
    };
  }

  const getWindowSize = () => ({
    width: `${window.innerWidth}px`,
    height: `${window.innerHeight}px`
  });

  const [windowSize, setWindowSize] = useState(getWindowSize());

  const handleResize = () => setWindowSize(getWindowSize());

  useEffect(() => {
    // Initialize window size state
    handleResize();

    // Added window resize event listener
    window.addEventListener('resize', handleResize);

    return () => {
      // Remove window resize event listener
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Return window size state
  return windowSize;
};
