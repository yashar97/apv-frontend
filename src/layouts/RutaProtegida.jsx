import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header";
import Spinner from "../components/Spinner";

const RutaProtegida = () => {

    const { auth, cargandoAuth } = useAuth();

    if (cargandoAuth) {
        return <p className="text-center">Cargando...</p>
    }

    return (
        <>
            {
                auth.nombre ? (
                    <>
                        <Header />
                        <Outlet />
                    </>
                ) : <Navigate to='/login' />
            }
        </>

    )
}

export default RutaProtegida