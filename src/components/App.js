import React from 'react';
import styles from './App.css';
import httpGet from '../httpGet';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.updatePagination = this.updatePagination.bind(this);
    this.state = { data: null, page: 0 };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    httpGet(`https://api.imgur.com/3/gallery/search/${this.state.page}?q=polandball`, (res) => {
      const data = JSON.parse(res).data;
      this.setState({ data });
    });
  }
  updatePagination(val) {
    switch (val) {
      case 'start': {
        this.setState({ page: this.state.page === 0 ? this.state.page : this.state.page - 1 });
        break;
      }
      case 'end': {
        this.setState({ page: this.state.page + 1 });
        break;
      }
      default: {
        this.setState({ page: this.state.page });
        break;
      }
    }
    this.getData();
  }
  render() {
    if (this.state.data === null) {
      return <div>Loading...</div>;
    }
    return (
      <div className={styles.App}>
        <button onClick={() => this.updatePagination('start')}>Prev</button>
        <button onClick={() => this.updatePagination('end')}>Next</button>
        <span>{this.state.page}</span>
        <ul className={styles.imagesList}>{
          this.state.data.map(item =>
            <li>
              <img className={styles.image} src={item.link} alt={item.title} />
            </li>,
          )
        }</ul>
      </div>
    );
  }
}
