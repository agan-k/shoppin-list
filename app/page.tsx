'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css'
import ShoppingList from './ui/shopping-list';

export default function Home() {
  const [showShoppinegList, setshowShoppinegList] = useState(false);
  
  useEffect(() => {
    setshowShoppinegList(true);
  }, []);
  
  if (!showShoppinegList) {
    // TODO: show some kind of placeholder UI here
    return null;
  }
  return (
    <main className={styles.main}>
      <h1>Shopping List</h1>
      <ShoppingList />
    </main>
  );
}
