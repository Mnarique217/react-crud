import React, { useState, useEffect } from "react";
import DireccionDataService from "../services/DireccionService";

const AddDireccion = props => {
    const initialDireccionState = {
        id: null,
        otrasSenas: "",
        persona:{
            id:''
        },
        codigoPostal:''
    };

    const [Direccion, setDireccion] = useState(initialDireccionState);
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState("");



    useEffect(() => {
        Direccion.persona.id=props.match.params.id;
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setDireccion({ ...Direccion, [name]: value } )   };

    const saveDireccion = () => {
        let ok = true;
        let text='';
        

        if (Direccion.otrasSenas.length == 0) {
            ok = false;
            text+=text='Senas ';
        }
        if (Direccion.codigoPostal.length == 0) {
            ok = false;
            text+=text=', Codigo postal';
        }
        let msg = `Los siguientes campos son requeridos y "${text}" no pueden estar vacios`;

        console.log(Direccion);
        if (ok) {

            DireccionDataService.create(Direccion)
                .then(response => {
                    setSubmitted(true);
                    props.history.push(`/direcciones/${Direccion.persona.id}`);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            setMessage(msg);
        }
    };
    const newDireccion = () => {
        setDireccion(initialDireccionState);
        setSubmitted(false);
    };

    return (

        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Enviado correctamente!</h4>
                    <button className="btn btn-success" onClick={newDireccion}>
                        ok
                    </button>
                </div>
            ) : (
                    <div>

                        <div className="form-group">
                            <label htmlFor="numero">Senas</label>
                            <input
                                type="text"
                                className="form-control"
                                id="otrasSenas"
                                required
                                value={Direccion.otrasSenas}
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
                                value={Direccion.codigoPostal}
                                onChange={handleInputChange}
                                name="codigoPostal"
                            />
                        </div>
                        <button onClick={saveDireccion} className="btn btn-success">
                            Submit
                         </button>
                        <p>{message}</p>
                    </div>
                )}
        </div>
    );

}
export default AddDireccion;