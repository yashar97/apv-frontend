import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"


const Header = () => {

    const { cerrarSesion } = useAuth();



    return (
        <header className='h-20 bg-indigo-600'>
            <div className='w-4/5 mx-auto text-white h-full flex items-center justify-between'>

                <h2 className="text-4xl font-black">APV</h2>


                <nav className="flex gap-10">
                    <Link className="text-xl" to='/admin'>Pacientes</Link>
                    <Link className="text-xl" to='/admin/perfil'>Perfil</Link>
                    <Link onClick={cerrarSesion} className="text-xl" to='/'>Salir</Link>
                </nav>

            </div>
        </header>
    )
}

export default Header