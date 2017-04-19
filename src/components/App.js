import React from 'react';
import PropTypes from 'prop-types';
import styles from './App.css';

const App = props => (
  <div className={styles.App}>
    <main className={styles.main}>
      <div className={styles.container}>
        {props.children}
      </div>
    </main>
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
