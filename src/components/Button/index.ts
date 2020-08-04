import styledBase, { css } from 'styled-components';

type TButton = {
  primary?: boolean;
  secondary?: boolean;
  dark?: boolean;
  spaced?: boolean;
};

const styled = {
  button: styledBase.button
    .withConfig({
      shouldForwardProp: (prop, defaultValidatorFn) =>
        !['primary', 'secondary', 'dark', 'spaced'].includes(prop) && defaultValidatorFn(prop),
    })
    .attrs((props: TButton) => props),
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
      color: var(--blackDark);
      background: var(--blackLighter);
    `}
  ${({ dark }) =>
    dark &&
    css`
      background: var(--blackDark);
      border: 1px solid var(--white);
    `}
  ${({ spaced }) =>
    spaced &&
    css`
      margin: 0 30px;
    `}
`;

export default Button;
