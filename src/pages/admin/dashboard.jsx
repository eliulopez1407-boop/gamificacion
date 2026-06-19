import { useState } from 'react';
import './dashboard.css';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {green} from '@mui/material/colors'
import { FileUpload } from '../../components/fileupload/fileupload';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText
} from '@mui/material';

export function Dashboard() {

    const [pagina, setPagina] = useState("");
    const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

    const materias = [
        "Lengua y Literatura",
        "Matemáticas",
        "Ciencias Naturales y Sociales",
        "Educación Física",
        "Educación Socioemocional",
        "Lengua Extranjera",
        "Educación Cultural y Artística"
    ];

    return (
        <div className="dashboard">

            <div className ="sidebar-container">
                <aside className="sidebar">
                <div className="aside-content-options">
                    <h2 style={{pointerEvents:"none"}}>Escuela Clemencia Coronel de Pincay</h2>
                    <List>
                        <ListItem>
                            <ListItemButton onClick={() => setPagina("")}>
                                <ListItemIcon>
                                <HomeFilledIcon sx={{ fontSize: "1.2rem", color: green[500] }} />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => setPagina("materias")}>
                                <ListItemIcon>
                                <MenuBookIcon sx={{ fontSize: "1.2rem", color: green[500] }} />
                            </ListItemIcon>
                            <ListItemText primary="Materias" />
                                </ListItemButton>
                        </ListItem>
                        <ListItem >
                            <ListItemButton onClick={() => setPagina("archivos")}>
                                <ListItemIcon>
                                <UploadFileIcon sx={{ fontSize: "1.2rem", color: green[500] }} />
                            </ListItemIcon>
                            <ListItemText primary="Archivos" />
                                </ListItemButton>
                        </ListItem>
                    </List>
                </div>
                <div className="aside-content-user">
                    <span>Docente</span>
                    <span className='email-user-account'>docente@esclemencia.edu.ec</span>
                </div>
            </aside>

            <main className="contenido">

                {/* HOME */}
                {pagina === "" && (
                    <>
                        <h1 style={{pointerEvents:"none"}}>Panel de Administración</h1>
                        <p style={{pointerEvents:"none"}}>Bienvenido al sistema de gamificación educativa.</p>
                        <div className="data-home-container">
                            <div className="stadistic-container"></div>
                            <div className="stadistic-container"></div>
                        </div>
                    </>
                )}

                {/* MATERIAS GRID */}
                {pagina === "materias" && !materiaSeleccionada && (
                    <>
                        <h1 style={{pointerEvents:"none"}}>Materias</h1>

                        <div className="materias-grid">
                            {materias.map((mat, index) => (
                                <div
                                    key={index}
                                    className="materia-card"
                                    onClick={() => setMateriaSeleccionada(mat)}
                                >
                                    {mat}
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* MATERIA DETALLE */}
                {pagina === "materias" && materiaSeleccionada && (
                    <>
                        <button
                            className="back-btn"
                            onClick={() => setMateriaSeleccionada(null)}
                        >
                            ← Volver
                        </button>

                        <h1 style={{pointerEvents:"none"}}>{materiaSeleccionada}</h1>

                        <div className="materia-panel">
                            <div className="opcion">Generar Quiz</div>
                            <div className="opcion">Calificaciones</div>
                        </div>
                    </>
                )}

                {/* ARCHIVOS */}
                {pagina === "archivos" && !materiaSeleccionada && <FileUpload/>}

            </main>
            </div>
        </div>
    );
}