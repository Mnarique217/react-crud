import React, { useState, useEffect } from "react";
import PersonaDataService from "../services/PersonaService";

const PersonaList = () => {
    const [personas, setPersonas] = useState([]);
    const [currentPersona, setCurrentPersona] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const retrivePersonas = () => {
        PersonaDataService.getAll()
            .then(response => {
                setPersonas(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    };
    useEffect(()=>{retrivePersonas();},[]);
    const setActivePersona = (persona, index) => {
        setCurrentPersona(persona);
        setCurrentIndex(index);
    };

    return (
        <div className="list row">
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
        </div>

    );

};
export default PersonaList;