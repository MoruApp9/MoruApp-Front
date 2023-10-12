import { useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

export const Stars = ({ score, onChange }) => {
    const [userScore, setUserScore] = useState(score);

    const handleStarClick = (index) => {
        setUserScore(index + 1); // calificación comienza en 1
        onChange(index + 1); // Llama a la función de devolución de llamada para actualizar el estado de la calificación en el componente principal
    };

    return (
        <div className='flex text-purple-moru'>
            {[...new Array(5)].map((_, index) => {
                return (
                    <div key={index} onClick={() => handleStarClick(index)}>
                        {index < userScore ? <AiFillStar /> : <AiOutlineStar />}
                    </div>
                );
            })}
        </div>
    );
};
