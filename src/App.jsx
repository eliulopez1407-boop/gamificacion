import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import {Login} from './pages/admin/login.jsx'
import {Dashboard} from './pages/admin/dashboard.jsx'
import {DashboardEstudiante} from './pages/estudiante/DashboardEstudiante.jsx'

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return children
}

// Renderiza el panel según el rol elegido en el login: las herramientas de
// autoría (docente) y la vista de aprendizaje (estudiante) están separadas.
function DashboardPorRol() {
  const rol = localStorage.getItem('userRole')
  return rol === 'docente' ? <Dashboard /> : <DashboardEstudiante />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPorRol />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
