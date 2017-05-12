import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styles from './Image.css';
import Comments from './Comments';
import apiClient from '../api_client';
import * as imgur from '../constants/imgur_api';

export default class Image extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      image: '',
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    apiClient.init({
      address: imgur.url,
      token: imgur.token,
      pathname: `/3/gallery/image/${this.props.params.id}/comments`,
    }).then((res) => {
      const data = res.data;
      this.setState({ data });
    });
    apiClient.init({
      address: imgur.url,
      token: imgur.token,
      pathname: `/3/image/${this.props.params.id}`,
    }).then((res) => {
      const image = res.data;
      this.setState({ image });
    });
  }
  render() {
    if (typeof this.state.image.link !== 'string') {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Helmet>
          <title>Image</title>
        </Helmet>
        <h1>{this.state.image.title || 'Untitled'}</h1>
        <img className={styles.image} src={this.state.image.link} alt="" />
        <Comments data={this.state.data} />
      </div>
    );
  }
}
