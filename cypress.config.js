const { defineConfig } = require("cypress");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        'seed:db': async () => {
          if (process.env.GITHUB_ACTIONS === 'true') {
            await exec(`docker exec ${process.env.SERVICE_CONTAINER} npm run seed`)
          } else {
            await exec('cd backend && npm run seed')
          }

          return true
        }
      })
    },
  },
});
