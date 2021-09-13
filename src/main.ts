import { createApp } from 'vue'
// 引入组件库
import NaiveComp from './plugins/comp-entry'
// 初始化VUE
import App from './App.vue'

const app = createApp(App)
app.use(NaiveComp)
app.mount('#app')
