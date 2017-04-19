import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

@connect() export default class extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    resetScroll: PropTypes.bool,
    onPrev: PropTypes.string.isRequired,
    onNext: PropTypes.string.isRequired,
    prevName: PropTypes.node,
    nextName: PropTypes.node,
    action: PropTypes.func.isRequired,
    className: PropTypes.string,
  }
  static defaultProps = {
    resetScroll: false,
    prevName: 'Prev',
    nextName: 'Next',
    className: '',
  }
  constructor(props) {
    super(props);
    this.updatePage = this.updatePage.bind(this);
  }
  updatePage(val) {
    this.props.dispatch(this.props.action(val));
    if (this.props.resetScroll) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return (
      <div className={this.props.className}>
        <button onClick={() => (this.updatePage(this.props.onPrev))}>{this.props.prevName}</button>
        <button onClick={() => (this.updatePage(this.props.onNext))}>{this.props.nextName}</button>
      </div>
    );
  }
}
