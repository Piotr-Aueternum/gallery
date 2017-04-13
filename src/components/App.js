import React from 'react';
import { connect } from 'react-redux';
import styles from './App.css';
import httpGet from '../httpGet';
import Pagination from './Pagination';
import Search from './Search';
import Images from './Images';
import { setData } from '../actions';

@connect(state => ({
  page: state.page.page,
  query: state.query.query,
  amount: state.page.amount,
  data: state.data.data,
  pagination: state.page.pagination,
}))
export default class App extends React.Component {
  static propTypes = {
    page: React.PropTypes.number,
    pagination: React.PropTypes.number,
    amount: React.PropTypes.number,
    query: '',
    data: React.PropTypes.arrayOf,
    dispatch: React.PropTypes.func,
  }
  static defaultProps = {
    page: 0,
    pagination: 1,
    amount: 8,
    query: '',
    data: [],
    dispatch: () => {},
  }
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.state = { data: [], tags: 'polandball', query: '' };
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
    httpGet(`https://api.imgur.com/3/gallery/search/${this.props.page}?q=${this.state.tags} ${this.props.query}&q_type=png`, (res) => {
      const data = JSON.parse(res).data;
      const amount = this.props.amount;
      const actualBoundary = this.props.pagination * amount;
      if ((this.props.data.length - actualBoundary < amount)
      || (this.props.data && this.props.data.length === 0)) {
        this.props.dispatch(setData('ADD_DATA', data));
      }
    });
  }
  render() {
    const minRange = ((this.props.pagination * this.props.amount) - this.props.amount) + 1;
    const maxRange = (this.props.pagination * this.props.amount);
    return (
      <div className={styles.App}>
        <header className={styles.header}>
          <nav className={styles.headerNav}>
            <Search />
            <Pagination />
          </nav>
          <div>{minRange} - {maxRange}</div>
        </header>
        <main className={styles.main}>
          <div className={styles.container}>
            <h1>Gallery</h1>
            <Images />
          </div>
        </main>
      </div>
    );
  }
}
