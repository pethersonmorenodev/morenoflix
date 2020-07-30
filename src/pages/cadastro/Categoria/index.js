import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

const defaultValues = {
  nome: '',
  descricao: '',
  cor: '#000000',
};
const CadastroCategoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const setValue = (key, value) => {
    setValues((old) => ({ ...old, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.nome}
      </h1>

      <form onSubmit={handleSubmit}>
        <FormField
          label="Nome da Categoria"
          value={values.nome}
          name="nome"
          onChange={handleChange}
        />
        <FormField
          label="Descrição"
          type="textarea"
          value={values.descricao}
          name="descricao"
          onChange={handleChange}
        />
        <FormField
          label="Cor"
          type="color"
          value={values.cor}
          name="cor"
          onChange={handleChange}
        />
        <Button type="submit">
          Cadastrar
        </Button>
      </form>

      <ul>
        {categorias.map((categoria, index) => (
          <li key={`${categoria.nome}${index}`}>{categoria.nome}</li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
};

export default CadastroCategoria;
