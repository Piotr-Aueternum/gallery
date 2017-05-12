import React from 'react';
import PropTypes from 'prop-types';
import styles from './Comment.css';


const Comment = props => (
  <li className={styles.comment}>
    <div className={styles.message}>
      <div><b>{props.item.author}</b> {props.item.ups - props.item.downs}pts</div>
      <div className={styles.commentMsg}>{props.item.comment}</div>
    </div>
    <div className={styles.replies}>{props.children}</div>
  </li>
);
Comment.propTypes = {
  item: PropTypes.shape({
    author: PropTypes.string.isRequired,
    ups: PropTypes.number.isRequired,
    downs: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node,
};
Comment.defaultProps = {
  children: '',
};
export default Comment;
