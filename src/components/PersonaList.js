import React, { useState, useEffect } from "react";
import PersonaDataService from "../services/PersonaService";
import { Link } from "react-router-dom"
const PersonaList = () => {
    const [personas, setPersonas] = useState([]);
    const [currentPersona, setCurrentPersona] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [message, setMessage] = useState("");

    const deletePersona = () => {
        PersonaDataService.remove(currentPersona.id).then(response => {
            PersonaDataService.getAll()
                .then(response => {
                    setMessage("");
                    setPersonas(response.data);
                    console.log(response.data);
                })
                .catch(e => {
                    
                })
        }).catch(e => {
            setMessage("Debe eliminar los numeros telefonicos o las direcciones primero");
        });
    }


    const retrivePersonas = () => {
        PersonaDataService.getAll()
            .then(response => {
                setMessage("");
                setPersonas(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    };
    useEffect(() => { retrivePersonas(); }, []);
    const setActivePersona = (persona, index) => {
        setCurrentPersona(persona);
        setCurrentIndex(index);
    };

    return (
        <div className="list row">

            <div className="col-md-12">
                <p className="text-danger">{message}</p>
            </div>
            <div className="col-md-6">
                <h4>Lista de Personas</h4>

                <ul className="list-group">
                    {personas &&
                        personas.map((persona, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActivePersona(persona, index)}
                                key={index}
                            >
                                {persona.nombre}
                            </li>
                        ))}
                </ul>


            </div>
            <div className="col-md-6">
                {currentPersona ? (
                    <div>
                        <h4>Persona</h4>
                        <div>
                            <label>
                                <strong>Identificación:</strong>
                            </label>{" "}
                            {currentPersona.identificacion}
                        </div>
                        <div>
                            <label>
                                <strong>Nombre:</strong>
                            </label>{" "}
                            {currentPersona.nombre}
                        </div>
                        <div>
                            <label>
                                <strong>Fecha:</strong>
                            </label>{" "}
                            {currentPersona.fecha}
                        </div>
                        <Link
                            to={"/direcciones/" + currentPersona.id}
                            className="badge badge-info"
                        >
                            Direcciones
                        </Link>
                        <Link
                            to={"/telefonosList/" + currentPersona.id}
                            className="badge badge-info"
                        >
                            Telefonos
                        </Link>

                        <Link
                            to={"/personas/" + currentPersona.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                        <button className="m-1 badge badge-danger mr-2 button-sm" onClick={deletePersona}>
                            Delete
                       </button>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Seleccione una persona ...</p>
                        </div>
                    )}
            </div>
        </div>
    );


};
export default PersonaList;