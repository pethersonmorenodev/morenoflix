import React from 'react';
import styledBase, { css } from 'styled-components';
import { withProps } from '../../helpers/withProps';

interface TButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  primary?: boolean;
  secondary?: boolean;
  dark?: boolean;
}

const styled = {
  button: withProps<TButton>()(styledBase.button),
};
const Button = styled.button`
  color: var(--white);
  background: var(--primary);
  border-width: 0;
  box-sizing: border-box;
  cursor: pointer;
  padding: 10px 24px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  outline: none;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  transition: opacity 0.3s;
  &:hover,
  &:focus {
    opacity: 0.8;
  }
  ${({ primary }) =>
    primary &&
    css`
      color: var(--white);
      background: var(--primary);
    `}
  ${({ secondary }) =>
    secondary &&
    css`
      color: var(--white);
      background: var(--blackLighter);
    `}
  ${({ dark }) =>
    dark &&
    css`
      background: var(--blackDark);
      border: 1px solid var(--white);
    `}
`;

export default Button;
