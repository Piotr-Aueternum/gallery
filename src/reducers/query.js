export default function query(state = { value: '', query: '' }, action) {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return { ...state, value: action.payload };
    case 'UPDATE_QUERY':
      return { ...state, query: action.payload };
    default:
      return state;
  }
}
