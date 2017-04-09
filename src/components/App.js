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
    this.updateImages = this.updateImages.bind(this);
    this.state = { data: [], page: 0, imagesIndex: 1, amountPerView: 8, tags: 'polandball', query: '' };
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
  updateImages(val) {
    const imagesIndex = this.state.imagesIndex;
    const amountPerView = this.state.amountPerView;
    switch (val) {
      case START: {
        this.setState({
          imagesIndex: imagesIndex === 1 ? imagesIndex : imagesIndex - amountPerView,
        });
        break;
      }
      case END: {
        this.setState({ imagesIndex: imagesIndex + this.state.amountPerView });
        break;
      }
      default: {
        this.setState({ imagesIndex });
      }
    }
  }
  updatePagination(val) {
    const page = this.state.page;
    switch (val) {
      case START: {
        this.setState({ page: page === 0 ? page : page - 1 });
        break;
      }
      case END: {
        this.setState({ page: page + 1 });
        break;
      }
      default: {
        this.setState({ page });
      }
    }
    setTimeout(() => {
      this.getData();
    });
  }
  search(e) {
    const val = e.target.value;
    if (e.target.value !== '') {
      const queryValue = `AND ${val.replace(/( )([A-Za-z])/g, '$1OR $2')}`;
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
    const imagesIndex = this.state.imagesIndex;
    const amountPerView = this.state.amountPerView;
    for (let i = imagesIndex - 1; i <= imagesIndex + amountPerView; i += 1) {
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
        <button onClick={() => this.updateImages(START)}>Prev</button>
        <button onClick={() => this.updateImages(END)}>Next</button>
        <span>{imagesIndex} - {(imagesIndex + amountPerView) - 1}</span>
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
