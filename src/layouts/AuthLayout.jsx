import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const AuthLayout = () => {

    const { auth, cargandoAuth } = useAuth();

    if (cargandoAuth) {
        return;
    }


    return (
        <>
            {
                !auth.nombre ? (
                    <div className='container mx-auto px-10 h-screen'>
                        <div className='h-full flex items-center'>
                            <Outlet />
                        </div>
                    </div>
                ) : <Navigate to='/admin' />
            }
        </>
    )

    
}

export default AuthLayout