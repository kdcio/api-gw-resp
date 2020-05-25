module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['text', 'lcov'],
  collectCoverageFrom: ['src/**/*.js'],
};
