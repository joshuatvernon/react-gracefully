module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/*.d.ts', '!./*.js'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['node_modules', 'coverage', 'lib'],
  coverageReporters: ['json', 'json-summary', 'text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 99,
      functions: 99,
      lines: 99,
      statements: 99
    }
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  snapshotSerializers: ['@emotion/jest/enzyme-serializer'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/lib/']
};
