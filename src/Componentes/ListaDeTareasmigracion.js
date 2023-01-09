import React, {useState, useEffect, useReducer} from "react";
import TareaFormulario from "./TareaFormulario";
import '../hojas-de-estilo/ListadeTareas.css';
import Tarea from './Tarea';
import Mostrar from "./Mostrar";
import { accordionActionsClasses, CircularProgress } from "@mui/material";
import Buscador from "./Buscador";


const axios=require('axios');




function ListaDeTareas(props){
    
    const [tareasGuardadas, setTareasGuardadas]= useState([]);
    const[loading, setLoading]=useState(false);
    const[newTask, setNewTask]=useState();
    const[deleteTask, setDeleteTask]=useState();
    const[todas,setTodas]=useState(true);
   
    
    useEffect(()=>{
        
        setLoading(true);
        axios.get('http://localhost:7000/api/tasks')
        .then(function(response){
        
         setTareasGuardadas(response.data.tasks) 
         
         setLoading(false);   
        })
        .catch(function(error){
            
            console.log(error.response)
        })
      },[newTask, deleteTask]); 

    
      
    
    
    
    const agregarTarea= tarea => {
    
    if(tarea.texto.trim()){
        setLoading(true);
        axios.post('http://localhost:7000/api/tasks', {text:tarea.texto.trim()} )
       .then((response)=>{
        console.log(response);
        setNewTask(response);
       } )
       .catch((error)=>{
        setLoading(false);
        return console.log(error.response)
       } ) 
    
    }
    else{
        alert("La tarea no puede estar vacia");
    }
}
const eliminarTarea=id=> {
    setLoading(true);
    axios.delete(`http://localhost:7000/api/tasks/${id}`)
    .then((response)=>{
        console.log(response);
        setDeleteTask(response);
    })
    .catch((error)=>{
        setLoading(false);
        return console.log(error.response)
    })
}


const buscarTareas= criterios => {
    axios.get('http://localhost:7000/api/tasks')
    .then(function(response){
        
        const tareasAFiltrar=response.data.tasks;
       
        const tareasBuscadas=tareasAFiltrar.filter(tarea => tarea.text.includes(`${criterios}`)  )
        
        
        setTareasGuardadas(tareasBuscadas);
        
        
    }) 
    .catch((error)=>{
        return console.log("no entro")
    })
    

    
    }


    // function mostrarTodas(event){
    //     event.preventDefault();
    //     setTodas(!todas);
       
    //   }
    







    return(
        <>
            
            <Buscador onSubmit={buscarTareas} />
            <TareaFormulario onSubmit={agregarTarea} />
            <div className="tareas-lista-contenedor">
                
            {
                    loading? <CircularProgress/>:
                    tareasGuardadas.map((tarea) => 
                    (    
                    <Tarea
                    eliminarTarea={eliminarTarea}
                    
                    key={tarea._id}
                    id={tarea._id}
                    text={tarea.text} 
                    completada={tarea.completed}  />))
                }
            </div>
        </>
    )
}




export default ListaDeTareas;