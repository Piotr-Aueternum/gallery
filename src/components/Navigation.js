import React from 'react';
import PropTypes from 'prop-types';
import styles from './Navigation.css';

export default function Navigation(props) {
  return (
    <header className={styles.header}>
      <nav className={styles.headerNav}>
        {props.children}
      </nav>
    </header>
  );
}
Navigation.propTypes = {
  children: PropTypes.node.isRequired,
};
