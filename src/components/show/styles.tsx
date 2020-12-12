import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Orientation } from '../../stores';
import { isEmpty, isNil, keys } from '../../utils';
import { ShowStyleProps } from './types';

export const StyledMedia = styled.div`
  ${(props: ShowStyleProps) => {
    const { breakpoints, shownBreakpoints, shownOrientation } = props;

    const hiddenBreakpoints = keys(breakpoints).filter((breakpoint) => shownBreakpoints.includes(breakpoint));

    const hiddenOrientation = !isNil(shownOrientation)
      ? shownOrientation === Orientation.Landscape
        ? Orientation.Portait
        : Orientation.Landscape
      : undefined;

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

    return css`
      @media ${mediaRules.join(', ')} {
        display: none;
      }
    `;
  }}
`;
