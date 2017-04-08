import React from 'react';
import styles from './App.css';
import httpGet from '../httpGet';

const START = Symbol('START');
const END = Symbol('END');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.search = this.search.bind(this);
    this.updatePagination = this.updatePagination.bind(this);
    this.state = { data: [], page: 0, tags: 'polandball', query: '' };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    httpGet(`https://api.imgur.com/3/gallery/search/${this.state.page}?q=${this.state.tags} ${this.state.query}&q_type=png`, (res) => {
      const data = JSON.parse(res).data;
      this.setState({ data });
    });
  }
  updatePagination(val) {
    switch (val) {
      case START: {
        this.setState({ page: this.state.page === 0 ? this.state.page : this.state.page - 1 });
        break;
      }
      case END: {
        this.setState({ page: this.state.page + 1 });
        break;
      }
      default: {
        this.setState({ page: this.state.page });
      }
    }
    setTimeout(() => {
      this.getData();
    });
  }
  search(e) {
    const val = e.target.value;
    if (e.target.value !== '') {
      const queryValue = `AND ${val.replace(/( )([A-Za-z])/g, '$1AND $2')}`;
      this.setState({ query: queryValue });
    } else {
      this.setState({ query: val });
    }
    setTimeout(() => {
      this.getData();
    });
  }
  render() {
    if (this.state.data === null) {
      return <div>Loading...</div>;
    }
    const rows = [];
    for (let i = 0; i <= 8; i += 1) {
      const item = this.state.data[i];
      if (item === undefined) {
        break;
      }
      rows.push(item);
    }
    return (
      <div className={styles.App}>
        <button onClick={() => this.updatePagination(START)}>Prev</button>
        <button onClick={() => this.updatePagination(END)}>Next</button>
        <span>{this.state.page}</span>
        <div>
          <label htmlFor="search">Search</label>
          <input id="search" type="text" value={this.state.value} onChange={this.search} />
        </div>
        <ul className={styles.imagesList}>{
          rows.map(item =>
            <li className={styles.imageListItem}>
              <img className={styles.image} src={item.link} alt={item.title} />
            </li>,
          )
        }</ul>
      </div>
    );
  }
}
