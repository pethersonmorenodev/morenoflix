import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import videosRepository from '../../../repositories/videos';
import categoriasRepository, { ICategoria } from '../../../repositories/categorias';

const valoresIniciaisToForm = {
  titulo: '',
  url: '',
  categoria: '',
};

const CadastroVideo = () => {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const history = useHistory();
  const { values, handleChange } = useForm(valoresIniciaisToForm);
  const categoryTitles = categorias.map(({ titulo }) => titulo);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const categoria = categorias.find(cat => cat.titulo === values.categoria);
    if (!categoria) {
      // eslint-disable-next-line no-alert
      window.alert('Categoria não encontrada');
      return;
    }
    const novoVideo = {
      titulo: values.titulo,
      url: values.url,
      categoriaId: categoria.id,
    };
    videosRepository.create(novoVideo).then(() => {
      // eslint-disable-next-line no-alert
      alert('Vídeo cadastrado com sucesso!');
      history.push('/');
    });
  };
  useEffect(() => {
    categoriasRepository.getAll().then(resposta => {
      setCategorias([...resposta]);
    });
  }, []);
  return (
    <PageDefault>
      <h1>Cadastro de Vídeo</h1>

      <form onSubmit={handleSubmit}>
        <FormField label="Título do Vídeo" value={values.titulo} name="titulo" onChange={handleChange} />
        <FormField label="URL do Vídeo" value={values.url} name="url" onChange={handleChange} />
        <FormField
          label="Categoria"
          value={values.categoria}
          name="categoria"
          onChange={handleChange}
          suggestions={categoryTitles}
        />
        <Button type="submit">Cadastrar</Button>
      </form>

      <Link to="/cadastro/categoria">Cadastrar Categoria</Link>
    </PageDefault>
  );
};

export default CadastroVideo;
