import { css } from '@emotion/react';
import styled from '@emotion/styled';
import isNil from 'lodash.isnil';
import keys from 'lodash.keys';

import { ShowStyleProps } from './types';

export const StyledMedia = styled.div`
  ${(props: ShowStyleProps) => {
    const { shownBreakpoints, breakpoints } = props;

    const hiddenBreakpoints = keys(breakpoints).filter((breakpoint) => shownBreakpoints.includes(breakpoint));

    const mediaRules = hiddenBreakpoints
      .map((breakpoint: string) => {
        if (isNil(breakpoints[breakpoint])) {
          return undefined;
        }
        const { min, max } = breakpoints[breakpoint];
        let query = 'all';
        if (min) {
          query += ` and (min-width: ${min})`;
        }
        if (max) {
          query += ` and (max-width: ${max})`;
        }
        return query;
      })
      .filter((mediaRule) => !isNil(mediaRule));

    return css`
      @media ${mediaRules.join(', ')} {
        display: none;
      }
    `;
  }}
`;
