import httpGet from './http_get';

export default {
  init: ({ address, pathname = '', query = [], token }) => new Promise((resolve) => {
    const url = new window.URL(address);
    url.pathname = pathname;
    const encode = encodeURIComponent;
    const createQuery = (arr, key) => [...arr, `${encode(key)}=${encode(query[key])}`];
    const search = Object.keys(query).reduce(createQuery, []);
    url.search = search.join('&');
    httpGet(url, {
      Authorization: token,
    }).then(res => resolve(res));
  }),
};
