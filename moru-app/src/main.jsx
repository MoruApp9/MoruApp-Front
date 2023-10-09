import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import store from "./redux/store"
import { Provider } from "react-redux"
import { Auth0Provider } from "@auth0/auth0-react"
const URL = import.meta.env.VITE_URL_AUTH0;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain="dev-mnept00qkj4yz84v.us.auth0.com"
        clientId="GSt7hjypueLPGGDpDLTOJrt0B693zEz2"
        authorizationParams={{
          redirect_uri: `${URL}`,
        }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
)
