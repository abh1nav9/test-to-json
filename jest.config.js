// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },

  transformIgnorePatterns: [
    '/node_modules/(?!(unified|remark-parse|unist|bail|is-plain-obj|trough)/)'
  ],

  testMatch: ['**/tests/**/*.test.ts'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
