import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2'


const RecuperarContraseña = () => {

    const [email, setEmail] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        try {

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/recuperar-password`;

            const { data } = await axios.post(url, { email });

            Swal.fire({
                title: data.msg,
                text: "",
                icon: "success"
            });

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <div className="w-2/4 p-10">
                <h1 className="font-bold text-5xl">Recupera tu Contraseña y Administra tus <span className="text-indigo-600">Pacientes</span></h1>
            </div>

            <div className='w-2/4'>
                <form onSubmit={handleSubmit} className='w-4/6 bg-white shadow-md py-14 px-10 rounded-md'>
                    <h3 className='font-semibold text-center mb-4 text-3xl'>Ingresa tu email</h3>
                    <input type="email"
                        placeholder='ejemplo@hotmail.com'
                        className='border-2 rounded-lg w-full p-3'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input type="submit" className='bg-indigo-600 text-white font-bold uppercase p-4 mt-5 w-full rounded-md hover:bg-indigo-500 cursor-pointer transition-colors' />
                </form>
            </div>
        </>
    )
}

export default RecuperarContraseña