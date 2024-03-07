import FormularioPaciente from '../components/FormularioPaciente';
import ListaPacientes from '../components/ListaPacientes';
import usePaciente from '../hooks/usePaciente';

const Administrador = () => {

    const { pacientes } = usePaciente();

    return (
        <div className='container mx-auto px-14 flex justify-between gap-5'>

            <FormularioPaciente />

            <div className='mt-5 w-3/5 h-screen overflow-scroll'>

                {
                    pacientes.length ? <h2 className='text-center text-3xl mb-5'>Listado de Pacientes</h2> 
                    : <h2 className='text-center text-3xl mb-5'>Aún no hay Pacientes</h2>
                }

                {
                    pacientes.length > 0 && <ListaPacientes />
                }
            </div>


        </div>
    )
}

export default Administrador