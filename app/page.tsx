'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css'
import ShoppingList from './ui/shopping-list';

export default function Home() {

  return (
    <main className={styles.main}>
      <h1>Sonya&apos;s Shopping List</h1>
      <ShoppingList />
    </main>
  );
}
