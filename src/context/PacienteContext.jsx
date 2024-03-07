import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Swal from 'sweetalert2'


const PacienteContext = createContext();

export const PacienteProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const [cambioPacientes, setCAmbioPacientes] = useState(false);


    const { auth } = useAuth();

    useEffect(() => {

        const obtenerPacientes = async () => {

            if (!auth.nombre) {
                return;
            }

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/pacientes/`;

            const token = localStorage.getItem('auth-token');

            try {

                const { data } = await axios(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setPacientes(data);

            } catch (error) {
                console.log(error);
            }

        }

        obtenerPacientes();

    }, [auth, cambioPacientes]);

    const agregarPaciente = async paciente => {

        const url = `${import.meta.env.VITE_BACKEND_URL}/api/pacientes`;

        const token = localStorage.getItem('auth-token');

        try {

            const { data } = await axios.post(url, paciente, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setCAmbioPacientes(!cambioPacientes);

            return data;

        } catch (error) {

            return { msg: error.response.data.msg, error: true };

        }

    }

    const eliminarPaciente = async id => {

        const url = `${import.meta.env.VITE_BACKEND_URL}/api/pacientes/${id}`;

        const token = localStorage.getItem('auth-token');

        // primero confirmarmos que quiera elimianr el paciente

        Swal.fire({
            title: "Seguro que deseas eliminar al paciente?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {

                    const { data } = await axios.delete(url, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    Swal.fire({
                        title: data.msg,
                        text: "",
                        icon: "success"
                    });

                    setCAmbioPacientes(!cambioPacientes);

                    return data;

                } catch (error) {
                    return { msg: error.response.data.msg, error: true }
                }


            }
        });

    }

    const actualizarPaciente = async (id, paciente) => {

        const url = `${import.meta.env.VITE_BACKEND_URL}/api/pacientes/${id}`;

        const token = localStorage.getItem('auth-token');

        try {

            const { data } = await axios.put(url, paciente, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setCAmbioPacientes(!cambioPacientes);

            return data;

        } catch (error) {
            return { msg: error.response.data.msg, error: true };
        }
    }

    return (
        <PacienteContext.Provider value={{
            agregarPaciente,
            pacientes,
            eliminarPaciente,
            actualizarPaciente,
            paciente,
            setPaciente
        }}>
            {children}
        </PacienteContext.Provider>
    );
}

export default PacienteContext;