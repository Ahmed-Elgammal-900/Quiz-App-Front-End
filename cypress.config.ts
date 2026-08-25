import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: "https://quiz-app-front-end-omega.vercel.app",
    setupNodeEvents(on, config) {},
  },
});
