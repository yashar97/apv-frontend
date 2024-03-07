import { useContext } from "react";
import PacienteContext from "../context/PacienteContext";

const usePaciente = () => {
    return useContext(PacienteContext);
}

export default usePaciente;