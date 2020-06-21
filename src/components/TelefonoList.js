import React, { useState, useEffect } from "react";
import TelefonoDataService from "../services/TelefonoService";
import { Link } from "react-router-dom"
const TelefonoList = props => {
    const personaInitial = {
        id: null
    };

    const [persona, setPersona] = useState(personaInitial);
    const [Telefonos, setTelefonos] = useState([]);
    const [currentTelefono, setcurrentTelefono] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);


    useEffect(() => {
        persona.id=props.match.params.id;
    }, [props.match.params.id]);

    const deleteTelefono = () => {
        TelefonoDataService.remove(currentTelefono.id).then(response => {
            TelefonoDataService.getAll()
                .then(response => {
                    let array =[] = response.data;
                    let userTelefonos =[];
                    array.forEach(telefono=>{
                        if(telefono.persona.id == persona.id){
                            userTelefonos.push(telefono);
                        }
                    });
                    
                    setTelefonos(userTelefonos);
                    
                })
                .catch(e => {
                    console.log(e);
                })
        }).catch(e => {
            console.log(e);
        });
    }


    const retriveTelefonos = () => {
        TelefonoDataService.getAll()
            .then(response  => {
                let array =[] = response.data;
                let userTelefonos =[];
                array.forEach(telefono=>{
                    if(telefono.persona.id == persona.id){
                        userTelefonos.push(telefono);
                    }
                });
                
                console.log(userTelefonos);
                setTelefonos(userTelefonos);
            })
            .catch(e => {
                console.log(e);
            })
    };
    useEffect(() => { retriveTelefonos(); }, []);

    const setActiveTelefono = (telefono, index) => {
        setcurrentTelefono(telefono);
        setCurrentIndex(index);
    };

    return (

 
        <div className="list row">
               <div className="col-md-12">
                    
                        <Link
                             to={"/addTelefono/" + persona.id}
                            className="badge badge-info"
                        >
                            Agregar Telefono
                     </Link>
                    
                </div>

            <div className="col-md-6">
                <h4>Telefonos</h4>

                <ul className="list-group">
                    {Telefonos &&
                        Telefonos.map((telefono, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveTelefono(telefono, index)}
                                key={index}
                            >
                                {telefono.numero}
                            </li>

                        ))}
                </ul>
            </div>

            <div className="col-md-6">
                {currentTelefono ? (
                    <div>
                        <h4>Persona</h4>
                        <div>
                            <label>
                                <strong>Identificación:</strong>
                            </label>{" "}
                            {currentTelefono.persona.identificacion}
                        </div>
                        <div>
                            <label>
                                <strong>Nombre:</strong>
                            </label>{" "}
                            {currentTelefono.persona.nombre}
                        </div>
                        <div>
                            <label>
                                <strong>Fecha:</strong>
                            </label>{" "}
                            {currentTelefono.persona.fecha}
                        </div>
                        
                            <Link
                                to={"/telefonos/" + currentTelefono.id}
                                className="badge badge-warning"
                            >
                                Edit
                          </Link>
                      

                        <button className="badge badge-danger mr-2 button-xs" onClick={deleteTelefono}>
                            Delete
                       </button>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Seleccione una elemento ...</p>
                        </div>
                    )}
            </div>
        </div>
    );


};
export default TelefonoList;