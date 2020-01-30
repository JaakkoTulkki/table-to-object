module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  preset: 'ts-jest',
  moduleFileExtensions: [
    "ts",
    "json",
    "js",
  ],
};