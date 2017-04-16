import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPage } from '../actions';

@connect() export default class extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    resetScroll: PropTypes.bool,
    onPrev: PropTypes.string.isRequired,
    onNext: PropTypes.string.isRequired,
    prevName: PropTypes.node,
    nextName: PropTypes.node,
  }
  static defaultProps = {
    resetScroll: false,
    prevName: 'Prev',
    nextName: 'Next',
  }
  constructor(props) {
    super(props);
    this.updatePage = this.updatePage.bind(this);
  }
  updatePage(val) {
    this.props.dispatch(setPage(val));
    if (this.props.resetScroll) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return (
      <div>
        <button onClick={() => (this.updatePage(this.props.onPrev))}>{this.props.prevName}</button>
        <button onClick={() => (this.updatePage(this.props.onNext))}>{this.props.nextName}</button>
      </div>
    );
  }
}
