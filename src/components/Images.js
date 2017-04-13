import React from 'react';
import { connect } from 'react-redux';
import styles from './Images.css';
import httpGet from '../httpGet';
import { setData, setPage, setQuery } from '../actions';

@connect(state => ({
  page: state.page.page,
  query: state.query.query,
  amount: state.page.amount,
  data: state.data.data,
  data_query: state.data.data_query,
  pagination: state.page.pagination,
}))
export default class Images extends React.Component {
  static propTypes = {
    page: React.PropTypes.number,
    pagination: React.PropTypes.number,
    amount: React.PropTypes.number,
    data_query: React.PropTypes.string,
    query: React.PropTypes.string,
    data: React.PropTypes.arrayOf,
    dispatch: React.PropTypes.func,
  }
  static defaultProps = {
    page: 0,
    pagination: 1,
    amount: 8,
    data_query: '',
    query: '',
    data: [],
    dispatch: () => {},
  }
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {
    this.getData();
  }
  componentWillReceiveProps() {
    setTimeout(() => {
      this.getData();
    });
  }
  getData() {
    httpGet(`https://api.imgur.com/3/gallery/search/${this.props.page}?q=polandball ${this.props.query}&q_type=png`, (res) => {
      const data = JSON.parse(res).data;
      const amount = this.props.amount;
      const loadBoundary = this.props.pagination * amount;
      const exceededBoundary = this.props.data.length - loadBoundary < amount;
      const emptyStoreData = this.props.data && this.props.data.length === 0;
      if (data.length === 0) {
        this.props.dispatch(setQuery(''));
      }
      if ((exceededBoundary || emptyStoreData) && data.length !== 0) {
        this.props.dispatch(setData('ADD_DATA', data));
      }
      if (this.props.data_query !== this.props.query) {
        this.props.dispatch(setData('ADD_QUERY', this.props.query));
        this.props.dispatch(setData('UPDATE_DATA', data));
        this.props.dispatch(setPage('RESET_PAGINATION'));
      }
    });
  }
  render() {
    if (this.props.data && this.props.data.length === 0) {
      return <div>Loading...</div>;
    }
    const rows = [];
    const minRange = ((this.props.pagination * this.props.amount) - this.props.amount);
    const maxRange = (this.props.pagination * this.props.amount) - 1;
    for (let i = minRange; i <= maxRange; i += 1) {
      const item = this.props.data[i];
      if (item === undefined) {
        break;
      }
      rows.push(item);
    }
    return (
      <ul className={styles.imagesList}>{
        rows.map(item =>
          <li className={styles.imageListItem}>
            <div className={styles.imageListInfo}>
              <h2 className={styles.imageListHeading}>{item.title}</h2>
              <div>Comments: {item.comment_count}</div>
              <div>Author: {item.account_url}</div>
            </div>
            <img className={styles.image} src={item.link} alt={item.title} />
          </li>,
        )
      }</ul>
    );
  }
}
