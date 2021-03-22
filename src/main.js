import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import store from "./store/";
import router from './router';

import './assets/index.css'

const app = createApp(App); 

app.config.globalProperties.axios = axios; 
  
app.use(store).use(router).mount("#app");       