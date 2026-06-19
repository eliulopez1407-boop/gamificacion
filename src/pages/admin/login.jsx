import { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

export function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const outlinedPasswordId = useId();
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("Iniciando sesión...");
        console.log("Usuario:", username);
        console.log("contraseña:", password);
        if(username === "admin" && password === "admin123"){
            console.log("Inicio de sesión exitoso.");
            navigate("/dashboard");
        } else {
            console.log("Nombre de usuario o contraseña incorrectos.");
        }
    }
      const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

    return(
        <div>
            <h1>Inicio de Sesión</h1>
                <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="filled-basic" label="Usuario" variant="filled" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
      <br/>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor={`${outlinedPasswordId}-input`}>Contraseña</InputLabel>
          <OutlinedInput
            id={`${outlinedPasswordId}-input`}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Box>
        <Button variant="contained" onClick={handleSubmit}>
  Iniciar Sesión</Button>
        </div>
    )
}