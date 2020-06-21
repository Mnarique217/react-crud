import React, { useState, useEffect } from "react";
import PersonaDataService from "../services/PersonaService";

const AddPersona = () => {
    const initialPersonaState = {
        id: null,
        identificacion: "",
        nombre: "",
        fecha: "",
        errors: {
            nombre: '',

        }
    };

    const [persona, setPersona] = useState(initialPersonaState);
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState("");

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPersona({ ...persona, [name]: value });


        switch (name) {
            case 'nombre':
                persona.errors.nombre =
                    value.length == 0
                        ? 'Debe ingresar el nombre'
                        : '';
                break;

            default:
                break;
        }


    };

    const savePersona = () => {
        let ok = true;
        let text='';
        

        if (persona.nombre.length == 0) {
            ok = false;
            text+=text='Nombre,';
        }
        if (persona.identificacion.length == 0) {
            ok = false;
            text+=text='identificacion,';
        }
        if (persona.fecha.length == 0) {
            ok = false;
            text+=text='fecha ';
        }
        let msg = `Los siguientes campos son requeridos y "${text}" no pueden estar vacios`;
        
        if (ok) {

            PersonaDataService.create(persona)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            setMessage(msg);
        }
    };
    const newPersona = () => {
        setPersona(initialPersonaState);
        setSubmitted(false);
    };

    return (

        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Enviado correctamente!</h4>
                    <button className="btn btn-success" onClick={newPersona}>
                        Add
 </button>
                </div>
            ) : (
                    <div>

                        <div className="form-group">
                            <label htmlFor="identificacion">Identificacion</label>
                            <input
                                type="text"
                                className="form-control"
                                id="identificacion"
                                required
                                value={persona.identificacion}
                                onChange={handleInputChange}
                                name="identificacion"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                required
                                value={persona.nombre}
                                onChange={handleInputChange}
                                name="nombre"
                            />
                            {persona.errors.nombre.length > 0 &&
                                <span className='error'>{persona.errors.nombre}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="fecha">Fecha</label>
                            <input
                                type="date"
                                className="form-control"
                                id="fecha"
                                required
                                value={persona.fecha}
                                onChange={handleInputChange}
                                name="fecha"
                            />
                        </div>

                        <button onClick={savePersona} className="btn btn-success">
                            Submit
                         </button>
                        <p>{message}</p>
                    </div>
                )}
        </div>
    );




}
export default AddPersona;