export default (theUrl, callback) => {
  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      callback(request.responseText);
    }
  };
  request.open('GET', theUrl, true);
  request.setRequestHeader('Authorization', 'Client-ID 33d4059b86ff060');
  request.send(null);
};

