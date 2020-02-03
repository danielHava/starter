module.exports = {
  reporters: ['default', 'jest-junit'],
  name: 'template-api',
  verbose: true,
  setupFiles: ['dotenv/config'],
  roots: ['./'],
  setupFilesAfterEnv: ['jest-extended', 'jest-chain']
};
