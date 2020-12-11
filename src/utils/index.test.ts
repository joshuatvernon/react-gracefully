import { isEmpty, isNil, keys, pickBy, uniq } from './index';

describe('utils', () => {
  describe('isNil', () => {
    test('should return true', () => {
      // given
      const value = null;

      // when
      const actual = isNil(value);

      // then
      expect(actual).toBeTruthy();
    });

    test('should return true', () => {
      // given
      const value = undefined;

      // when
      const actual = isNil(value);

      // then
      expect(actual).toBeTruthy();
    });

    test('should return false', () => {
      // given
      const value = NaN;

      // when
      const actual = isNil(value);

      // then
      expect(actual).toBeFalsy();
    });
  });

  describe('isEmpty', () => {
    test('should return true when value is null', () => {
      // given
      const value = null;

      // when
      const actual = isEmpty(value);

      // then
      expect(actual).toBeTruthy();
    });

    test('should return true when value is empty string', () => {
      // given
      const value = '';

      // when
      const actual = isEmpty(value);

      // then
      expect(actual).toBeTruthy();
    });

    test('should return true when value is empty object', () => {
      // given
      const value = {};

      // when
      const actual = isEmpty(value);

      // then
      expect(actual).toBeTruthy();
    });

    test('should return true when value is empty array', () => {
      // given
      const value: any[] = [];

      // when
      const actual = isEmpty(value);

      // then
      expect(actual).toBeTruthy();
    });

    test('should return false when value is non empty object', () => {
      // given
      const value = { a: '1' };

      // when
      const actual = isEmpty(value);

      // then
      expect(actual).toBeFalsy();
    });

    test('should return false when value is non empty array', () => {
      // given
      const value = [1];

      // when
      const actual = isEmpty(value);

      // then
      expect(actual).toBeFalsy();
    });
  });

  describe('keys', () => {
    test('should return array with objects keys', () => {
      // given
      const value = { one: 1, two: 2, three: 3 };

      // when
      const actual = keys(value);

      // then
      const expected = ['one', 'two', 'three'];
      expect(actual).toMatchObject(expected);
    });
  });

  describe('uniq', () => {
    test('should return array with unique values', () => {
      // given
      const value = ['one', 'one', 'one', 'two', 'two', 'three'];

      // when
      const actual = uniq(value);

      // then
      const expected = ['one', 'two', 'three'];
      expect(actual).toMatchObject(expected);
    });
  });

  describe('pickBy', () => {
    test('should return object with keys with truthy values', () => {
      // given
      const object = { a: 1, b: null, c: 3, d: false, e: undefined };

      // when
      const actual = pickBy(object);

      // then
      const expected = { a: 1, c: 3 };
      expect(actual).toMatchObject(expected);
    });
  });
});
