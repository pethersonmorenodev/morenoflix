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
  const firstCategoryWithVideo = dadosIniciais.find(c => c.videos.length > 0);
  return (
    <PageDefault paddingAll={0}>
      {dadosIniciais.length === 0 && <div>Loading ...</div>}

      {dadosIniciais.length >= 1 && (
        <>
          {firstCategoryWithVideo && (
            <BannerMain
              videoTitle={firstCategoryWithVideo.videos[0].titulo}
              url={firstCategoryWithVideo.videos[0].url}
              // eslint-disable-next-line max-len
              videoDescription="O que é Front-end? Trabalhando na área os termos HTML, CSS e JavaScript fazem parte da rotina das desenvolvedoras e desenvolvedores. Mas o que eles fazem, afinal? Descubra com a Vanessa!"
            />
          )}
          {dadosIniciais.map(categoria => (
            <Carousel key={categoria.id} ignoreFirstVideo={categoria === firstCategoryWithVideo} category={categoria} />
          ))}
        </>
      )}
    </PageDefault>
  );
}

export default Home;
