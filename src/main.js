import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import Route from "./router/index.js";
import Store from "./store/index.js";

const app = createApp(App);

app.use(Route); //adding route to app
app.use(Store); //adding vuex storage

app.mount("#app");
