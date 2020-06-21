import React, { useState, useEffect } from "react";
import TelefonoDataService from "../services/TelefonoService";

const AddTelefono = props => {
    const initialTelefonoState = {
        id: null,
        numero: "",
        persona:{

        }
    };

    const [Telefono, setTelefono] = useState(initialTelefonoState);
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState("");



    useEffect(() => {
        Telefono.persona.id=props.match.params.id;
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTelefono({ ...Telefono, [name]: value } )   };

    const saveTelefono = () => {
        let ok = true;
        let text = '';


        if (Telefono.numero.length == 0 || Telefono.numero.length < 8) {
            ok = false;
        }
        let msg = `El numero debe tener almenos 8 digitos`;

        if (ok) {

            TelefonoDataService.create(Telefono)
                .then(response => {
                    setSubmitted(true);
                    props.history.push(`/telefonosList/${Telefono.persona.id}`);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            setMessage(msg);
        }
    };
    const newTelefono = () => {
        setTelefono(initialTelefonoState);
        setSubmitted(false);
    };

    return (

        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Enviado correctamente!</h4>
                    <button className="btn btn-success" onClick={newTelefono}>
                        ok
                    </button>
                </div>
            ) : (
                    <div>

                        <div className="form-group">
                            <label htmlFor="numero">Ingrese el Numero</label>
                            <input
                                type="text"
                                className="form-control"
                                id="numero"
                                required
                                value={Telefono.numero}
                                onChange={handleInputChange}
                                name="numero"
                            />
                        </div>

                        <button onClick={saveTelefono} className="btn btn-success">
                            Submit
                         </button>
                        <p>{message}</p>
                    </div>
                )}
        </div>
    );

}
export default AddTelefono;