import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setQuery, setValue } from '../actions';

@connect(state => ({
  val: state.query.val,
}))
export default class extends React.Component {
  static propTypes = {
    val: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.sendQuery = this.sendQuery.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }
  sendQuery(e) {
    e.preventDefault();
    const val = this.props.val;
    if (val !== '') {
      const queryValue = ` AND ${val.replace(/( )([a-z])/ig, '$1OR $2')}`;
      this.props.dispatch(setQuery(queryValue));
    } else {
      this.props.dispatch(setQuery(val));
    }
  }
  changeValue(e) {
    const val = e.target.value;
    this.props.dispatch(setValue(val));
  }
  render() {
    return (
      <form onSubmit={this.sendQuery}>
        <label htmlFor={this.props.id}>Search: </label>
        <input id={this.props.id} type="text" value={this.props.val} onChange={this.changeValue} />
        <button>Search</button>
      </form>
    );
  }
}
