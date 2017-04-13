export default function data(state = { data: [], data_query: '' }, action) {
  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...state, data: [...action.payload] };
    case 'ADD_DATA':
      return { ...state, data: [...state.data, ...action.payload] };
    case 'ADD_QUERY':
      return { ...state, data_query: action.payload };
    default:
      return state;
  }
}
