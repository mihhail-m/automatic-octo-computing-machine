import { defineConfig } from 'cypress';

// TODO: lots of performance issues with the current config. Need to find ways to optimize it
const config = defineConfig({
  e2e: {
    baseUrl: '',
    specPattern: 'cypress/specs/**.ts',
    numTestsKeptInMemory: 100,
    video: true,
    videoCompression: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 180000,
    taskTimeout: 200000,
    pageLoadTimeout: 199999,
    retries: {
      openMode: 0,
      runMode: 5
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

export default config;
