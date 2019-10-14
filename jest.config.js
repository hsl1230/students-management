module.exports = {
  modulePathIgnorePatterns: ['dist'],
  setupFilesAfterEnv: [],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json",
    "node"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  }
  // testResultsProcessor: "jest-bamboo-reporter",
  // setupTestFrameworkScriptFile: "./jestGlobalMocks.ts"
}
