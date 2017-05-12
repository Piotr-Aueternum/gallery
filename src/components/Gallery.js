import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Images from './Images';
import Navigation from './Navigation';
import Pagination from './Pagination';
import { setPage } from '../actions';
import styles from './Gallery.css';

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
      <div>
        <Helmet>
          <title>Gallery</title>
        </Helmet>
        <Navigation>
          <div className={styles.searchbar}>
            <Pagination
              action={setPage}
              onPrev="PREV_PAGINATION"
              onNext="NEXT_PAGINATION"
              resetScroll
            />
          </div>
          <div className={styles.pagination}>{minRange} - {maxRange}</div>
        </Navigation>
        <h1>Gallery</h1>
        <Images />
      </div>
    );
  }
}
