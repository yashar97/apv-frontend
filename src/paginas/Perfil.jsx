import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth"
import Swal from 'sweetalert2'


const Perfil = () => {

    const [nombre, setnombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmarPassword, setconfirmarPassword] = useState('');

    const { auth, actualizarInformacion, setAuth } = useAuth();


    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre.trim(), apellido.trim(), email.trim(), password.trim(), confirmarPassword.trim()].every(value => value === "")) {
            Swal.fire({
                title: 'Debes ingresar al menos un campo',
                text: "",
                icon: "warning"
            });
            return;
        }

        if (password.trim() !== confirmarPassword.trim()) {
            Swal.fire({
                title: 'Las contraseñas deben ser iguales',
                text: "",
                icon: "warning"
            });
            return;
        }


        const respuesta = await actualizarInformacion({ nombre, email, apellido, password });

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

    }

    return (
        <div className='container h-full mx-auto px-14 flex py-5'>

            <div className='w-2/4'>

                <form onSubmit={handleSubmit} className='w-2/3'>
                    <div className="mb-5">
                        <label htmlFor="nombre" className="block text-xl">Nombre</label>
                        <input
                            id="nombre"
                            type="text"
                            placeholder="Nombre Veterinario"
                            className="p-3 rounded-md border-2 mt-1 w-full"
                            autoComplete="username"
                            value={nombre}
                            onChange={e => setnombre(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="apellido" className="block text-xl">Apellido</label>
                        <input
                            id="apellido"
                            type="text"
                            placeholder="Apellido Veterinario"
                            className="p-3 rounded-md border-2 mt-1 w-full"
                            autoComplete="username"
                            value={apellido}
                            onChange={e => setapellido(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-xl">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email Veterinario"
                            className="p-3 rounded-md border-2 mt-1 w-full"
                            autoComplete="username"
                            value={email}
                            onChange={e => setemail(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block text-xl">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="*********"
                            className="p-3 rounded-md border-2 mt-1 w-full"
                            autoComplete="username"
                            value={password}
                            onChange={e => setpassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="confirmar" className="block text-xl">Confirmar Contraseña</label>
                        <input
                            id="confirmar"
                            type="password"
                            placeholder="*********"
                            className="p-3 rounded-md border-2 mt-1 w-full"
                            autoComplete="username"
                            value={confirmarPassword}
                            onChange={e => setconfirmarPassword(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value='Actualizar informacion'
                        className="text-lg bg-indigo-600 text-white font-bold uppercase mt-8 w-full p-4 rounded-xl cursor-pointer hover:bg-indigo-500 transition-colors"
                    />
                </form>
            </div>

            <div className='w-2/4'>
                <h2 className='text-center text-2xl'>Datos Personales</h2>

                <div className='mt-5 flex flex-col items-center gap-5'>
                    <p className='font-bold text-xl'>Nombre: <span className='font-normal'>{auth.nombre}</span></p>
                    <p className='font-bold text-xl'>Apellido: <span className='font-normal'>{auth.apellido}</span></p>
                    <p className='font-bold text-xl'>Email: <span className='font-normal'>{auth.email}</span></p>
                </div>
            </div>

        </div>
    )
}

export default Perfil