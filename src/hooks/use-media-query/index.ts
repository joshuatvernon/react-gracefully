import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
  // Create queryMatches state to keep track of whether or not the query currently matches
  const [queryMatches, setQueryMatches] = useState(false);

  useEffect(() => {
    // Create media query list to watch media query
    const mediaQueryList: MediaQueryList = window.matchMedia(query);

    // Create handle change function to update queryMatches state whenenever changes occur
    const handleChange = ({ matches }: MediaQueryList | MediaQueryListEvent) => setQueryMatches(matches);

    // Add event listener on query changes
    mediaQueryList.addEventListener('change', handleChange);

    // Initialize queryMatches value
    handleChange(mediaQueryList);

    return () => {
      // Remove event listener
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query, setQueryMatches]);

  // Return queryMatches value
  return queryMatches;
};
