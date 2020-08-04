import React from 'react';
import styledBase, { css } from 'styled-components';
import { withProps } from '../../helpers/withProps';

interface TButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  topBar?: boolean;
}

const styled = {
  button: withProps<TButton>()(styledBase.button),
};
const Button = styled.button`
  color: var(--white);
  border: 1px solid var(--white);
  background: var(--primary);
  box-sizing: border-box;
  cursor: pointer;
  padding: 16px 24px;
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
    opacity: 0.5;
  }
  ${({ topBar }) => {
    return (
      topBar &&
      css`
        background: var(--black);
      `
    );
  }}
`;

export default Button;
