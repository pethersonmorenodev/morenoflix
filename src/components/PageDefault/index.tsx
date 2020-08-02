import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Menu from '../Menu';
import Footer from '../Footer';

const Main = styled.main`
  background-color: var(--black);
  color: var(--white);
  flex: 1;
  padding-top: 50px;
  padding-left: 5%;
  padding-right: 5%;
  ${({ paddingAll }: { paddingAll?: number }) =>
    paddingAll !== undefined &&
    css`
      padding: ${paddingAll};
    `}
`;

const PageDefault = ({ children, paddingAll }: { children: any; paddingAll?: number }) => (
  <>
    <Menu />
    <Main paddingAll={paddingAll}>{children}</Main>
    <Footer />
  </>
);
const ChildElement = PropTypes.oneOfType([PropTypes.element, PropTypes.bool, PropTypes.string]);
PageDefault.defaultProps = {
  paddingAll: undefined,
};
PageDefault.propTypes = {
  children: PropTypes.oneOfType([ChildElement, PropTypes.arrayOf(ChildElement)]).isRequired,
  paddingAll: PropTypes.number,
};

export default PageDefault;
