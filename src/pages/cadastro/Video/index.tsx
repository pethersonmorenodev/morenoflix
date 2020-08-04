/* eslint-disable no-alert */
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import videosRepository, { IVideo } from '../../../repositories/videos';
import categoriasRepository, { ICategoria } from '../../../repositories/categorias';
import { Table } from './styles';
import Loading from '../../../components/Loading';

type TFormVideo = {
  id?: number;
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
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<IVideo[]>([]);
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

  const { values, invalid: invalidForm, clearForm } = form;
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
      const dadosVideo = {
        titulo: values.titulo,
        url: values.url,
        categoriaId: categoria.id,
      };
      setIgnoreTouched(false);
      if (values.id) {
        const videoAtualizar = { ...dadosVideo, id: values.id };
        videosRepository
          .update(values.securityCode, videoAtualizar)
          .then(video => {
            setVideos(old =>
              old.map(vid => {
                if (vid.id === video.id) {
                  return video;
                }
                return vid;
              }),
            );
            clearForm();
          })
          .catch(ex => {
            alert(ex.message);
          });
      } else {
        videosRepository
          .create(values.securityCode, dadosVideo)
          .then(() => {
            // eslint-disable-next-line no-alert
            alert('Vídeo cadastrado com sucesso!');
            history.push('/');
          })
          .catch(ex => {
            alert(ex.message);
          });
      }
    },
    [invalidForm, values, categorias, clearForm, history],
  );
  const handleRemove = useCallback(
    (video: IVideo) => {
      videosRepository
        .remove(values.securityCode, video.id)
        .then(() => {
          setVideos(old => old.filter(vic => vic.id !== video.id));
        })
        .catch(ex => {
          alert(ex.message);
        });
    },
    [values],
  );
  const getCategoryTitle = useCallback(
    (categoriaId: number) => {
      const cat = categorias.find(c => c.id === categoriaId);
      return cat?.titulo || '';
    },
    [categorias],
  );
  useEffect(() => {
    videosRepository.getAll().then(resposta => {
      setVideos([...resposta]);
    });
    categoriasRepository.getAll().then(resposta => {
      setCategorias([...resposta]);
    });
  }, []);

  useEffect(() => {
    categoriasRepository.getAll().then(resposta => {
      setCategorias([...resposta]);
      setLoading(false);
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
            <Table.Cell>Categoria</Table.Cell>
            <Table.Cell>Editar</Table.Cell>
            <Table.Cell>Remover</Table.Cell>
          </Table.RowHeader>
          {videos.map(video => (
            <Table.Row key={video.id}>
              <Table.Cell>{video.titulo}</Table.Cell>
              <Table.Cell>{getCategoryTitle(video.categoriaId)}</Table.Cell>
              <Table.Cell>
                <Button
                  primary
                  type="button"
                  onClick={() =>
                    form.setValues({
                      id: video.id,
                      titulo: video.titulo,
                      url: video.url,
                      categoria: getCategoryTitle(video.categoriaId),
                      securityCode: values.securityCode,
                    })
                  }
                >
                  Editar
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button secondary type="button" onClick={() => handleRemove(video)}>
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

export default CadastroVideo;
