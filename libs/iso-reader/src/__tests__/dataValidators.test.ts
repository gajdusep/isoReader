import { validateBoxLength, validateBoxType } from "../dataValidators";

describe('validateBoxLength', () => {
  it('validates box length - throws when too small', () => {
    expect(() => validateBoxLength(5, 0, 6)).toThrow('Box length is too small');
    expect(() => validateBoxLength(0, 0)).toThrow('Box length is too small');
  });

  it('validates box length - throws when too big', () => {
    expect(() => validateBoxLength(60, 50)).toThrow('Box length is too big');
    expect(() => validateBoxLength(5, 2, 4)).toThrow('Box length is too big');
  });

  it('validates box length - ok size does not throw', () => {
    expect(() => validateBoxLength(8, 40)).not.toThrow();
    expect(() => validateBoxLength(4, 40, 2)).not.toThrow();
  });
});

describe('validateBoxType', () => {
  it('validates box type - throws when invalid', () => {
    expect(() => validateBoxType('TRAF', ['MOOF'])).toThrow('Box type is not valid');
  });

  it('validates box type - does not throw when valid', () => {
    expect(() => validateBoxType('MOOF', ['MOOF', 'TRAF'])).not.toThrow();
    expect(() => validateBoxType('TRAF', ['MOOF', 'TRAF'])).not.toThrow();
  });

});