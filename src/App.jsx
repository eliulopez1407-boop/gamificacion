import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import {Login} from './pages/admin/login.jsx'
import {Dashboard} from './pages/admin/dashboard.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
