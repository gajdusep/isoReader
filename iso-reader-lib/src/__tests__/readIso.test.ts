
import { processIso } from "../processIso";

describe("Test", () => {
  let textEncoder: TextEncoder;

  beforeAll(() => {
    textEncoder = new TextEncoder();
  });

  it("basic test", () => {
    textEncoder.encode("0004moof");
    const arrayBuffer = textEncoder.encode("0000moofABCDABCD").buffer;
    const uInt8Array = new Uint8Array(arrayBuffer);
    uInt8Array.set([0, 0, 0, 4], 0);

    console.log(arrayBuffer);
    expect(() => processIso(arrayBuffer)).not.toThrow();
  });
});