import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import usePaciente from '../hooks/usePaciente'


const FormularioPaciente = () => {

    const [nombre, setnombre] = useState('');
    const [propietario, setpropietario] = useState('');
    const [email, setemail] = useState('');
    const [sintomas, setsintomas] = useState('');

    const { agregarPaciente, paciente, actualizarPaciente, setPaciente } = usePaciente();

    useEffect(() => {

        if (paciente.nombre) {
            setnombre(paciente.nombre);
            setpropietario(paciente.propietario);
            setemail(paciente.email);
            setsintomas(paciente.sintomas);
        }

    }, [paciente]);


    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre.trim(), propietario.trim(), email.trim(), sintomas.trim()].includes('')) {
            Swal.fire({
                title: "Todos los campos son obligatorios",
                text: "",
                icon: "error"
            });
            return;
        }

        // condicional para actualizar o agregar paciente dependiendo de lo que tengamos en el objeto paciente

        let respuesta;

        if (paciente.nombre) {

            respuesta = await actualizarPaciente(paciente._id, { nombre, propietario, email, sintomas });

        } else {

            respuesta = await agregarPaciente({ nombre, propietario, email, sintomas });
        }

        if (respuesta.error) {
            Swal.fire({
                title: respuesta.msg,
                text: "",
                icon: "error"
            });
            return;
        }

        Swal.fire({
            title: respuesta.msg,
            text: "",
            icon: "success"
        });

        setnombre('');
        setpropietario('');
        setemail('');
        setsintomas('');
        setPaciente({});
    }

    return (
        <div className='mt-5 w-2/5'>
            <form onSubmit={handleSubmit} className='px-5 py-8 bg-white shadow-xl rounded-md'>

                <h2 className='text-3xl text-center font-bold'>Agregar Pacientes</h2>

                <div className='mt-5 mb-5'>
                    <label className="block uppercase mb-1" htmlFor="mascota">Nombre Mascota</label>
                    <input
                        id='mascota'
                        type="text"
                        placeholder='Nombre Mascota'
                        className='border-2 rounded-md border-gray-400 w-full p-3'
                        value={nombre}
                        onChange={e => setnombre(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label className="block uppercase mb-1" htmlFor="propietario">Propietario</label>
                    <input
                        id='propietario'
                        type="text"
                        placeholder='Nombre Propietario'
                        className='border-2 rounded-md border-gray-400 w-full p-3'
                        value={propietario}
                        onChange={e => setpropietario(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label className="block uppercase mb-1" htmlFor="email">Email Propietario</label>
                    <input
                        id='email'
                        type="email"
                        placeholder='ejemplo@correo.com'
                        className='border-2 rounded-md border-gray-400 w-full p-3'
                        value={email}
                        onChange={e => setemail(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label className="block uppercase mb-1" htmlFor="sintomas">Sintomas</label>
                    <textarea
                        id='sintomas'
                        placeholder='Síntomas...'
                        className='border-2 rounded-md border-gray-400 w-full p-3'
                        value={sintomas}
                        onChange={e => setsintomas(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value={paciente.nombre ? 'Actualizar Paciente' : 'Agregar Paciente'}
                    className='bg-indigo-600 text-white p-3 w-full rounded-md font-bold uppercase cursor-pointer hover:bg-indigo-500 transition-colors'
                />

            </form>
        </div>
    )
}

export default FormularioPaciente