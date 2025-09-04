import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { store } from './redux/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google';
const CLIENT_ID = "154012656254-82c8b80m6813ot9ipushc0qefu42a088.apps.googleusercontent.com"


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <App />
    </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
)
