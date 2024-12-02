import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'

// Redux
// import store from '@redux/store.js';

// redux toolkit
import store from '@redux-toolkit/store.js'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={ store }>
    <App />
  </Provider>
  // </StrictMode>
)
