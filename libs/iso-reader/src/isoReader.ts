import { validateBoxLength, validateBoxType } from "./dataValidators";

const BOX_TYPES_CONTAINING_BOXES = ['MOOF', 'TRAF']

interface Logger {
  log: (message: string) => void;
}

type IsoContentParsed = {
  mdatContent?: string;
}

export const processIsoArrayBuffer = (
  arrayBuffer: ArrayBuffer, logger?: Logger
): IsoContentParsed => {
  const dataView = new DataView(arrayBuffer);
  const uInt8Array = new Uint8Array(arrayBuffer);
  const textDecoder = new TextDecoder();

  let mdatContent: string | undefined = undefined;

  const stack: Array<{
    offset: number,
    length: number
  }> = [];
  stack.push({
    offset: 0,
    length: arrayBuffer.byteLength
  })

  while (stack.length > 0) {
    const item = stack.pop();
    if (!item) {
      break;
    }

    const boxLength = dataView.getUint32(item.offset);
    const boxType = (textDecoder.decode(uInt8Array.subarray(item.offset + 4, item.offset + 8))).toUpperCase();

    validateBoxLength(boxLength, item.length);
    validateBoxType(boxType);

    logger?.log(`Found box of type ${boxType} and size ${boxLength}`);

    if (boxType === 'MDAT') {
      const decodedMdat = textDecoder.decode(uInt8Array.subarray(item.offset + 8, item.offset + boxLength));
      mdatContent = decodedMdat;
      logger?.log(`Content of the MDAT box is: ${decodedMdat}`);
    }

    const shouldSplitInTwoHalfs = boxLength - 8 <= item.length && boxLength < item.length;
    if (shouldSplitInTwoHalfs) {
      stack.push({
        offset: item.offset + boxLength,
        length: item.length - boxLength
      })
    }

    const shouldAddChildren = BOX_TYPES_CONTAINING_BOXES.includes(boxType);
    if (shouldAddChildren) {
      stack.push({
        offset: item.offset + 8,
        length: boxLength - 8
      })
    }
  }

  return {
    mdatContent
  };
}