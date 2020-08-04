import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@morenobr/guideline-react';

const Center = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  margin: 30px 0;
`;

const Loading = () => (
  <Center>
    <CircularProgress />
  </Center>
);

export default Loading;
