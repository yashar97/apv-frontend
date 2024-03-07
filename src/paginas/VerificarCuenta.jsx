import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios'

const VerificarCuenta = () => {

    const { token } = useParams();

    const [confirmado, setConfirmado] = useState(false);
    const [cargando, setcargando] = useState(true);

    useEffect(() => {

        const verificarUsuario = async () => {

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/confirmar-cuenta/${token}`;

            try {

                const { data } = await axios(url);

                setConfirmado(true);

            } catch (error) {
                console.log(error);
            }
            
            setcargando(false);
        }

        verificarUsuario();


    }, []);

    if (cargando) {
        return 'Cargando...';
    }


    return (
        <div>
            {
                confirmado ? (
                    <>
                        <h1 className="text-5xl font-semibold text-indigo-600">Cuenta verificada correctamente</h1>

                        <div className="mt-10">
                            <Link to='/admin'>Ir a inicio</Link>
                        </div>
                    </>
                ) : <h1 className="text-5xl font-semibold text-indigo-600">Página no encontrada</h1>
            }
        </div>
    )
}

export default VerificarCuenta