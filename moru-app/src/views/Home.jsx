import { useAuth0 } from '@auth0/auth0-react'

const Home = () => {
    const { loginWithRedirect } = useAuth0();

    return(
        <div>
            <button onClick={() => loginWithRedirect()}>Ingresar</button>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem eius, id amet excepturi fugit ullam labore! Minus non ullam qui quidem maxime asperiores nihil. Animi delectus rerum molestiae modi enim.
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis dolor quasi iure corrupti necessitatibus quia sint quis atque possimus aperiam deleniti nemo doloribus perspiciatis obcaecati, tempore, cum, quod tenetur alias? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea maiores iusto rerum corrupti voluptates dignissimos aliquam optio vel similique, accusamus, non amet in sit ad consequatur eveniet incidunt obcaecati laborum.
</p>
        </div>
/*         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat temporibus odit culpa suscipit ducimus cumque. Officiis a vel vero et? Aut praesentium dolorem placeat optio. Maiores voluptatum ipsa ullam laboriosam.</p>
 */    )
}

export default Home;