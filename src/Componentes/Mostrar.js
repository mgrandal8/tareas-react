import React from 'react'
import '../hojas-de-estilo/Mostrar.css';
const Mostrar = ({mostrarTodas} ) => {
 
    
    
 
 
 
 
 
    return (
    <div className='mostrar-contenedor'>
    <button className='mostrar-boton' onClick={console.log("Mostrar todas") }>Todas</button>
    <button className='mostrar-boton'>Completadas</button>
    <button className='mostrar-boton'>No completadas</button>
    </div>
  )
}

export default Mostrar;