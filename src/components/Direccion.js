import React, { useState, useEffect } from "react";
import DireccionDataService from "../services/DireccionService";

const Direccion = props => {

    const initialDireccionState = {
        id: null,
        numero: "",
        persona: {
            nombre: ""
        }
    }
    const [CurrentDireccion, setCurrentDireccion] = useState(initialDireccionState);
    const [message, setMessage] = useState("");
    useEffect(() => {
        getDireccion(props.match.params.id);
    }, [props.match.params.id])

    const getDireccion = id => {
        DireccionDataService.get(id).then(response => {
            setCurrentDireccion(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    const updateDireccion = () => {
        let ok = true;
        let text='';
        

        if (CurrentDireccion.otrasSenas.length == 0) {
            ok = false;
            text+=text='Senas ';
        }
        if (CurrentDireccion.codigoPostal.length == 0) {
            ok = false;
            text+=text=', Codigo postal';
        }
        let msg = `Los siguientes campos son requeridos y "${text}" no pueden estar vacios`;

        if (ok) {
            DireccionDataService.update(CurrentDireccion).then(response => {
                setMessage("Direccion actualizdo correctamente");
                props.history.push(`/direcciones/${Telefono.persona.id}`);
            }).catch(e => {
                console.log(e);
            });
        } else {
            setMessage(msg);
        }

    }

    const deleteDireccion = () => {
        DireccionDataService.remove(CurrentDireccion.id).then(response => {
            props.history.push("/Direccions");
            console.log(response.data);
            setMessage("Direccion actualizda correctamente");
        }).catch(e => {
            console.log(e);
        });
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentDireccion({ ...CurrentDireccion, [name]: value })

    }

    return (
        <div>
            {CurrentDireccion ? (
                <div className="edit-form">
                    <h4>Direccion</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="numero">Senas</label>
                            <input
                                type="text"
                                className="form-control"
                                id="otrasSenas"
                                required
                                value={CurrentDireccion.otrasSenas}
                                onChange={handleInputChange}
                                name="otrasSenas"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numero">Codigo Postal:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="numero"
                                required
                                value={CurrentDireccion.codigoPostal}
                                onChange={handleInputChange}
                                name="codigoPostal"
                            />
                        </div>

                    </form>



                    <button className="badge badge-danger mr-2" onClick={deleteDireccion}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateDireccion}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                    <div>
                        <br />
                        <p>Seleccione una Direccion...</p>
                    </div>
                )
            }
        </div>
    );
}
export default Direccion;