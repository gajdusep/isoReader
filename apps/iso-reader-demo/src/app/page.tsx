'use client';
import styles from './page.module.css';

import { processIsoArrayBuffer } from 'iso-reader';

export default function Index() {

  const startDemo = () => {
    console.log('start demo');
    const result = processIsoArrayBuffer(new ArrayBuffer(8));
    console.log(result);
  }

  return (
    <div className={styles.page}>
      <h1>ISO reader demo</h1>
      <ul>
        <li>all the important things are happening in the console</li>
        <li>click the button bellow to start the reader demo</li>
      </ul>
      <button onClick={startDemo}>Start demo in console</button>
    </div>
  );
}
