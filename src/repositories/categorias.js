import { API_BASE } from '../config';

const URL_CATEGORIAS = `${API_BASE}/categorias`;

const getAll = () =>
  fetch(URL_CATEGORIAS).then(r => {
    if (r.ok) {
      return r.json();
    }

    throw new Error('Não foi possível pegar os dados :(');
  });

const getAllWithVideos = () =>
  fetch(`${URL_CATEGORIAS}?_embed=videos`).then(r => {
    if (r.ok) {
      return r.json();
    }

    throw new Error('Não foi possível pegar os dados :(');
  });

const create = novaCategoria =>
  fetch(URL_CATEGORIAS, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(novaCategoria),
  }).then(r => {
    if (r.ok) {
      return r.json();
    }

    throw new Error('Não foi possível cadastrar a categoria :(');
  });

export default {
  getAll,
  getAllWithVideos,
  create,
};
