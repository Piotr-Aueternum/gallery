import React from 'react';
import { connect } from 'react-redux';
import { setPage } from '../actions';

@connect(() => ({
}))
export default class Pagination extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.updatePage = this.updatePage.bind(this);
  }
  updatePage(val) {
    this.props.dispatch(setPage(val));
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <button onClick={() => (this.updatePage('PREV_PAGINATION'))}>Prev</button>
        <button onClick={() => (this.updatePage('NEXT_PAGINATION'))}>Next</button>
      </div>
    );
  }
}
