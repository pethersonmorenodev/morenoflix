import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository, { ICategoria, ICategoriaWithoutId } from '../../../repositories/categorias';

type TFormCategoria = {
  titulo: string;
  cor: string;
  linkTexto: string;
  linkUrl: string;
};

const valoresIniciaisToForm: TFormCategoria = {
  titulo: '',
  cor: '',
  linkTexto: '',
  linkUrl: '',
};

const validateForm = (values: TFormCategoria) => {
  return {
    titulo: !values.titulo ? 'Título é obrigatório' : '',
    cor: !values.cor ? 'Cor é obrigatória' : '',
    linkUrl: values.linkUrl && !/^https?:\/\//.test(values.linkUrl) ? 'URL inválida' : '',
  };
};

const CadastroCategoria = () => {
  const [loading, setLoading] = useState(true);
  const [ignoreTouched, setIgnoreTouched] = useState(false);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const form = useForm({
    initialValues: valoresIniciaisToForm,
    validate: validateForm,
  });

  const { values, invalid: invalidForm, clearForm } = form;
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (invalidForm) {
        setIgnoreTouched(true);
        // eslint-disable-next-line no-alert
        alert('Preencha os campos corretamente');
        return;
      }
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
      setIgnoreTouched(false);
      categoriasRepository.create(novaCategoria).then(categoria => {
        setCategorias(old => [...old, categoria]);
        clearForm();
      });
    },
    [invalidForm, values, clearForm],
  );

  useEffect(() => {
    categoriasRepository.getAll().then(resposta => {
      setCategorias([...resposta]);
      setLoading(false);
    });
  }, []);
  return (
    <PageDefault>
      <h1>Cadastro de Categoria: {form.values.titulo}</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Título da Categoria"
          value={form.values.titulo}
          name="titulo"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          errorMessage={(ignoreTouched || form.touched.titulo) && form.errors.titulo}
        />
        <FormField
          label="Cor"
          type="color"
          value={form.values.cor}
          name="cor"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          errorMessage={(ignoreTouched || form.touched.cor) && form.errors.cor}
        />
        <FormField label="Link - Texto" value={form.values.linkTexto} name="linkTexto" onChange={form.handleChange} />
        <FormField
          label="Link - URL"
          value={form.values.linkUrl}
          name="linkUrl"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          errorMessage={(ignoreTouched || form.touched.linkUrl) && form.errors.linkUrl}
        />
        <Button type="submit">Cadastrar</Button>
        <Button secondary spaced type="button" onClick={form.clearForm}>
          Limpar
        </Button>
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
