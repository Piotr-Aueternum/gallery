import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styles from './App.css';

const App = props => (
  <div className={styles.App}>
    <Helmet>
      <title>Gallery</title>
    </Helmet>
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
