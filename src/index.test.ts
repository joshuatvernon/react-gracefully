import grace, { GraceProvider, Hide, Show, useGrace } from './index';

describe('react-gracefully', () => {
  describe('grace', () => {
    test('contains express', () => {
      // given/when/then
      expect(grace).toHaveProperty('express');
    });
  });

  describe('exports', () => {
    test('GraceProvider', () => {
      // given/when/then
      expect(GraceProvider).toBeDefined();
    });

    test('Hide', () => {
      // given/when/then
      expect(Hide).toBeDefined();
    });

    test('Show', () => {
      // given/when/then
      expect(Show).toBeDefined();
    });

    test('useGrace', () => {
      // given/when/then
      expect(useGrace).toBeDefined();
    });
  });
});
