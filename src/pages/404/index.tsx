import React, { useState, useCallback, useEffect, useRef } from 'react';
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

const mountFlappyBird = (
  parentElement: HTMLElement,
  urlBase?: string,
  userInteractionElement?: HTMLElement,
): (() => void) => {
  return (window as any).mountFlappyBird(parentElement, urlBase, userInteractionElement);
};

const Pagina404 = () => {
  const refGameAreacanvas = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffectResScriptLoader({
    src: `${urlBaseGame}/jogo.js`,
    onsuccess: useCallback(() => {
      setReady(true);
    }, []),
  });
  useEffect(() => {
    let umount: (() => void) | undefined;
    if (ready && refGameAreacanvas.current) {
      umount = mountFlappyBird(refGameAreacanvas.current, urlBaseGame);
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
        <GameAreaCanvas ref={refGameAreacanvas} />
      </GameArea>
    </PageDefault>
  );
};

export default Pagina404;
