
import React, {useState} from 'react'
const axios=require('axios');
function Buscador (props) {
    const [input, setInput]= useState([]);
    const manejarCambio= e =>{
    
        setInput(e.target.value);
       
    }

    const manejarEnvio= e =>{
        e.preventDefault();
       const criterios=input;
       console.log(criterios);
        props.onSubmit(criterios);
    }

  
    return (
    <div><form className="tarea-formulario" 
    onSubmit={manejarEnvio}>
        <input
            className="tarea-input"
            type='text'
            placeholder='Buscar'
            name='texto'
            onChange={manejarCambio}
            
        />
        <button className="tarea-boton"
        >
            Buscar

        </button>
    </form>
</div>
  )
}

export default Buscador