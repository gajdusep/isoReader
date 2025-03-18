
import fs from 'fs';
import { processIso } from './processIso';

const readArrayBuffer = () => {
  const arrayBuffer = fs.readFileSync('./../text0.mp4').buffer;
  processIso(arrayBuffer);
}

readArrayBuffer();
