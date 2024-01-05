import { createRoot } from 'svelte'
import App from './App.svelte'

const app = createRoot(App, {target: document.querySelector('#app')})

export default app
