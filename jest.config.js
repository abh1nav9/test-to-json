// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  // Transform your TS & JS files via ts-jest
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },

  // Whitelist unified and its ESM deps so Jest will transform them too
  transformIgnorePatterns: [
    "/node_modules/(?!(unified|remark-parse|unist|bail|is-plain-obj)/)",
  ],

  // Match any .test.ts or .spec.ts file
  testRegex: "\\.(test|spec)\\.tsx?$",

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
