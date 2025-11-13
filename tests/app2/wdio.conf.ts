export const config: WebdriverIO.Config = {
  runner: 'local',
  tsConfigPath: './tsconfig.json',
  specs: [
    './test/specs/**/*.ts'
  ],
  capabilities: [{
    browserName: 'chrome'
  }],
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 100000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
}
