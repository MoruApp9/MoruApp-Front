import { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/* import slide1 from '../images/banners/desk/banner1.png';
import slide2 from '../images/banners/desk/banner2.png';
import slide3 from '../images/banners/desk/banner3.png';
import slide4 from '../images/banners/desk/banner4.png';
import slide5 from '../images/banners/desk/banner5.png';
import slide6 from '../images/banners/desk/banner6.png';
import slide7 from '../images/banners/desk/banner7.png';

import slide8 from '../images/banners/mobile/banner7.png'
import slide9 from '../images/banners/mobile/banner8.png'
import slide10 from '../images/banners/mobile/banner9.png'
import slide11 from '../images/banners/mobile/banner10.png'
import slide12 from '../images/banners/mobile/banner11.png'
import slide13 from '../images/banners/mobile/banner12.png' */

const slide1 = 'https://res.cloudinary.com/dsgvvje7v/image/upload/v1697575327/stores-images-front/banners/banners%20desktop/a9e51gma17gaooqidjiq.png';
const slide2 = 'https://res.cloudinary.com/dsgvvje7v/image/upload/v1697575328/stores-images-front/banners/banners%20desktop/nghi4frezxhmwimhf15z.png';
const slide3 = 'https://res.cloudinary.com/dsgvvje7v/image/upload/v1697575327/stores-images-front/banners/banners%20desktop/mwgbvvk1simowdrp811u.png';
const slide4 = 'https://res.cloudinary.com/dsgvvje7v/image/upload/v1697575327/stores-images-front/banners/banners%20desktop/oyrcbftbdrejzybzmpxp.png';
const slide5 = 'https://res.cloudinary.com/dsgvvje7v/image/upload/v1697575327/stores-images-front/banners/banners%20desktop/tc5ttsq2s9ezdrqldlmd.png';
const slide6 = 'https://res.cloudinary.com/dsgvvje7v/image/upload/v1697575326/stores-images-front/banners/banners%20desktop/smbgkqo5grcbp6msu6fe.png';
const slide7 = 'https://res.cloudinary.com/dsgvvje7v/image/upload/v1697575323/stores-images-front/banners/banners%20desktop/pdnth3mj6drqlwp9npid.png';

const slide8 = 'https://res.cloudinary.com/dsgvvje7v/image/upload/v1697575361/stores-images-front/banners/banners%20mobile/a5sbryqw9r8dsgpslvkm.png'
const slide9 = 'https://res.cloudinary.com/dsgvvje7v/image/upload/v1697575361/stores-images-front/banners/banners%20mobile/vjra3pupruxpwpdfrnun.png'
const slide10 =  'https://res.cloudinary.com/dsgvvje7v/image/upload/v1697575361/stores-images-front/banners/banners%20mobile/kdvctqzdxaezazhg8bxr.png'
const slide11 =  'https://res.cloudinary.com/dsgvvje7v/image/upload/v1697575361/stores-images-front/banners/banners%20mobile/fnkmgiqfznfhniwkxim2.png'
const slide12 =  'https://res.cloudinary.com/dsgvvje7v/image/upload/v1697575361/stores-images-front/banners/banners%20mobile/cuyqtcginvcdj0pskirm.png'
const slide13 =  'https://res.cloudinary.com/dsgvvje7v/image/upload/v1697575355/stores-images-front/banners/banners%20mobile/hrkiviqxk2trfonvjsxn.png'


const Advertising = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const sliderRef = useRef(null);

  const isDesktopOrLaptop = window.matchMedia('(min-width: 768px)').matches;

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoplay) {
        sliderRef.current.slickNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const slides = isDesktopOrLaptop 
  ? [slide1, slide2, slide3, slide4, slide5, slide6, slide7]
  : [slide8, slide9, slide10, slide11, slide6, slide12, slide13]

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: autoplay,
    autoplaySpeed: 11000,
    beforeChange: (current, next) => {
      setActiveIndex(next);
    },
    afterChange: (current) => {
      if (!autoplay) {
        setAutoplay(true);
      }
    },
    customPaging: (i) => (
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: i === activeIndex ? "#6B7280" : "#ddd",
        }}
      ></div>
    ),
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
    setAutoplay(false);
    sliderRef.current.slickGoTo(index); 
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings} ref={sliderRef}>
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full">
            <img src={slide} alt={`Slide ${index + 1}`} className="w-full h-full" />
          </div>
        ))}
      </Slider>
      <div className="dots-container">
        <ul style={{ margin: 0, padding: 0, display: "flex", justifyContent: "center", color:"transparent"}}>
          {slides.map((slide, index) => (
            <li
              key={index}
              className={index === activeIndex ? 'active' : ''}
              onClick={() => handleDotClick(index)}
              style={{ listStyle: "none", margin: "20px 5px 0", cursor: "pointer", }}
            >
              <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: index === activeIndex ? "#6B7280" : "#ddd",
              }}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Advertising;