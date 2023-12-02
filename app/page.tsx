'use client';

import { useState } from 'react';
import styles from './page.module.css'
import { fetchFakeFood } from './lib/data';
import ShoppingList from './ui/shopping-list';

export default function Home() {
  
  return (
    <main className={styles.main}>
      <h1>Shopping List</h1>
      <ShoppingList />
    </main>
  );
}
