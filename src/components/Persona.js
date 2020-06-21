import React, { useState, useEffect } from "react";
import PersonaDataService from "../services/PersonaService";

const Persona = props => {

    const initialPersonaState = {
        id: null,
        identificacion: "",
        nombre: "",
        fecha: ""
    }
    const [currentPersona, setCurrentPersona] = useState(initialPersonaState);
    const [message, setMessage] = useState("");
    useEffect(() => {
        getPersona(props.match.params.id);
    }, [props.match.params.id])

    const getPersona = id => {
        PersonaDataService.get(id).then(response => {
            setCurrentPersona(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    const updatePersona = () => {

        let ok = true;
        let text = '';


        if (currentPersona.nombre.length == 0) {
            ok = false;
            text += text = 'Nombre,';
        }
        if (currentPersona.identificacion.length == 0) {
            ok = false;
            text += text = 'identificacion,';
        }
        if (currentPersona.fecha.length == 0) {
            ok = false;
            text += text = 'fecha ';
        }
        let msg = `Los siguientes campos son requeridos y "${text}" no pueden estar vacios`;
        if (ok) {
            PersonaDataService.update(currentPersona).then(response => {
                setMessage("Persona actualizda correctamente");
            }).catch(e => {
                console.log(e);
            });

        } else {
            setMessage(msg);
        }

    }

    const deletePersona = () => {
        PersonaDataService.remove(currentPersona.id).then(response => {
            props.history.push("/personas");
            console.log(response.data);
            setMessage("Persona actualizda correctamente");
        }).catch(e => {
            console.log(e);
        });
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        console.log(event.target);
        setCurrentPersona({ ...currentPersona, [name]: value })

    }

    return (
        <div>
            {currentPersona ? (
                <div className="edit-form">
                    <h4>Persona</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="identificacion">Identificacion</label>
                            <input
                                type="text"
                                className="form-control"
                                id="identificacion"
                                name="identificacion"
                                value={currentPersona.identificacion}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                name="nombre"
                                value={currentPersona.nombre}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="fecha">Fecha</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fecha"
                                name="fecha"
                                value={currentPersona.fecha}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>



                    <button className="badge badge-danger mr-2" onClick={deletePersona}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updatePersona}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                    <div>
                        <br />
                        <p>Seleccione una persona...</p>
                    </div>
                )
            }
        </div>
    );
}
export default Persona;