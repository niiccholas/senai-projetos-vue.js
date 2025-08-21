import './assets/main.css' // O import main.css chama automaticamente o css ativado

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

import { ref } from 'vue'

const message = ref('Hello World!')
message.value = 'Changed'
