import slide1 from '../images/slide.png'
import slide2 from '../images/slide2.png'
import slide3 from '../images/slide3.png'
import slide4 from '../images/slide4.png'
import slide5 from '../images/slide5.png'

import React, { useState, useEffect } from 'react';

const Advertising = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          setActiveIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
        }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slides = [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5
    // Agrega más imágenes si es necesario
  ];

  return (
    <div className="slider rounded-lg  w-full">
      <div className="slides w-full h-72 md:h-102 relative">
        {slides.map((_, index) => (
          <input
            key={index}
            type="radio"
            name="radio-btn"
            className="radio-btn"
            id={`radio${index + 1}`}
            checked={index === activeIndex}
            onChange={() => setActiveIndex(index)}
          />
        ))}

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide w-full h-72 md:h-102 absolute top-0 ${
              index === activeIndex ? 'left-0' : '-left-full'
            } transition-transform duration-2000`}
          >
            <img src={slide} alt={`Slide ${index + 1}`} className="w-full h-full" />
          </div>
        ))}
      </div>

      <div className="navigation-auto absolute mt-2 flex justify-center w-full">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`auto-btn${index + 1} border-2 border-purple-moru p-1 md:p-2 md:mt-2 rounded-full cursor-pointer transition duration-1000 ${
              index === activeIndex ? 'bg-purple-moru' : ''
            }`}
            style={{ marginRight: '2px' }}
          />
        ))}
      </div>
      
      <div className="navigation-manual mt-2 md:mt-4 flex justify-center">
        {slides.map((_, index) => (
          <label
            key={index}
            htmlFor={`radio${index + 1}`}
            className={`manual-btn border-2 border-purple-moru p-1 md:p-2 rounded-full cursor-pointer transition duration-1000 ${
              index === activeIndex ? 'bg-purple-moru' : ''
            }`}
            style={{ marginRight: '2px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Advertising;