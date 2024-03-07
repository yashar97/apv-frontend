import usePaciente from "../hooks/usePaciente"
import Swal from 'sweetalert2'


const Paciente = () => {


    const { pacientes, eliminarPaciente, setPaciente } = usePaciente();

    const handleClick = paciente => {

        setPaciente(paciente);

    }

    return (
        <>
            {
                pacientes.map(paciente => (
                    <div key={paciente._id} className='mb-4 bg-white px-8 py-5 rounded-md shadow-lg'>
                        <p className='mb-3 font-bold text-lg uppercase text-gray-700'>
                            Nombre: <span className='font-normal normal-case'> {paciente.nombre}</span>
                        </p>
                        <p className='mb-3 font-bold text-lg uppercase text-gray-700'>Propietario:
                            <span className='font-normal normal-case'> {paciente.propietario}</span>
                        </p>
                        <p className='mb-3 font-bold text-lg uppercase text-gray-700'>Email:
                            <span className='font-normal normal-case'> {paciente.email}</span>
                        </p>
                        <p className='mb-3 font-bold text-lg uppercase text-gray-700'>Sintomas:
                            <span className='font-normal normal-case'> {paciente.sintomas}</span>
                        </p>

                        <div className='flex justify-between mt-5'>
                            <button onClick={() => handleClick(paciente)} className='bg-indigo-600 text-white py-2 px-10 font-bold rounded-md'>Editar</button>
                            <button onClick={() => eliminarPaciente(paciente._id)} className='bg-red-700 text-white py-2 px-10 font-bold rounded-md'>Eliminar</button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Paciente