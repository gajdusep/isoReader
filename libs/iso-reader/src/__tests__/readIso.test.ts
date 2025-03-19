
import { processIsoArrayBuffer } from "../iso-reader";

const MOOF_BOX = Buffer.from("moof");

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
    const arrayBuffer = prepareArrayBuffer([0, 0, 0, 0, ...MOOF_BOX]);
    expect(() => processIsoArrayBuffer(arrayBuffer)).toThrow("Box length is too small: 0");
  });
});