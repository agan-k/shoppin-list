'use client';

import { useState, useEffect } from 'react';
import styles from './shoppig-list.module.css'
import { fetchFakeFood } from '../lib/data';
type LItem = {
  id: string,
  name: string,
  active: boolean,
  checked: boolean,
}

export default function ShoppingList() {
  const [query, setQuery] = useState('');
  const [fetchedFood, setFetchedFood] = useState([]);
  const [currentList, setCurrentList] = useState<LItem[]>([]);
  
  useEffect(() => {
    const debounceId = setTimeout(() => {
      submitQuery();
    }, 200);
    return () => clearTimeout(debounceId);
   }, [query])

  async function submitQuery() {
    if (query.length < 2) {
      setFetchedFood([]);
      return;
    }
    setFetchedFood(await fetchFakeFood(query));
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {target} = e;
    setQuery(target.value)
  }
  
  function handleAddWithEnter(e: React.FormEvent<HTMLFormElement>) {
    if (query.length < 2) return;
    e.preventDefault();
    let name: string;
    const queryHasSpace: boolean = Boolean(query[query.length -1] === ' ');
    const queryHasMatch: boolean = Boolean(fetchedFood.length != 0);
    if (queryHasSpace || !queryHasMatch) {
      name = query;
    } else {
      name = fetchedFood[0];
    }
    setCurrentList([
      {
        id: crypto.randomUUID(),
        name: name,
        active: true,
        checked: false
      },
      ...currentList
    ]);
    setQuery('');
  }
  
  function handleAddWithClick(e: React.MouseEvent) {
    const {target} = e;
    const item = target as HTMLLIElement;
    setCurrentList([
      {
        id: crypto.randomUUID(),
        name: item.innerText,
        active: true,
        checked: false
      },
      ...currentList
    ]);
    setQuery('');
  }

  function updateListItem(id: string, action: string) {
    const newCurrentList = [...currentList];
    const nextList = newCurrentList.map(item => {
      if (item.id === id) {
        if (action === 'checked') return {...item, checked: !item.checked}
        return {...item, active: !item.active}
      }
      return item;
    })
    setCurrentList(nextList)
  }
  
  return (
    <main className={styles.main}>
      <div className={styles.search_container}>
        <form onSubmit={(e) => handleAddWithEnter(e)}>
          <label>add items:{' '}</label>
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
          {query.length > 1 && fetchedFood.map((item, index) => 
            <li key={item + index} onClick={e => handleAddWithClick(e)}>{item}</li>
          )}
        </ul>
      </div>
      <div className={styles.list_container}>
        <ul>
          {currentList.length > 0 && currentList.map((item, index) => 
            <li 
              key={item.id} 
              className={
                `${item.checked ? styles.list_item__checked : styles.list_item} 
                ${!item.active ? styles.list_item__inactive : '' }`
              }
            >
              <span className={styles.list_item_name}>{item.name}</span>
              <div className={styles.toggle_wrapper}>
                <span 
                  onClick={() => updateListItem(item.id, 'checked')} 
                  className={styles.list_item_check}>&#9989;
                </span>
                <span 
                  onClick={() => updateListItem(item.id, 'crossed')}
                  className={styles.list_item_cross}>&#10007;
                </span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </main>
  )
}
