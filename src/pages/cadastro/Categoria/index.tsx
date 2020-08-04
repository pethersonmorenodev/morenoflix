/* eslint-disable no-alert */
import React, { useState, useEffect, useCallback } from 'react';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository, { ICategoria, ICategoriaWithoutId } from '../../../repositories/categorias';
import { Table } from './styles';
import Loading from '../../../components/Loading';

type TFormCategoria = {
  id?: number;
  titulo: string;
  descricao: string;
  cor: string;
  linkTexto: string;
  linkUrl: string;
  securityCode: string;
};

const valoresIniciaisToForm: TFormCategoria = {
  titulo: '',
  descricao: '',
  cor: '',
  linkTexto: '',
  linkUrl: '',
  securityCode: '',
};

const validateForm = (values: TFormCategoria) => {
  return {
    titulo: !values.titulo ? 'Título é obrigatório' : '',
    cor: !values.cor ? 'Cor é obrigatória' : '',
    linkUrl: values.linkUrl && !/^https?:\/\//.test(values.linkUrl) ? 'URL inválida' : '',
    securityCode: !values.securityCode ? 'Código de segurança é obrigatório' : '',
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
        alert('Preencha os campos corretamente');
        return;
      }
      const dadosCategoria: ICategoriaWithoutId = {
        titulo: values.titulo,
        descricao: values.descricao,
        cor: values.cor,
      };
      if (values.linkTexto || values.linkUrl) {
        dadosCategoria.link_extra = {
          text: values.linkTexto,
          url: values.linkUrl,
        };
      }
      setIgnoreTouched(false);
      if (values.id) {
        const categoriaAtualizar = { ...dadosCategoria, id: values.id };
        categoriasRepository
          .update(values.securityCode, categoriaAtualizar)
          .then(categoria => {
            setCategorias(old =>
              old.map(cat => {
                if (cat.id === categoria.id) {
                  return categoria;
                }
                return cat;
              }),
            );
            clearForm();
          })
          .catch(ex => {
            alert(ex.message);
          });
      } else {
        categoriasRepository
          .create(values.securityCode, dadosCategoria)
          .then(categoria => {
            setCategorias(old => [...old, categoria]);
            clearForm();
          })
          .catch(ex => {
            alert(ex.message);
          });
      }
    },
    [invalidForm, values, clearForm],
  );
  const handleRemove = useCallback(
    (categoria: ICategoria) => {
      categoriasRepository
        .remove(values.securityCode, categoria.id)
        .then(() => {
          setCategorias(old => old.filter(cat => cat.id !== categoria.id));
        })
        .catch(ex => {
          alert(ex.message);
        });
    },
    [values],
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
          label="Descrição"
          value={form.values.descricao}
          name="descricao"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
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
        <FormField
          type="password"
          label="Código de segurança"
          value={form.values.securityCode}
          name="securityCode"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          errorMessage={(ignoreTouched || form.touched.securityCode) && form.errors.securityCode}
        />
        <Button type="submit">{values.id ? 'Salvar' : 'Cadastrar'}</Button>
        <Button secondary spaced type="button" onClick={form.clearForm}>
          Limpar
        </Button>
      </form>

      {loading && <Loading />}
      {!loading && (
        <Table>
          <Table.RowHeader>
            <Table.Cell>Nome</Table.Cell>
            <Table.Cell>Descrição</Table.Cell>
            <Table.Cell>Editar</Table.Cell>
            <Table.Cell>Remover</Table.Cell>
          </Table.RowHeader>
          {categorias.map(categoria => (
            <Table.Row key={categoria.id}>
              <Table.Cell>{categoria.titulo}</Table.Cell>
              <Table.Cell>{categoria.descricao}</Table.Cell>
              <Table.Cell>
                <Button
                  primary
                  type="button"
                  onClick={() =>
                    form.setValues({
                      id: categoria.id,
                      titulo: categoria.titulo,
                      descricao: categoria.descricao || '',
                      cor: categoria.cor,
                      linkTexto: categoria.link_extra?.text || '',
                      linkUrl: categoria.link_extra?.url || '',
                      securityCode: values.securityCode,
                    })
                  }
                >
                  Editar
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button secondary type="button" onClick={() => handleRemove(categoria)}>
                  Remover
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
      )}
    </PageDefault>
  );
};

export default CadastroCategoria;
