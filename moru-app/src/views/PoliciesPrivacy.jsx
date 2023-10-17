import { useEffect } from "react";

const PoliciesPrivacy = () => {

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    return(
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-5 font-roboto-slab">
            <h1 className="text-2xl font-semibold mb-4">Política de Privacidad para Negocios en Mōru App</h1>
            
            <div className="flex flex-col gap-4">
                <p>
                    <strong>1. Introducción:</strong><br />
                    Mōru App valora la confidencialidad de la información de los negocios registrados en nuestra plataforma. Esta política está en conformidad con la Ley 1581 de 2012 y normativas correspondientes en Colombia, y detalla el manejo de la información de nuestros asociados comerciales.
                </p>

                <p>
                    <strong>2. Datos recopilados:</strong><br />
                    <span className="ml-4 flex">-<p><strong>Información de registro del negocio: </strong>Esto incluye nombre del negocio, RUT, dirección física, correo electrónico de contacto, número telefónico y otros detalles relevantes.</p></span>
                    <span className="ml-4 flex">-<p><strong>Actividad en la plataforma: </strong>Historial de ventas, ofertas, interacciones con usuarios, calificaciones recibidas y demás información relacionada con la actividad comercial.</p></span>
                </p>

                <p>
                    <strong>3. Finalidad del tratamiento:</strong><br />
                    <span className="ml-4 flex">-<p>Personalizar y optimizar la experiencia de los negocios en Mōru.</p></span>
                    <span className="ml-4 flex">-<p>Facilitar transacciones y resolver disputas o reclamaciones.</p></span>
                    <span className="ml-4 flex">-<p>Enviar comunicaciones relativas a la plataforma, novedades o promociones.</p></span>
                    <span className="ml-4 flex">-<p>Cumplimiento de requisitos legales y fiscales.</p></span>
                </p>
                
                <p>
                    <strong>4. Derechos de los titulares:</strong><br />
                    Los negocios tienen derecho a: <br />
                    <span className="ml-4 flex">-<p>Conocer, actualizar y rectificar sus datos.</p></span>
                    <span className="ml-4 flex">-<p>Solicitar evidencia de la autorización otorgada.</p></span>
                    <span className="ml-4 flex">-<p>Ser informados acerca del uso de sus datos.</p></span>
                    <span className="ml-4 flex">-<p>Presentar reclamaciones ante la SIC por posibles infracciones.</p></span>
                    <span className="ml-4 flex">-<p>Revocar su autorización o solicitar la eliminación de sus datos.</p></span>
                </p>

                <p>
                    <strong>5. Seguridad:</strong><br />
                    Empleamos protocolos de seguridad adecuados para proteger la información de los negocios contra accesos no autorizados, pérdidas o alteraciones.
                </p>

                <p>
                    <strong>6. Transferencia a terceros:</strong><br />
                    Los datos de los negocios no serán compartidos, vendidos o divulgados a terceros, excepto cuando sea necesario por disposiciones legales o para realizar funciones específicas previamente comunicadas y autorizadas.
                </p>

                <p>
                    <strong>7. Cambios en la política:</strong><br />
                    Las posibles modificaciones a esta política se comunicarán a través de nuestra plataforma o correo electrónico. Es responsabilidad del negocio mantenerse actualizado respecto a estas políticas.
                </p>

                <p>
                    <strong>8. Consentimiento:</strong><br />
                    Al registrarse y operar en Mōru, los negocios consienten la recopilación y uso de su información de acuerdo con esta política.
                </p>

                <p>
                    <strong>9. Contacto:</strong><br />
                    Para consultas o inquietudes sobre esta política o nuestras prácticas de privacidad, por favor contactar a nuestro equipo de soporte.
                </p>
            </div>

            <h2 className="text-2xl font-semibold my-6">Política de Privacidad para Usuarios de Mōru App</h2>

            <div className="flex flex-col gap-4">
                <p>
                    <strong>1. Introducción:</strong><br />
                    Mōru App respeta la privacidad de sus usuarios y se compromete a protegerla en conformidad con la Ley 1581 de 2012 y su reglamentación. Esta política informa sobre cómo recopilamos, usamos y protegemos la información personal de los usuarios.
                </p>

                <p>
                    <strong>2. Datos recopilados:</strong><br />
                    <span className="ml-4 flex">-<p><strong>Información de registro: </strong>Al registrarse, recabamos datos como nombre, dirección de correo electrónico, número de teléfono y, opcionalmente, dirección de entrega.</p></span>
                    <span className="ml-4 flex">-<p><strong>Actividad en la plataforma: </strong>Historial de pedidos, calificaciones, comentarios y otras interacciones.</p></span>
                </p>

                <p>
                    <strong>3. Finalidad del tratamiento:</strong><br />
                    <span className="ml-4 flex">-<p>Personalizar la experiencia en Mōru.</p></span>
                    <span className="ml-4 flex">-<p>Procesar transacciones y atender consultas o reclamaciones.</p></span>
                    <span className="ml-4 flex">-<p>Comunicar novedades y ofertas.</p></span>
                    <span className="ml-4 flex">-<p>Cumplir con requisitos legales.</p></span>
                </p>
                
                <p>
                    <strong>4. Derechos de los titulares:</strong><br />
                    Los usuarios pueden: <br />
                    <span className="ml-4 flex">-<p>Conocer, actualizar y rectificar sus datos.</p></span>
                    <span className="ml-4 flex">-<p>Solicitar prueba de la autorización otorgada.</p></span>
                    <span className="ml-4 flex">-<p>Ser informado sobre el uso de sus datos.</p></span>
                    <span className="ml-4 flex">-<p>Presentar quejas ante la SIC por infracciones.</p></span>
                    <span className="ml-4 flex">-<p>Revocar su autorización o solicitar supresión de sus datos.</p></span>
                </p>

                <p>
                    <strong>5. Seguridad:</strong><br />
                    Adoptamos medidas técnicas, administrativas y físicas para proteger los datos de los usuarios contra daños, pérdidas, alteraciones, destrucción o uso no autorizado.
                </p>

                <p>
                    <strong>6. Transferencia a terceros:</strong><br />
                    No compartimos, vendemos ni divulgamos datos a terceros, salvo por requerimiento legal o para cumplir funciones específicas previamente autorizadas por el usuario.
                </p>

                <p>
                    <strong>7. Cambios en la política:</strong><br />
                    Las modificaciones se comunicarán por nuestra plataforma o correo. Es responsabilidad del usuario revisar esta política regularmente.
                </p>

                <p>
                    <strong>8. Consentimiento:</strong><br />
                    Al usar Mōru, los usuarios aceptan la recopilación y uso de información según esta política.
                </p>

                <p>
                    <strong>9. Contacto:</strong><br />
                    Ante dudas sobre esta política o nuestras prácticas, pueden contactar a nuestro equipo de soporte.
                </p>
            </div>
        </div>
    )
};

export default PoliciesPrivacy;