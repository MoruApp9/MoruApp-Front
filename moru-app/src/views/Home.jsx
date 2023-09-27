import { useAuth0 } from '@auth0/auth0-react'

const Home = () => {
    const { loginWithRedirect } = useAuth0();

    return(
        <button onClick={() => loginWithRedirect()}>Ingresar</button>
    )
}

export default Home;