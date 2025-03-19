
import { processIsoArrayBuffer } from "../isoReader";

const MOOF_BOX_NAME = Buffer.from("moof");
const MFHD_BOX_NAME = Buffer.from("mfhd");
const TRAF_BOX_NAME = Buffer.from("traf");
const TFHD_BOX_NAME = Buffer.from("tfhd");
const TRUN_BOX_NAME = Buffer.from("trun");
const UUID_BOX_NAME = Buffer.from("uuid");
const MDAT_BOX_NAME = Buffer.from("mdat");
const INVALID_BOX_TYPE = Buffer.from("abcd");

const XML_STRING = Buffer.from('<?xml>');

const prepareArrayBuffer = (array: Array<number>): ArrayBuffer => {
  const arrayBuffer = new ArrayBuffer(array.length);
  const uInt8Array = new Uint8Array(arrayBuffer);
  uInt8Array.set(array, 0);
  return arrayBuffer;
}

describe("Process ISO file", () => {
  let textEncoder: TextEncoder;

  beforeAll(() => {
    textEncoder = new TextEncoder();
  });

  it("Throws Box length too small if box length is less than 8", () => {
    const arrayBuffer = prepareArrayBuffer([0, 0, 0, 0, ...MOOF_BOX_NAME]);
    expect(() => processIsoArrayBuffer(arrayBuffer)).toThrow("Box length is too small: 0");
  });

  it("Throws Box length too big if box length is more than parent length", () => {
    const arrayBuffer = prepareArrayBuffer([0, 0, 0, 255, ...MOOF_BOX_NAME]);
    expect(() => processIsoArrayBuffer(arrayBuffer)).toThrow("Box length is too big: 255");

    const arrayBuffer2 = prepareArrayBuffer([0, 0, 0, 9, ...MOOF_BOX_NAME]);
    expect(() => processIsoArrayBuffer(arrayBuffer2)).toThrow("Box length is too big: 9");
  });

  it("Throws Invalid box type if box is invalid", () => {
    const arrayBuffer = prepareArrayBuffer([0, 0, 0, 12, ...INVALID_BOX_TYPE, 0, 0, 0, 0]);
    expect(() => processIsoArrayBuffer(arrayBuffer)).toThrow("Box type is not valid: ABCD");
  });

  it("Processes correctly formatted ISO file", () => {
    const arrayBuffer = prepareArrayBuffer([
      0, 0, 0, 85, ...MOOF_BOX_NAME,
      0, 0, 0, 10, ...MFHD_BOX_NAME, 1, 2,
      0, 0, 0, 53, ...TRAF_BOX_NAME,
      0, 0, 0, 11, ...TFHD_BOX_NAME, 1, 2, 3,
      0, 0, 0, 15, ...TRUN_BOX_NAME, 1, 2, 3, 4, 5, 6, 7,
      0, 0, 0, 9, ...UUID_BOX_NAME, 1,
      0, 0, 0, 10, ...UUID_BOX_NAME, 1, 2,
      0, 0, 0, 14, ...MDAT_BOX_NAME, ...XML_STRING
    ]);
    const logger = {
      log: jest.fn()
    };
    const result = processIsoArrayBuffer(arrayBuffer, logger);
    expect(logger.log).toHaveBeenCalledTimes(9);
    expect(logger.log).toHaveBeenNthCalledWith(1, "Found box of type MOOF and size 85");
    expect(logger.log).toHaveBeenNthCalledWith(2, "Found box of type MFHD and size 10");
    expect(logger.log).toHaveBeenNthCalledWith(3, "Found box of type TRAF and size 53");
    expect(logger.log).toHaveBeenNthCalledWith(4, "Found box of type TFHD and size 11");
    expect(logger.log).toHaveBeenNthCalledWith(5, "Found box of type TRUN and size 15");
    expect(logger.log).toHaveBeenNthCalledWith(6, "Found box of type UUID and size 9");
    expect(logger.log).toHaveBeenNthCalledWith(7, "Found box of type UUID and size 10");
    expect(logger.log).toHaveBeenNthCalledWith(8, "Found box of type MDAT and size 14");
    expect(logger.log).toHaveBeenNthCalledWith(9, "Content of the MDAT box is: <?xml>");
    expect(result.mdatContent).toBe("<?xml>");
  });
});