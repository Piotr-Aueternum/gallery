export function setPage(type, payload = 1) {
  return {
    type,
    payload,
  };
}

export function setData(type, payload) {
  return {
    type,
    payload,
  };
}

export function setQuery(payload) {
  return {
    type: 'UPDATE_QUERY',
    payload,
  };
}

export function setValue(payload) {
  return {
    type: 'UPDATE_VALUE',
    payload,
  };
}
