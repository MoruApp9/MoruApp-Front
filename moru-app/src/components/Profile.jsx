import { useAuth0 } from '@auth0/auth0-react'

export const Profile = () => {
    const {user, isAuthenticated, isLoading} = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>
    }

    return(
        isAuthenticated && (
            <div>
                <h1>{user.name}</h1>
                <h3>{user.email}</h3>
            </div>
        )
    )
}