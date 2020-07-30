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
const API_BASE = window.location.hostname.includes('localhost') ? 'http://localhost:8080' : 'http://morenoflix.herokuapp.com';
const URL_CATEGORIAS = `${API_BASE}/categorias`;
const CadastroCategoria = () => {
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const setValue = (key, value) => {
    setValues((old) => ({ ...old, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const novaCategoria = {
      titulo: values.titulo,
      cor: values.cor,
    };
    if (values.linkTexto || values.linkUrl) {
      novaCategoria.link_extra = {
        text: values.linkTexto,
        url: values.linkUrl,
      };
    }

    fetch(URL_CATEGORIAS, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(novaCategoria),
    }).then((r) => r.json()).then((categoria) => {
      setCategorias((old) => [
        ...old,
        categoria,
      ]);
      setValues(defaultValues);
    });
  };
  const handleChange = (event) => {
    const { value } = event.target;
    const name = event.target.getAttribute('name');
    setValue(name, value);
  };

  useEffect(() => {
    fetch(URL_CATEGORIAS).then((r) => r.json()).then((resposta) => {
      setCategorias([...resposta]);
      setLoading(false);
    });
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

      {loading && (
        <div>
          Loading...
        </div>
      )}
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
