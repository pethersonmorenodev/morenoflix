import { API_BASE } from '../config';
import objToQuerystring from '../helpers/objToQuerystring';

const URL_CATEGORIAS = `${API_BASE}/categorias`;

const getAll = query =>
  fetch(`${URL_CATEGORIAS}${objToQuerystring(query)}`).then(r => {
    if (r.ok) {
      return r.json();
    }

    throw new Error('Não foi possível pegar os dados :(');
  });

const getAllWithVideos = () => getAll({ _embed: 'videos' });

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
