import logoFooter from '../images/LogoFooter.png';
import { BsFacebook } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="w-full bg-purple-moru bottom-0 h-auto mt-10 font-roboto-slab text-white py-6">
            <div className='w-full flex flex-col gap-4 p-6 lg:px-12 lg:flex-row lg:items-start justify-between pb-6'>
                <div className='flex-col flex'>
                    <p className='text-lg font-semibold'>Contacto & Atención al Cliente</p>
                    <a href="mailto:moruapp9@gmail.com" target="_blank" rel="noopener noreferrer">Contáctanos</a>
                    <a href="https://wa.me/3146086210" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                    <Link to="/terminos-condiciones">Términos y Condiciones</Link>
                    <Link to="/politicas-privacidad">Política de Privacidad</Link>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex-col flex'>
                        <p className='text-lg font-semibold'>Fundadores</p>
                        <a href="mailto:Fania1005@hotmail.com" target="_blank" rel="noopener noreferrer">Estefania Mena - CEO</a>
                        <a href="mailto:wilsonsaravia50@gmail.com" target="_blank" rel="noopener noreferrer">Wilson Saravia - CTO</a>
                        <a href="" target="_blank" rel="noopener noreferrer">Gabriel Pérez - CFO</a>
                    </div>

                    <div className='flex-col flex'>
                        <p className='text-lg font-semibold'>Moru App Team</p>
                        <a href="" target="_blank" rel="noopener noreferrer">Dumar Arroyo - Programadora</a>
                        <a href="mailto:cristianbalseiro93@gmail.com" target="_blank" rel="noopener noreferrer">Cristian Balseiro - Programador</a>
                    </div>
                </div>
                

                <div className='flex-col flex'>
                    <p className='text-lg font-semibold'>Equipo de desarrollo</p>
                    <a href="https://www.linkedin.com/in/bryan-alexander-paredes-tomalo-52aa68245/" target="_blank" rel="noopener noreferrer" className='flex'>Bryan Paredes - <p className='text-slate-400'>Backend Developer</p></a>
                    <a href="https://www.linkedin.com/in/felipe-fraga-757080280/" target="_blank" rel="noopener noreferrer" className='flex'>Felipe Fraga - <p className='text-slate-400'>Frontend Developer</p></a>
                    <a href="https://www.linkedin.com/in/andyi-casillas-carrasco-b1709027a/" target="_blank" rel="noopener noreferrer" className='flex'>Andyi Casillas - <p className='text-slate-400'>Frontend Developer</p></a>
                    <a href="https://www.linkedin.com/in/fernando-jose-oliva-barcena-769075280/" target="_blank" rel="noopener noreferrer" className='flex'>Fernando Oliva - <p className='text-slate-400'>Frontend Developer</p></a>
                    <a href="https://www.linkedin.com/in/isa%C3%AD-arellano-developer/" target="_blank" rel="noopener noreferrer" className='flex'>Isaí Arellano - <p className='text-slate-400'>Backend Developer</p></a>
                    <a href="https://www.linkedin.com/in/jorgeahpertuz/" target="_blank" rel="noopener noreferrer" className='flex'>Jorge Hernandez - <p className='text-slate-400'>Backend Developer</p></a>
                    <a href="https://www.linkedin.com/in/lucio-morales-714632262/" target="_blank" rel="noopener noreferrer" className='flex'>Lucio Morales - <p className='text-slate-400'>Backend Developer</p></a>
                    <a href="https://www.linkedin.com/in/oscarsanchog/" target="_blank" rel="noopener noreferrer" className='flex'>Óscar Sancho - <p className='text-slate-400'>Frontend Developer</p></a>
                </div>
            </div>

            <div className='w-full h-min1 bg-white'></div>

            <div className='mx-6 mt-6 flex flex-col gap-4'>
                <div className=''>
                    <img src={logoFooter} className='w-36'/>
                </div>
                <div className='flex gap-4'>
                    <p>Siguenos en:</p>
                    <BsFacebook className='text-3xl cursor-pointer'/>
                    <a href="https://instagram.com/moruapp_?igshid=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer"><FaInstagram className='text-3xl cursor-pointer'/></a>
                    
                </div>
                <p>TODOS LOS DERECHOS RESERVADOS © 2023</p>
            </div>
        </div>
    );
};

export default Footer;