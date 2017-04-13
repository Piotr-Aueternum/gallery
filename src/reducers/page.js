export default function page(state = {
  page: 0,
  pagination: 1,
  amount: 8,
}, action) {
  switch (action.type) {
    case 'NEXT_PAGE':
      return { ...state, page: state.page + action.payload };
    case 'PREV_PAGE':
      return { ...state, page: state.page === 0 ? state.page : state.page - action.payload };
    case 'CHANGE_AMOUNT':
      return { ...state, amount: action.payload };
    case 'NEXT_PAGINATION':
      return {
        ...state,
        pagination: state.pagination + action.payload,
      };
    case 'PREV_PAGINATION':
      return {
        ...state,
        pagination: state.pagination === 1 ? state.pagination : state.pagination - action.payload,
      };
    case 'RESET_PAGINATION':
      return { ...state, pagination: 1 };
    default:
      return state;
  }
}
