import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

const defaultValues = {
  titulo: '',
  cor: '#000000',
  linkTexto: '',
  linkUrl: '',
};
const CadastroCategoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const setValue = (key, value) => {
    setValues((old) => ({ ...old, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const novaCategoria = {
      id: (categorias.length ? categorias[categorias.length - 1].id : 0) + 1,
      titulo: values.titulo,
      cor: values.cor,
    };
    if (values.linkTexto || values.linkUrl) {
      novaCategoria.link_extra = {
        text: values.linkTexto,
        url: values.linkUrl,
      };
    }
    setCategorias((old) => [
      ...old,
      values,
    ]);
    setValues(defaultValues);
  };
  const handleChange = (event) => {
    const { value } = event.target;
    const name = event.target.getAttribute('name');
    setValue(name, value);
  };

  useEffect(() => {
    const URL_TOP = 'http://localhost:8080/categorias';
    fetch(URL_TOP).then((r) => r.json()).then((resposta) => setCategorias([...resposta]));
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {' '}
        {values.titulo}
      </h1>

      <form onSubmit={handleSubmit}>
        <FormField
          label="Título da Categoria"
          value={values.titulo}
          name="titulo"
          onChange={handleChange}
        />
        <FormField
          label="Cor"
          type="color"
          value={values.cor}
          name="cor"
          onChange={handleChange}
        />
        <FormField
          label="Link - Texto"
          value={values.linkTexto}
          name="linkTexto"
          onChange={handleChange}
        />
        <FormField
          label="Link - URL"
          value={values.linkUrl}
          name="linkUrl"
          onChange={handleChange}
        />
        <Button type="submit">
          Cadastrar
        </Button>
      </form>

      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>{categoria.titulo}</li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
};

export default CadastroCategoria;
