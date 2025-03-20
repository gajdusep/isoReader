

export const parseImages = (mdatContent: string): Array<string> => {
  const smpteRegex = /<smpte:image.*>([.\s\S]*?)<\/smpte:image>/g;
  const images = mdatContent.match(smpteRegex);
  if (!images) {
    return [];
  }

  const imageBase64s = [];
  for (const image of images) {
    const imageSplit = image.split('\n');
    if (imageSplit.length < 2) {
      continue;
    }
    const imageBase64 = imageSplit[1];
    imageBase64s.push(imageBase64);
  }

  return imageBase64s;
}

