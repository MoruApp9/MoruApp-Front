import logoFooter from "../../images/LogoFooter.png";
import { FaEnvelope, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-purple-moru-dark px-20 py-10 leading-relaxed" 
      style={{
        background:
          "linear-gradient(to left, #260d4f 0%, #391376 50%, #561db2 100%)",
      }}>
      <div className="flex justify-between text-white font-montserrat flex-col md:flex-row">
        <div>
          <img className="w-40" src={logoFooter} />
          <p className="flex gap-2 items-center">
            <span>
              <FaEnvelope />
            </span>{" "}
            hola@moru.com.co
          </p>
          <a
            className="flex gap-2 items-center"
            href="https://ultramsg.com/m/47RH90E"
            target="_blank"
          >
            <span>
              <FaWhatsapp />
            </span>{" "}
            +57 (314) 6086210
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="font-bree-serif text-3xl mb-4">Equipo</h1>
            <p>Estefanía Mena - CEO</p>
            <p>Gabriel Perez - CFO</p>
            <p>Isaí Arellano - CTO</p>
          </div>

          <div>
            <h3 className="font-bree-serif text-xl mb-2">Desarrolladores</h3>
            <p>Wilson Saravia</p>
            <p>Cristian Balseiro</p>
            <p>Dumar Pacheco</p>
            <p>Federico Montoya</p>
          </div>
        </div>
        <div>
          <h1 className="font-bree-serif text-3xl mb-4">Soluciones</h1>
          <p>Administra tu Negocio</p>
          <p>Tienda Virtual</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="font-bree-serif text-3xl mb-4">Sobre Nosotros</h1>
            <Link to={"/support"}>Quienes Somos</Link>
            <Link>Preguntas Frecuentes</Link>
            <Link to={"/support"}>Términos y condiciones</Link>
            <Link to={"/support"}>Politica de privacidad</Link>
          </div>

          <div>
            <h3 className="font-bree-serif text-xl mb-2">Siguenos</h3>
            <Link className="flex items-center gap-2">
              <span>
                <FaInstagram />
              </span>{" "}
              moruapp_
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
