import router from './router';
import App from './App.vue';
import {createApp} from 'vue';
import './styles.css';

createApp(App).use(router).mount("#app");
