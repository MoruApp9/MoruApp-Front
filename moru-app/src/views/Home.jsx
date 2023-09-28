import { useAuth0 } from '@auth0/auth0-react'
import Advertising from '../components/Advertising';
import { LogOutButton } from '../components/LogOut'
import { Profile } from '../components/Profile'

const Home = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return(
        <div>
            <div>
                {isAuthenticated ? <>
                    <LogOutButton /> 
                    <Profile /> 
                    </>
                    : <button onClick={() => loginWithRedirect()}>Ingresar</button>}
            </div>
            <div>
                <Advertising/>            
            </div>
        </div>
        
            
    )
}

export default Home;


