 import "./miboton.css"
 export function MiButton({name, colorbg, handleclick}){
    /*const handleclick = () =>{
        console.log("me clickeaste")
    }*/
    return(
        <button className="boton" onClick={handleclick} style={{backgroundColor: colorbg}}>{name}</button>
    )
}