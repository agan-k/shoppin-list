'use client';

import { useState, useEffect } from 'react';
import styles from './search.module.css'
import { fetchFakeFood } from '../lib/data';

export default function Search() {
  const [query, setQuery] = useState('');
  const [fakeFood, setFakeFood] = useState([]);
  const [currentList, setCurrentList] = useState<string[]>([]);
  
  useEffect(() => {
    const debounceId = setTimeout(() => {
      submitQuery();
    }, 500);
    return () => clearTimeout(debounceId);
   }, [query])

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {target} = e;
    setQuery(target.value)
  }
  function addToTheList(e: React.MouseEvent<HTMLLIElement>) {
    const {target} = e;
    const item = target as HTMLLIElement;
    setCurrentList([
      item.innerText,
      ...currentList
    ]);
  }

  async function submitQuery() {
    if (query.length < 2) {
      setFakeFood([]);
      return;
    }
    setFakeFood(await fetchFakeFood(query));
  }
  
  return (
    <main className={styles.main}>
      <div>
        <form>
          <label>search: </label><br/>
          <input
            type='text'
            name='search'
            placeholder='serach...'
            autoComplete='off'
            value={query}
            onChange={e => onChange(e)}
          />
        </form>
        <ul>
          {query.length > 1 && fakeFood.map((item, index) => 
            <li key={item + index} onClick={e => addToTheList(e)}>{item}</li>
          )}
        </ul>
      </div>
      <div>
        <ul className={styles.list}>
          {currentList.length > 0 && currentList.map((item, index) => 
            <li key={item + index} className={styles.list_item}>
              <span className={styles.list_item__check}>&#9989;</span>
              <span className={styles.list_item__name}>{item}</span>
              <span className={styles.list_item__cross}>&#10007;</span>
            </li>
          )
          }
        </ul>
      </div>
    </main>
  )
}
