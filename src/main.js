import router from './router';
import App from './App.vue';
import {createApp} from 'vue';
import './styles.css';
import  store from './app/services/store';

createApp(App).use(router, store).mount("#app");
