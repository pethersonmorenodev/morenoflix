import React, { useEffect, useState } from 'react';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import PageDefault from '../../components/PageDefault';
import categoriasRepository, { ICategoriaWithVideo } from '../../repositories/categorias';

function Home() {
  const [dadosIniciais, setDadosIniciais] = useState<ICategoriaWithVideo[]>([]);
  useEffect(() => {
    categoriasRepository
      .getAllWithVideos()
      .then(categoriasComVideos => {
        setDadosIniciais(categoriasComVideos);
      })
      .catch(err => {
        // eslint-disable-next-line no-alert
        window.alert(err.message);
      });
  }, []);
  return (
    <PageDefault paddingAll={0}>
      {dadosIniciais.length === 0 && <div>Loading ...</div>}

      {dadosIniciais.length >= 1 && (
        <>
          <BannerMain
            videoTitle={dadosIniciais[0].videos[0].titulo}
            url={dadosIniciais[0].videos[0].url}
            // eslint-disable-next-line max-len
            videoDescription="O que é Front-end? Trabalhando na área os termos HTML, CSS e JavaScript fazem parte da rotina das desenvolvedoras e desenvolvedores. Mas o que eles fazem, afinal? Descubra com a Vanessa!"
          />
          {dadosIniciais.map((categoria, index) => (
            <Carousel key={categoria.id} ignoreFirstVideo={index === 0} category={categoria} />
          ))}
        </>
      )}
    </PageDefault>
  );
}

export default Home;
