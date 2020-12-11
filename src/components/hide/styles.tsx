import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { isEmpty, isNil } from '../../utils';
import { HideStyleProps } from './types';

export const StyledMedia = styled.div`
  ${(props: HideStyleProps) => {
    const { breakpoints, hiddenBreakpoints, hiddenOrientation } = props;

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
        if (!isNil(hiddenOrientation)) {
          query += ` and (orienation: ${hiddenOrientation})`;
        }
        return query;
      })
      .filter((mediaRule) => !isNil(mediaRule));

    if (!isNil(hiddenOrientation) && isEmpty(mediaRules)) {
      mediaRules.push(`all and (orienation: ${hiddenOrientation})`);
    }

    return !isEmpty(mediaRules)
      ? css`
          @media ${mediaRules.join(', ')} {
            display: none;
          }
        `
      : null;
  }}
`;
