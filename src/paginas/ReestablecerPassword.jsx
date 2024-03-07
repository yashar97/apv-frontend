import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Swal from 'sweetalert2'


const ReestablecerPassword = () => {

    const { token } = useParams();
    const [status, setStatus] = useState(false);
    const [cargando, setCargando] = useState(true);

    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');

    useEffect(() => {

        const confirmarToken = async () => {

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/confirmar-token/${token}`;

            try {

                await axios(url);

                setStatus(true);

            } catch (error) {
                setStatus(false);
            }

            setCargando(false);

        }

        confirmarToken();

    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        if (password !== confirmarPassword) {
            return Swal.fire({
                title: "Las contraseñas deben ser iguales",
                text: "",
                icon: "error"
            });
        }

        try {

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/cambiar-password/${token}`;

            const { data } = await axios.post(url, { password });

            return Swal.fire({
                title: data.msg,
                text: "",
                icon: "success"
            });

        } catch (error) {
            console.log(error);
        }
    }

    if (cargando) {
        return <p className="text-center">Cargando...</p>
    }

    return (
        <>
            {
                status ? (
                    <>
                        <div className="w-2/4">
                            <h1 className="font-semibold text-5xl">Restablece tu contraseña</h1>
                        </div>

                        <div className="w-2/4">
                            <form onSubmit={handleSubmit} className="w-4/5 bg-white py-5 px-10 rounded-md shadow-2xl">
                                <div className="mb-3">
                                    <label htmlFor="password" className="block text-xl">Contraseña</label>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="**************"
                                        className="p-3 rounded-md border-2 mt-1 w-full"
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="confirmar-password" className="block text-xl">Confimar Contraseña</label>
                                    <input
                                        id="confirmar-password"
                                        type="password"
                                        placeholder="**************"
                                        className="p-3 rounded-md border-2 mt-1 w-full"
                                        autoComplete="new-password"
                                        value={confirmarPassword}
                                        onChange={e => setConfirmarPassword(e.target.value)}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value='Confirmar Cambios'
                                    className="text-lg bg-indigo-600 text-white font-bold uppercase mt-8 w-full p-4 rounded-xl cursor-pointer hover:bg-indigo-500 transition-colors"
                                />

                                {/* <div className="mt-5 flex justify-center gap-10">
                        <Link className="text-gray-700 hover:text-indigo-400" to='/registro'>No tengo cuenta</Link>
                        <Link className="text-gray-700 hover:text-indigo-400" to='/olvide-password'>Olvidé mi contraseña</Link>
                    </div> */}
                            </form>
                        </div>
                    </>
                ) : (
                    <>
                        <h1>Ocurrio un error</h1>
                    </>
                )
            }
        </>
    )
}

export default ReestablecerPassword