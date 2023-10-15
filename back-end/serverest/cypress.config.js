const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://serverest.dev',
    retries: {
        // Configurar novas tentativas para `cypress run`
        // Padrão é 0
        runMode: 2,
        // Configurar novas tentativas para `cypress open`
        // Padrão é 0
        openMode: 1
      }

  },
});