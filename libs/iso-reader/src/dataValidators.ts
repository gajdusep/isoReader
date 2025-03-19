
const BOX_HEADER_LENGTH = 8;
const ISO_VALID_BOX_TYPES = ['MOOF', 'MFHD', 'TRAF', 'TFHD', 'TRUN', 'UUID', 'MDAT'];

export const validateBoxLength = (
  boxLength: number,
  parentLength: number,
  boxHeaderLength = BOX_HEADER_LENGTH
): void => {

  if (boxLength < boxHeaderLength) {
    throw new Error(`Box length is too small: ${boxLength}`);
  }

  if (boxLength > parentLength) {
    throw new Error(`Box length is too big: ${boxLength}`);
  }
}

export const validateBoxType = (
  boxType: string,
  validTypes: string[] = ISO_VALID_BOX_TYPES
): void => {
  if (!validTypes.includes(boxType)) {
    throw new Error(`Box type is not valid: ${boxType}`);
  }
}
