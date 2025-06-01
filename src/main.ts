import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import global styles
import './assets/styles/main.scss'

const app = createApp(App)

// Use router
app.use(router)

// Mount the app
app.mount('#app') 