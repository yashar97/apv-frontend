import { BrowserRouter, Routes, Route } from 'react-router-dom'

// plantillas
import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'

// rutas publicas 
import Login from './paginas/Login'
import Registro from './paginas/Registro'
import RecuperarContraseña from './paginas/RecuperarContraseña'
import VerificarCuenta from './paginas/VerificarCuenta'
import ReestablecerPassword from './paginas/ReestablecerPassword'


// rutas protegidas 
import Perfil from './paginas/Perfil'
import Administrador from './paginas/Administrador'

// providers 
import { AuthProvider } from './context/AuthContext'
import { PacienteProvider } from './context/PacienteContext'

const App = () => {


    return (
        <BrowserRouter>
            <AuthProvider>
                <PacienteProvider>
                    <Routes>

                        <Route path='/' element={<AuthLayout />}>
                            <Route index element={<Login />} />
                            <Route path='registro' element={<Registro />} />
                            <Route path='olvide-password' element={<RecuperarContraseña />} />
                            <Route path='verificar/:token' element={<VerificarCuenta />} />
                            <Route path='restablecer-password/:token' element={<ReestablecerPassword />} />
                        </Route>

                        {/* rutas protegidas */}
                        <Route path='admin' element={<RutaProtegida />}>
                            <Route index element={<Administrador />} />
                            <Route path='perfil' element={<Perfil />} />
                        </Route>

                    </Routes>
                </PacienteProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App