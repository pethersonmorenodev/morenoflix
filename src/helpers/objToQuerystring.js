const objToQuerystring = obj => {
  if (!obj) {
    return '';
  }
  const query = Object.keys(obj)
    .map(key => `${key}=${encodeURIComponent(obj[key])}`)
    .join('&');
  return `?${query}`;
};

export default objToQuerystring;
