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
    <Main>
      {children}
    </Main>
    <Footer />
  </>
);
PageDefault.propTypes = {
  children: PropTypes.oneOf(PropTypes.element, PropTypes.arrayOf(PropTypes.element)).isRequired,
};

export default PageDefault;
