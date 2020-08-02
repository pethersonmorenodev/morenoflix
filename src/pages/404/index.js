import React, { useState, useCallback, useEffect } from 'react';
import { useEffectResScriptLoader } from '@morenobr/guideline-react-hooks';
import styled from 'styled-components';
import PageDefault from '../../components/PageDefault';

const GameArea = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const urlBaseGame = 'http://localhost:5000';

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
      umount = window.mountFlappyBird(document.querySelector('.gameArea'), urlBaseGame);
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
      <GameArea className="gameArea" />
    </PageDefault>
  );
};

export default Pagina404;
