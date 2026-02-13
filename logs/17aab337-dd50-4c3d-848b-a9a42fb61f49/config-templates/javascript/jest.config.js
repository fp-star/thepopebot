// Jest Configuration for JavaScript/TypeScript Projects

module.exports = {
  // Test environment
  testEnvironment: 'node', // Use 'jsdom' for browser/React testing
  
  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  
  // Coverage configuration
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Files to collect coverage from
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*.spec.{js,jsx,ts,tsx}',
    '!src/**/index.{js,ts}',
    '!src/**/__tests__/**',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  
  // Module paths
  moduleDirectories: ['node_modules', 'src'],
  
  // Module name mapper for aliases
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  
  // Transform files
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // If using TypeScript
    '^.+\\.jsx?$': 'babel-jest',
  },
  
  // Ignore patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
  ],
  
  // Verbose output
  verbose: true,
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Restore mocks between tests
  restoreMocks: true,
  
  // Timeout for tests
  testTimeout: 10000,
  
  // Globals (if using TypeScript)
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
