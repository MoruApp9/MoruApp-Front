import { useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

export const Stars = ({ score, onChange }) => {
    const [userScore, setUserScore] = useState(score);

    const handleStarClick = (index) => {
        setUserScore(index + 1); 
        onChange(index + 1); 
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
