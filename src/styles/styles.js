import { css } from 'styled-components';

export const formItemsStyles = css`
  width: 100%;
  border: 1px solid black;
  padding: 8px 6px;
  border-radius: 3px;
  margin-bottom: 20px;

  ${({ isError }) => isError && css`
    border-color: #d50000;
  `};
`;
