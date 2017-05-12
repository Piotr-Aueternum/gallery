import React from 'react';
import PropTypes from 'prop-types';
import styles from './Image.css';
import Comment from './Comment';

export default class Comments extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
  }
  static defaultProps = {
    data: [],
  }
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  render() {
    return (
      <ul className={styles.comments}>
        {this.props.data.map(
          (item, index) => (
            <Comment item={item} key={index}>{
              (item.children && Boolean(item.children.length))
              && <Comments data={item.children} />
            }</Comment>
          ),
        )}
      </ul>
    );
  }
}
