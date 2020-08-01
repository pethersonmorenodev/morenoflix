import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Menu from '../Menu';
import Footer from '../Footer';

const Main = styled.main`
  background-color: var(--black);
  color: var(--white);
  flex: 1;
  padding-top: 50px;
  padding-left: 5%;
  padding-right: 5%;
`;

const PageDefault = ({ children }) => (
  <>
    <Menu />
    <Main>{children}</Main>
    <Footer />
  </>
);
const ChildElement = PropTypes.oneOfType([PropTypes.element, PropTypes.bool, PropTypes.string]);
PageDefault.propTypes = {
  children: PropTypes.oneOfType([ChildElement, PropTypes.arrayOf(ChildElement)]).isRequired,
};

export default PageDefault;
