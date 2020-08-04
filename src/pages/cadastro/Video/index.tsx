/* eslint-disable no-alert */
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import videosRepository from '../../../repositories/videos';
import categoriasRepository, { ICategoria } from '../../../repositories/categorias';

type TFormVideo = {
  titulo: string;
  url: string;
  categoria: string;
  securityCode: string;
};

const valoresIniciaisToForm: TFormVideo = {
  titulo: '',
  url: '',
  categoria: '',
  securityCode: '',
};

const CadastroVideo = () => {
  const [ignoreTouched, setIgnoreTouched] = useState(false);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const history = useHistory();
  const categoryTitles = categorias.map(({ titulo }) => titulo);

  const validateForm = useCallback(
    (values: TFormVideo) => {
      let categoria = '';
      if (!values.categoria) {
        categoria = 'Categoria é obrigatória';
      } else if (!categorias.find(c => c.titulo === values.categoria)) {
        categoria = 'Categoria inválida';
      }
      return {
        titulo: !values.titulo ? 'Título é obrigatório' : '',
        url: !values.url ? 'URL é obrigatória' : '',
        categoria,
        securityCode: !values.securityCode ? 'Código de segurança é obrigatório' : '',
      };
    },
    [categorias],
  );
  const form = useForm({ initialValues: valoresIniciaisToForm, validate: validateForm });

  const { values, invalid: invalidForm } = form;
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (invalidForm) {
        setIgnoreTouched(true);
        alert('Preencha os campos corretamente');
        return;
      }
      const categoria = categorias.find(cat => cat.titulo === values.categoria);
      if (!categoria) {
        setIgnoreTouched(true);
        window.alert('Categoria não encontrada');
        return;
      }
      const novoVideo = {
        titulo: values.titulo,
        url: values.url,
        categoriaId: categoria.id,
      };
      setIgnoreTouched(false);
      videosRepository
        .create(values.securityCode, novoVideo)
        .then(() => {
          // eslint-disable-next-line no-alert
          alert('Vídeo cadastrado com sucesso!');
          history.push('/');
        })
        .catch(ex => {
          alert(ex.message);
        });
    },
    [invalidForm, values, categorias, history],
  );
  useEffect(() => {
    categoriasRepository.getAll().then(resposta => {
      setCategorias([...resposta]);
    });
  }, []);
  return (
    <PageDefault>
      <h1>Cadastro de Vídeo</h1>

      <form onSubmit={handleSubmit}>
        <FormField
          label="Título do Vídeo"
          value={form.values.titulo}
          name="titulo"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          errorMessage={(ignoreTouched || form.touched.titulo) && form.errors.titulo}
        />
        <FormField
          label="URL do Vídeo"
          value={form.values.url}
          name="url"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          errorMessage={(ignoreTouched || form.touched.url) && form.errors.url}
        />
        <FormField
          label="Categoria"
          value={form.values.categoria}
          name="categoria"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          suggestions={categoryTitles}
          errorMessage={(ignoreTouched || form.touched.categoria) && form.errors.categoria}
        />
        <FormField
          type="password"
          label="Código de segurança"
          value={form.values.securityCode}
          name="securityCode"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          errorMessage={(ignoreTouched || form.touched.securityCode) && form.errors.securityCode}
        />
        <Button type="submit">Cadastrar</Button>
        <Button secondary spaced type="button" onClick={form.clearForm}>
          Limpar
        </Button>
      </form>
    </PageDefault>
  );
};

export default CadastroVideo;
