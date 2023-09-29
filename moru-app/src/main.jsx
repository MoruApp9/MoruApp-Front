import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import store from "./redux/store"
import { Provider } from "react-redux"
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain="dev-mnept00qkj4yz84v.us.auth0.com"
        clientId="GSt7hjypueLPGGDpDLTOJrt0B693zEz2"
        redirectUri={window.location.origin}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </Auth0Provider>
    </Provider>
  </React.StrictMode>
)
