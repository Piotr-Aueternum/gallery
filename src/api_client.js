import httpGet from './http_get';

export default {
  init: ({ address, pathname = '', query = [], token }) => new Promise((resolve) => {
    const url = new window.URL(address);
    url.pathname = pathname;
    const search = [];
    Object.keys(query).forEach((key) => {
      search.push(`${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`);
    });
    url.search = search.join('&');
    httpGet(url, {
      Authorization: token,
    }).then(res => resolve(res));
  }),
};
