import httpGet from './http_get';

const URL = window.URL;
export default {
  init: ({ address, pathname = '', query = [], token }) => new Promise((resolve) => {
    const url = new URL(address);
    function encodeQueryData(data) {
      const ret = [];
      Object.keys(data).forEach((key) => {
        ret.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
      });
      return ret.join('&');
    }
    url.pathname = pathname;
    url.search = encodeQueryData(query);
    httpGet(url, token)
      .then((res) => {
        resolve(JSON.parse(res));
      });
  }),
};
