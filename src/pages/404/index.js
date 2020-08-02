import React, { useState, useCallback, useEffect } from 'react';
import { useEffectResScriptLoader } from '@morenobr/guideline-react-hooks';
import styled from 'styled-components';
import PageDefault from '../../components/PageDefault';

const GameArea = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
const GameAreaCanvas = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 0px;
  width: 100%;
  max-width: 480px;
  overflow: hidden;
  background-color: #30858e;
  border: 2px solid white;
`;

const urlBaseGame = 'https://pethersonmoreno.github.io/flappy-bird-moreno';

const Pagina404 = () => {
  const [ready, setReady] = useState(false);
  useEffectResScriptLoader({
    src: `${urlBaseGame}/jogo.js`,
    onsuccess: useCallback(() => {
      setReady(true);
    }, []),
  });
  useEffect(() => {
    let umount;
    if (ready) {
      umount = window.mountFlappyBird(document.querySelector('.gameAreaCanvas'), urlBaseGame);
    }
    return () => {
      if (umount) {
        umount();
      }
    };
  }, [ready]);

  return (
    <PageDefault>
      <h1>Página não encontrada - aproveite o Flappy Bird</h1>
      <GameArea>
        <GameAreaCanvas className="gameAreaCanvas" />
      </GameArea>
    </PageDefault>
  );
};

export default Pagina404;
