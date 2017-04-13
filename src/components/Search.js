import React from 'react';
import { connect } from 'react-redux';
import { setQuery, setValue } from '../actions';

@connect(state => ({
  query: state.query.query,
}))
export default class Search extends React.Component {
  static propTypes = {
    query: React.PropTypes.number,
    dispatch: React.PropTypes.func.isRequired,
  }
  static defaultProps = {
    query: '',
  }
  constructor(props) {
    super(props);
    this.sendQuery = this.sendQuery.bind(this);
  }
  sendQuery(e) {
    const val = e.target.value;
    this.props.dispatch(setValue(val));
    if (e.target.value !== '') {
      const queryValue = `AND ${val.replace(/( )([a-z])/ig, '$1OR $2')}`;
      this.props.dispatch(setQuery(queryValue));
    } else {
      this.props.dispatch(setQuery(val));
    }
  }
  render() {
    return (
      <div>
        <label htmlFor="search">Search: </label>
        <input id="search" type="text" value={this.props.query.value} onChange={this.sendQuery} />
      </div>
    );
  }
}
