import styled from 'styled-components';

export const FooterBase = styled.footer`
  background: var(--black);
  border-top: 2px solid var(--primary);
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 32px;
  padding-bottom: 32px;
  color: var(--grayLight);
  text-align: center;
  a {
    color: var(--grayLight);
    font-weight: bold;
    text-decoration: none;
    &.alura {
      color: var(--primary);
    }
  }
  @media (max-width: 800px) {
    margin-bottom: 50px;
  }
`;
