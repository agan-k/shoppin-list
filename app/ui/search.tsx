'use client';

import { useState, useEffect } from 'react';
import styles from './search.module.css'
import { fetchFakeFood } from '../lib/data';
type LItem = {
  id: string,
  name: string,
  active: boolean,
  checked: boolean,
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [fakeFood, setFakeFood] = useState([]);
  const [currentList, setCurrentList] = useState<LItem[]>([]);
  console.log(currentList)
  
  useEffect(() => {
    const debounceId = setTimeout(() => {
      submitQuery();
    }, 200);
    return () => clearTimeout(debounceId);
   }, [query])

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {target} = e;
    setQuery(target.value)
  }
  
  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (query.length < 2) return;
    e.preventDefault();
    setCurrentList([
      {
        id: crypto.randomUUID(),
        name: query,
        active: true,
        checked: false
      },
      ...currentList
    ]);
    setQuery('');
  }
  
  function addToTheList(e: React.MouseEvent) {
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

  async function submitQuery() {
    if (query.length < 2) {
      setFakeFood([]);
      return;
    }
    setFakeFood(await fetchFakeFood(query));
  }
  
  return (
    <main className={styles.main}>
      <div className={styles.search_container}>
        <form onSubmit={(e) => onFormSubmit(e)}>
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
