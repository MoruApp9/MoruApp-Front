import { Link } from "react-router-dom"
import logo from '../images/image.png'

const CreateCount = () => {
  return (
    <div>
      <img src={logo} alt="moruLogo" />
      <h2>Crear Cuenta</h2>
      <p>Fill out the information below in order to access your account</p>
      <form action="">
        <input type="email" placeholder="Escribe tu correo" />
        <input type="password" placeholder="Crea una contraseña" />
        <button>Sign In</button>
        <label htmlFor="googleBtn">Or sign in with</label>
        <button id="googleBtn">Continue with Google</button>
        <Link><button>Forgot Password?</button></Link>
      </form>
    </div>
  )
}

export default CreateCount
