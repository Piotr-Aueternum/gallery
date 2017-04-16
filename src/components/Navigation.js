import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './Navigation.css';
import Pagination from './Pagination';
import Search from './Search';

@connect(state => ({
  amount: state.page.amount,
  pagination: state.page.pagination,
}))
export default class extends React.Component {
  static propTypes = {
    pagination: PropTypes.number,
    amount: PropTypes.number,
  }
  static defaultProps = {
    pagination: 1,
    amount: 8,
  }
  render() {
    const minRange = ((this.props.pagination * this.props.amount) - this.props.amount) + 1;
    const maxRange = (this.props.pagination * this.props.amount);
    return (
      <header className={styles.header}>
        <nav className={styles.headerNav}>
          <Search id="search" />
          <Pagination
            onPrev="PREV_PAGINATION"
            onNext="NEXT_PAGINATION"
            resetScroll
          />
        </nav>
        <div>{minRange} - {maxRange}</div>
      </header>
    );
  }
}
