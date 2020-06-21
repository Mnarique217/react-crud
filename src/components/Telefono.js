import React, { useState, useEffect } from "react";
import TelefonoDataService from "../services/TelefonoService";

const Telefono = props => {

    const initialTelefonoState = {
        id: null,
        numero: "",
        persona:{
            nombre:""
        }
    }
    const [CurrentTelefono, setCurrentTelefono] = useState(initialTelefonoState);
    const [message, setMessage] = useState("");
    useEffect(() => {
        getTelefono(props.match.params.id);
    }, [props.match.params.id])

    const getTelefono = id => {
        TelefonoDataService.get(id).then(response => {
            setCurrentTelefono(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    const updateTelefono = () => {
        let ok = true;
        let text='';
        

        if (CurrentTelefono.numero.length == 0 || CurrentTelefono.numero.length < 8) {
            ok = false;
        }
        let msg = `El numero debe tener almenos 8 digitos`;

        if (ok) {
            TelefonoDataService.update(CurrentTelefono).then(response => {
                setMessage("Telefono actualizdo correctamente");
            }).catch(e => {
                console.log(e);
            });
        } else {
            setMessage(msg);
        }

    }

    const deleteTelefono = () => {
        TelefonoDataService.remove(CurrentTelefono.id).then(response => {
            props.history.push("/Telefonos");
            console.log(response.data);
            setMessage("Telefono actualizda correctamente");
        }).catch(e => {
            console.log(e);
        });
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentTelefono({ ...CurrentTelefono, [name]: value })

    }

    return (
        <div>
            {CurrentTelefono ? (
                <div className="edit-form">
                    <h4>Telefono</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="numero">Numero</label>
                            <input
                                type="number"
                                className="form-control"
                                id="numero"
                                name="numero"
                                value={CurrentTelefono.numero}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombre">Persona</label>
                            <input disabled
                                type="text"
                                className="form-control"
                                id="nombre"
                                name="nombre"
                                value={CurrentTelefono.persona.nombre}
                            />
                        </div>

                    </form>



                    <button className="badge badge-danger mr-2" onClick={deleteTelefono}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateTelefono}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                    <div>
                        <br />
                        <p>Seleccione una Telefono...</p>
                    </div>
                )
            }
        </div>
    );
}
export default Telefono;