import { css } from '@emotion/react';
import styled from '@emotion/styled';
import isNil from 'lodash.isnil';

import { HideStyleProps } from './types';

export const StyledMedia = styled.div`
  ${(props: HideStyleProps) => {
    const { hiddenBreakpoints, breakpoints } = props;

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
