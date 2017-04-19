export default function query(state = { val: '', query: '' }, action) {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return { ...state, val: action.payload };
    case 'UPDATE_QUERY':
      return { ...state, query: action.payload };
    default:
      return state;
  }
}
