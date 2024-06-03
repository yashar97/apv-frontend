import { createContext, useEffect, useState } from "react";
import axios from "axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


    const [auth, setAuth] = useState({});
    const [cargandoAuth, setCargandoAuth] = useState(true);
    const [cambioInformacion, setCambioInformacion] = useState(false);

    useEffect(() => {

        const autenticarUsuario = async () => {

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/perfil`;

            const token = localStorage.getItem('auth-token');

            if (!token) {
                setCargandoAuth(false);
                return;
            }


            try {

                const { data } = await axios(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setAuth(data);
                setCargandoAuth(false);

            } catch (error) {
                setAuth({});
            }


        }

        autenticarUsuario();

    }, [cambioInformacion]);

    const registro = async datos => {

        const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/register`


        try {

            const { data } = await axios.post(url, datos, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            return data;


        } catch (error) {
            console.log(error.message)
            return { msg: error.response.data.msg, error: true };
        }

    }

    const login = async datos => {

        const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/login`;

        try {

            const { data } = await axios.post(url, datos, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setAuth(data);

            localStorage.setItem('auth-token', data.token);

            return { msg: 'Bienvenido' }

        } catch (error) {
            return { msg: error.response.data.msg, error: true };
        }

    }

    const cerrarSesion = () => {
        localStorage.removeItem('auth-token');
        setAuth({});
    }

    const actualizarInformacion = async datos => {

        const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/actualizar-informacion`;
        const token = localStorage.getItem('auth-token');

        try {

            const { data } = await axios.post(url, datos, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });


            setCambioInformacion(!cambioInformacion);

            return data;

        } catch (error) {
            console.log(error);
        }
    }



    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            login,
            registro,
            cargandoAuth,
            cerrarSesion,
            actualizarInformacion

        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;