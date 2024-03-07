import { useState } from "react"
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import useAuth from "../hooks/useAuth"
import Spinner from '../components/Spinner'



const Registro = () => {

    const [nombre, setnombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmarPassword, setconfirmarPassword] = useState('');

    const [cargando, setCargando] = useState(false);

    const { registro } = useAuth();



    const handleSubmit = async e => {
        e.preventDefault();
        setCargando(true);

        if ([nombre.trim(), apellido.trim(), email.trim(), password.trim(), confirmarPassword.trim()].includes('')) {
            Swal.fire({
                title: "Error",
                text: "Todos los campos son obligatorios",
                icon: "error"
            });
            return;
        }

        if (password !== confirmarPassword) {
            Swal.fire({
                title: "Las contraseñas no son iguales",
                text: "",
                icon: "error"
            });
            setCargando(false);
            return;
        }

        const respuesta = await registro({ nombre, apellido, email, password });

        if (respuesta.error) {
            Swal.fire({
                title: respuesta.msg,
                text: "",
                icon: "error"
            });
            setnombre('');
            setapellido('');
            setemail('');
            setpassword('');
            setconfirmarPassword('');
            setCargando(false);
            return;
        }

        Swal.fire({
            title: respuesta.msg,
            text: "",
            icon: "success"
        });
        setnombre('');
        setapellido('');
        setemail('');
        setpassword('');
        setconfirmarPassword('');
        setCargando(false);

    }

    return (
        <>
            <div className="w-2/4 p-10">
                <h1 className="font-bold text-5xl">Crea una Cuenta y Administra tus <span className="text-indigo-600">Pacientes</span></h1>
            </div>

            <div className="w-2/4">
                <form onSubmit={handleSubmit} className="w-4/5 bg-white py-5 px-10 rounded-md shadow-2xl">
                    <div className="mb-5">
                        <label htmlFor="nombre" className="block text-xl">Nombre</label>
                        <input
                            id="nombre"
                            type="text"
                            placeholder="Tu nombre"
                            className="p-3 rounded-md border-2 mt-1 w-full"
                            value={nombre}
                            onChange={e => setnombre(e.target.value)}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="apellido" className="block text-xl">Apellido</label>
                        <input
                            id="apellido"
                            type="text"
                            placeholder="Tu apellido"
                            className="p-3 rounded-md border-2 mt-1 w-full"
                            value={apellido}
                            onChange={e => setapellido(e.target.value)}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className="block text-xl">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="correo@hotmail.com"
                            className="p-3 rounded-md border-2 mt-1 w-full"
                            value={email}
                            onChange={e => setemail(e.target.value)}
                            autoComplete="username"
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password" className="block text-xl">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="**************"
                            className="p-3 rounded-md border-2 mt-1 w-full"
                            value={password}
                            onChange={e => setpassword(e.target.value)}
                            autoComplete="new-password"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmar" className="block text-xl">Confirmar contraseña</label>
                        <input
                            id="confirmar"
                            type="password"
                            placeholder="**************"
                            className="p-3 rounded-md border-2 mt-1 w-full"
                            value={confirmarPassword}
                            onChange={e => setconfirmarPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                    </div>

                    {cargando && <Spinner />}

                    <input
                        type="submit"
                        value='Registrarme'
                        className="text-lg bg-indigo-600 text-white font-bold uppercase mt-8 w-full p-4 rounded-xl cursor-pointer hover:bg-indigo-500 transition-colors"
                    />

                    <div className="mt-5 flex justify-center gap-10">
                        <Link className="text-gray-700 hover:text-indigo-400" to='/'>Ya tengo una cuenta</Link>
                        <Link className="text-gray-700 hover:text-indigo-400" to='/olvide-password'>Olvidé mi contraseña</Link>
                    </div>
                </form>


            </div>
        </>
    )
}

export default Registro