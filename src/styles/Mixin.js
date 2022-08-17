import { css } from 'styled-components';

export const Flex = (justifyContent, alignItems) => css`
  display: flex;
  justify-content: ${justifyContent};
  align-items: ${alignItems};
`;

export const border = (radius, stroke = '1', color = '#e9e9e9') => css`
  border-radius: ${radius};
  border: ${stroke}px solid ${color};
`;
