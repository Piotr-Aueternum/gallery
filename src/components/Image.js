import React from 'react';
import PropTypes from 'prop-types';
import styles from './Image.css';
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
      image: '',
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    httpGet(`https://api.imgur.com/3/gallery/image/${this.props.params.id}/comments`)
      .then((res) => {
        const data = JSON.parse(res).data;
        this.setState({ data });
      });
    httpGet(`https://api.imgur.com/3/image/${this.props.params.id}`)
      .then((res) => {
        const image = JSON.parse(res).data;
        this.setState({ image });
      });
  }
  render() {
    if (typeof this.state.image.link !== 'string') {
      return <div>Loading...</div>;
    }
    function comments(data) {
      return (
        <ul className={styles.comments}>
          {data.map(
            item => (
              <li className={styles.commentsItem}>
                <div className={styles.message}>
                  <div><b>{item.author}</b> {item.ups - item.downs}pts</div>
                  <div className={styles.comment}>{item.comment}</div>
                </div>
                <div className={styles.replies}>{
                  (item.children && Boolean(item.children.length))
                  && comments(item.children)
                }</div>
              </li>
            ),
          )}
        </ul>
      );
    }
    return (
      <div>
        <h1>{this.state.image.title || 'Untitled'}</h1>
        <img className={styles.image} src={this.state.image.link} alt="" />
        {this.props.children}
        {comments(this.state.data)}
      </div>
    );
  }
}
