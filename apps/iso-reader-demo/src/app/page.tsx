'use client';
import { useState } from 'react';
import styles from './page.module.css';

import { processIsoArrayBuffer } from 'iso-reader';

const parseImages = (mdatContent: string): Array<string> => {
  const smpteRegex = /<smpte:image.*>([.\s\S]*?)<\/smpte:image>/g;
  const images = mdatContent.match(smpteRegex);
  if (!images) {
    return [];
  }
  console.log(images.length)

  const imageBase64s = [];
  for (const image of images) {
    const imageSplit = image.split('\n');
    const imageBase64 = imageSplit[1];
    imageBase64s.push(imageBase64);
  }

  return imageBase64s;
}


export default function Index() {
  const [images, setImages] = useState<Array<string>>([]);
  const [error, setError] = useState<any>(null);

  const startDemo = async () => {
    console.log('Demo started');
    setError(null);
    setImages([]);

    try {
      const fetchedIsoFile = await fetch('https://demo.castlabs.com/tmp/text0.mp4');
      const isoArrayBuffer = await fetchedIsoFile.arrayBuffer();
      const mdatResult = processIsoArrayBuffer(isoArrayBuffer, console);
      const images = parseImages(mdatResult.mdatContent || '');
      setImages(images);
    }
    catch (e) {
      console.error('Error:', e);
      setError(e);
    }

    console.log('Demo finished');
  }

  return (
    <div className={styles.page}>
      <h1>ISO reader demo</h1>
      <ul>
        <li>all the important things are happening in the console</li>
        <li>click the button bellow to start the reader demo</li>
      </ul>
      <button onClick={startDemo}>Start demo in console</button>
      {error && <div>Error: {error.message}</div>}
      {images.map((image, index) => (
        <img width={300} key={`image${index}`} src={`data:image/png;base64, ${image}`} />
      ))}
    </div>
  );
}
