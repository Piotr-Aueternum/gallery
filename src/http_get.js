export default (url, headers = {}) => new Promise((resolve) => {
  fetch(url, {
    method: 'get',
    headers,
  })
  .then(response => response.json())
  .then(data => resolve(data));
});

