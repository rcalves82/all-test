const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://serverest.dev',
    retries: {
      // Configure new efforts to `cypress run`
      // Default é 0
      runMode: 2,
      // Configure new efforts to `cypress open`
      // Default é 0
      openMode: 1
    },
    video: true

  },
});