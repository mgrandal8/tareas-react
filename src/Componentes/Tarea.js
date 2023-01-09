import React, { useState } from "react";
import "../hojas-de-estilo/Tarea.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import  CircularProgress from '@mui/material/CircularProgress';
const axios=require('axios');

function Tarea( props ){
  const [task, setTask]= useState( props );
  const {id, text, completada, eliminarTarea}= task;
  const [loading, setLoading]= useState(false);
const completarTarea=(task)=>{
  const {id, completada}=task;
  setLoading(true);
  axios.put(`http://localhost:7000/api/tasks/${id} `,{...task, completed: !completada} )
  .then(function(response){
    setLoading(false);  
    setTask({...task, completada: !completada})
      
          
      })
      .catch(function(error){
        console.log(error.response)
      } ); 

  
}
  return(
    <div className={completada ? 'tarea-contenedor completada' : 'tarea-contenedor'} >
      <div className="tarea-texto"
      onClick={()=>completarTarea(task)}>
        { loading ? <CircularProgress /> : text }

      </div>
      <div className="tarea-contenedor-iconos">
        <AiOutlineCloseCircle className="tarea-icono"
        onClick={()=>eliminarTarea(id)}/>
      
      </div>
      
    </div>
  )

}


export default Tarea;