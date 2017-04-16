import React from 'react';
import styles from './App.css';
import Images from './Images';
import Navigation from './Navigation';

export default () => (
  <div className={styles.App}>
    <Navigation />
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Gallery</h1>
        <Images />
      </div>
    </main>
  </div>
);
