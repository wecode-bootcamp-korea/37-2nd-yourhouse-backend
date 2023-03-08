module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  rootDir: ".",
  testRegex: ".*\\.e2e-test\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
};
