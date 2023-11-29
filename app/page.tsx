import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from 'react';
import { fetchFakeFood } from './lib/data'
import styles from './page.module.css'

export default async function Home() {
  const fakeFood = fetchFakeFood();
  const [foodList] = await Promise.all([fakeFood])
  console.log('foodList: ', foodList)
  return (
    <main className={styles.main}>
      <h1>Shopping List...</h1>
      <ul>
        {foodList.map((item: string, index: any) => 
          <li key={index + item}>{item}</li>  
        )}
      </ul>
    </main>
  )
}
