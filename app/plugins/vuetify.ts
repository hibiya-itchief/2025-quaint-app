// import this after install `@mdi/font` package
import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import colors from "vuetify/util/colors";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
  });
  app.vueApp.use(vuetify);
});
