import {useState, useEffect} from 'react';
export default function useLocalStorage(storageKey: string, fallback: any) {
  const [storage, setStorage] = useState(
    typeof window !== "undefined" ? getLocalStorage(storageKey) : '' || []);

  function getLocalStorage(storageKey: string) {//to handle typescript error
    return JSON.parse(localStorage.getItem(storageKey) || '')
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(storage))
  }, [storage, storageKey]);
  return [storage, setStorage];
}