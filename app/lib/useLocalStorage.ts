import {useState, useEffect} from 'react';

export default function useLocalStorage(storageKey: string, fallback: any) {
  const [storage, setStorage] = useState(
    JSON.parse(localStorage.getItem(storageKey)) || fallback);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(storage))
  }, [storage, storageKey]);
  return [storage, setStorage];
}