export default {
  collectCoverageFrom: ['lib/**/*'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js'],
  testRegex: '\\.test\\.js$',
  testEnvironment: 'node',
  verbose: true,
};
