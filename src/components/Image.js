import React from 'react';
import PropTypes from 'prop-types';
import styles from './App.css';
import httpGet from '../httpGet';

export default class Image extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    httpGet(`https://api.imgur.com/3/gallery/image/${this.props.params.id}/comments`, (res) => {
      const data = JSON.parse(res).data;
      console.log(data);
      this.setState({ data });
    });
    httpGet(`https://api.imgur.com/3/image/${this.props.params.id}`, (res) => {
      const image = JSON.parse(res).data;
      console.log(image);
    });
  }
  render() {
    return (
      <div className={styles.App}>
        <main className={styles.main}>
          <div className={styles.container}>
            <h1>{this.props.params.id}</h1>
            {this.props.children}
            <ul>{this.state.data.map(item =>
              <li>
                {item.comment}
              </li>,
            )}</ul>
          </div>
        </main>
      </div>
    );
  }
}
