import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository, { ICategoria, ICategoriaWithoutId } from '../../../repositories/categorias';

const valoresIniciaisToForm = {
  titulo: '',
  cor: '#000000',
  linkTexto: '',
  linkUrl: '',
};

const CadastroCategoria = () => {
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const { values, handleChange, clearForm } = useForm(valoresIniciaisToForm);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const novaCategoria: ICategoriaWithoutId = {
      titulo: values.titulo,
      cor: values.cor,
    };
    if (values.linkTexto || values.linkUrl) {
      novaCategoria.link_extra = {
        text: values.linkTexto,
        url: values.linkUrl,
      };
    }

    categoriasRepository.create(novaCategoria).then(categoria => {
      setCategorias(old => [...old, categoria]);
      clearForm();
    });
  };

  useEffect(() => {
    categoriasRepository.getAll().then(resposta => {
      setCategorias([...resposta]);
      setLoading(false);
    });
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.titulo}
      </h1>

      <form onSubmit={handleSubmit}>
        <FormField label="Título da Categoria" value={values.titulo} name="titulo" onChange={handleChange} />
        <FormField label="Cor" type="color" value={values.cor} name="cor" onChange={handleChange} />
        <FormField label="Link - Texto" value={values.linkTexto} name="linkTexto" onChange={handleChange} />
        <FormField label="Link - URL" value={values.linkUrl} name="linkUrl" onChange={handleChange} />
        <Button type="submit">Cadastrar</Button>
      </form>

      {loading && <div>Loading...</div>}
      <ul>
        {categorias.map(categoria => (
          <li key={categoria.id}>{categoria.titulo}</li>
        ))}
      </ul>

      <Link to="/">Ir para home</Link>
    </PageDefault>
  );
};

export default CadastroCategoria;
