import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack'
    }
  },
  env: {
    PUBLIC_URL: 'https://igorsant.github.io/Apollo',
    REACT_APP_API_URL: 'https://apollo-node-api.herokuapp.com/'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
