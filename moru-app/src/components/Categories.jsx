import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCategory, getProducts, getCategorias } from '../services/services';
import { setCategorias } from '../redux/categoriesSlice';

function Arrow(props) {
    const { className, style, onClick } = props;
    const arrowStyle = {
        ...style,
        width: "25px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#280a50",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        cursor: "pointer"
    };
    return (
        <div
            className={className}
            style={arrowStyle}
            onClick={onClick}
        />
    );
}

const Categories = ({ getProductsByCategory }) => {
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const categorias = useSelector((state) => state.categories.categorias)

    useEffect(() => {
        const fetchData = async () => {  
            try {
                const data = await getCategorias()
                dispatch(setCategorias(data));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [dispatch])


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
        initialSlide: 0,
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

    const handleClickCategoria = (generalCategory) => {
        navigate(`/products/${generalCategory}`);
    };

    return (
        <div className='font-roboto-slab'>
            <h1 className=' text-purple-moru ml-4 lg:ml-28 py-4 text-2xl md:text-3xl'>¿Que estas buscando?</h1>
            <div className="w-full px-10 lg:px-36 py-2">
                <Slider {...settings} >
                    {categorias?.map((categoria) => (
                        <div key={categoria.id} className=" cursor-pointer hover:shadow-xl flex flex-col items-center px-2" onClick={() => handleClickCategoria(categoria.id)}>
                            <img
                                src={categoria.img}
                                alt={categoria.category}
                                className='w-14 sm:w-20 md:w-26   m-auto'
                            />
                            <p
                                className="text-center  md:text-xl text-base text-purple-moru "
                            >
                                {categoria.name}
                            </p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Categories;