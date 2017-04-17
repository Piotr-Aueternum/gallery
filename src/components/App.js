import React from 'react';
import styles from './App.css';
import Navigation from './Navigation';

export default props => (
  <div className={styles.App}>
    <main className={styles.main}>
      <Navigation />
      <div className={styles.container}>
        {props.children}
      </div>
    </main>
  </div>
);
