import logoFooter from '../images/LogoFooter.png';
import { BsFacebook } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";

const Footer = () => {
    return (
        <div className="w-full bg-purple-moru bottom-0 h-40 mt-10">
            <div className='w-full h-20 flex items-center justify-between'>
                <div className='ml-5'>
                    <img src={logoFooter} className='w-36'/>
                </div>
                <div className='flex gap-4 mr-5'>
                    <BsFacebook className='text-white text-3xl cursor-pointer'/>
                    <FaInstagram className='text-white text-3xl cursor-pointer'/>
                    <BsWhatsapp className='text-white text-3xl cursor-pointer'/>
                </div>
            </div>

            <div className='w-full h-min1 bg-white'></div>
            <p className='text-white m-6'>TODOS LOS DERECHOS RESERVADOS © 2023</p>
        </div>
    );
};

export default Footer;