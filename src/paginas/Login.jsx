import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import useAuth from '../hooks/useAuth'
import Swal from 'sweetalert2'
import { useState } from "react"
import Spinner from "../components/Spinner"

const Login = () => {

    console.log('hola mundo')
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [cargando, setCargando] = useState(false);

    const { login } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setCargando(true);


        if ([email.trim(), password.trim()].includes('')) {
            Swal.fire({
                title: "Todos los campos son obligatorios",
                text: "",
                icon: "error"
            });
            return;
        }

        const respuesta = await login({ email, password });

        if (respuesta.error) {
            Swal.fire({
                title: respuesta.msg,
                text: "",
                icon: "error"
            });
            setCargando(false);
            return;
        }



        Swal.fire({
            title: "Bienvenido",
            text: "",
            icon: "success"
        });

        setCargando(false);
        setemail('');
        setpassword('');
        navigate('/admin/perfil');

    }

    return (
        <>
            <div className="w-2/4 p-10">
                <h1 className="font-bold text-5xl">Ingresa y Administra tus <span className="text-indigo-600">Pacientes</span></h1>
            </div>

            <div className="w-2/4">
                <form onSubmit={handleSubmit} className="w-4/5 bg-white py-5 px-10 rounded-md shadow-2xl">
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-xl">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="correo@hotmail.com"
                            className="p-3 rounded-md border-2 mt-1 w-full"
                            autoComplete="username"
                            value={email}
                            onChange={e => setemail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xl">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="**************"
                            className="p-3 rounded-md border-2 mt-1 w-full"
                            autoComplete="new-password"
                            value={password}
                            onChange={e => setpassword(e.target.value)}
                        />
                    </div>

                    {cargando && <Spinner />}

                    <input
                        type="submit"
                        value='Ingresar'
                        className="text-lg bg-indigo-600 text-white font-bold uppercase mt-8 w-full p-4 rounded-xl cursor-pointer hover:bg-indigo-500 transition-colors"
                    />

                    <div className="mt-5 flex justify-center gap-10">
                        <Link className="text-gray-700 hover:text-indigo-400" to='/registro'>No tengo cuenta</Link>
                        <Link className="text-gray-700 hover:text-indigo-400" to='/olvide-password'>Olvidé mi contraseña</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login