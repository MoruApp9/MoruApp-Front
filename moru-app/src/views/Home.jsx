import { useAuth0 } from '@auth0/auth0-react'
import Advertising from '../components/Advertising';

const Home = () => {
    const { loginWithRedirect } = useAuth0();

    return(
        <>
            <button onClick={() => loginWithRedirect()}>Ingresar</button>
            <Advertising/>
        </>
    )
}

export default Home;