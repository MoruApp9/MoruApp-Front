import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import slide1 from '../images/slide.png';
import slide2 from '../images/slide2.png';
import slide3 from '../images/slide3.png';
import slide4 from '../images/slide4.png';
import slide5 from '../images/slide5.png';

function Arrow(props) {
    const { className, style, onClick } = props;
    const arrowStyle = {
        ...style,
        width: "25px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "gray",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
      };
    return (
      <div
        className={className}
        style={arrowStyle}
        onClick={onClick}
      />
    );
}


const Categories = () => {
  const categories = [
    { img: slide1, category: 'Moda y Ropa' },
    { img: slide2, category: 'Restaurante' },
    { img: slide3, category: 'Fitness y Deporte' },
    { img: slide4, category: 'Hogar y Decoraciones' },
    { img: slide5, category: 'Herramientas' },
    { img: slide1, category: 'Moda y Ropa' },
    { img: slide2, category: 'Restaurante' },
    { img: slide3, category: 'Fitness y Deporte' },
    { img: slide4, category: 'Hogar y Decoraciones' },
    { img: slide5, category: 'Herramientas' },
    { img: slide1, category: 'Moda y Ropa' },
    { img: slide2, category: 'Restaurante' },
    { img: slide3, category: 'Fitness y Deporte' },
    { img: slide4, category: 'Hogar y Decoraciones' },
    { img: slide5, category: 'Herramientas' },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    initialSlide:0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 630,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 515,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 360,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
    ],
  };

  return (
    <div>
        <h1 className='ml-4 lg:ml-28 py-4 text-2xl md:text-3xl font-roboto-slab'>Categorias</h1>
        <div className="w-full px-10 lg:px-36 py-2">
            <Slider {...settings} >
                {categories.map((category, index) => (
                <div key={index} className="flex flex-col items-center px-2">
                    <img
                    src={category.img}
                    alt={category.category}
                    className="rounded mx-auto mb-2 w-28 h-28 object-cover sm:w-24 sm:h-24 md:w-40 md:h-40 "
                    />
                    <p className="text-center text-lg md:text-xl">{category.category}</p>
                </div>
                ))}
            </Slider>
        </div>
    </div>
  );
}

export default Categories;