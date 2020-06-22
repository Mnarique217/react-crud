import React, { useState, useEffect } from "react";
import DireccionDataService from "../services/DireccionService";
import { Link } from "react-router-dom"
const DireccionList = props => {
    const personaInitial = {
        id: null
    };

    const [persona, setPersona] = useState(personaInitial);
    const [Direccions, setDireccions] = useState([]);
    const [currentDireccion, setcurrentDireccion] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);


    useEffect(() => {
        persona.id = props.match.params.id;
    }, [props.match.params.id]);

    const deleteDireccion = () => {
        DireccionDataService.remove(currentDireccion.id).then(response => {
            DireccionDataService.getAll()
                .then(response => {
                    let array = [] = response.data;
                    let userDireccions = [];
                    array.forEach(Direccion => {
                        if (Direccion.persona.id == persona.id) {
                            userDireccions.push(Direccion);
                        }
                    });

                    setDireccions(userDireccions);

                })
                .catch(e => {
                    console.log(e);
                })
        }).catch(e => {
            console.log(e);
        });
    }


    const retriveDireccions = () => {
        DireccionDataService.getAll()
            .then(response => {
                let array = [] = response.data;
                let userDireccions = [];
                array.forEach(Direccion => {
                    if (Direccion.persona.id == persona.id) {
                        userDireccions.push(Direccion);
                    }
                });

                console.log(userDireccions);
                setDireccions(userDireccions);
            })
            .catch(e => {
                console.log(e);
            })
    };
    useEffect(() => { retriveDireccions(); }, []);

    const setActiveDireccion = (Direccion, index) => {
        setcurrentDireccion(Direccion);
        setCurrentIndex(index);
    };

    return (


        <div className="list row">
            <div className="col-md-12">

                <Link
                    to={"/addDireccion/" + persona.id}
                    className="badge badge-info"
                >
                    Agregar Direccion
                     </Link>

            </div>

            <div className="col-md-6">
                <h4>Direccions</h4>

                <ul className="list-group">
                    {Direccions &&
                        Direccions.map((Direccion, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveDireccion(Direccion, index)}
                                key={index}
                            >
                                <div>
                                    <label>
                                        <strong>Senas:</strong>
                                    </label>{" "}
                                    {Direccion.otrasSenas}
                                </div>
                                <div>
                                    <label>
                                        <strong>Cod Postal:</strong>
                                    </label>{" "}
                                    {Direccion.codigoPostal}
                                </div>
                                <div>
                                    <label>
                                        <strong>Persona:</strong>
                                    </label>{" "}
                                    {Direccion.persona.nombre}
                                </div>

                            </li>
                        ))}
                </ul>
            </div>

            <div className="col-md-6">
                {currentDireccion ? (
                    <div>
                        <h4>Persona</h4>
                        <div>
                            <label>
                                <strong>Identificación:</strong>
                            </label>{" "}
                            {currentDireccion.persona.identificacion}
                        </div>
                        <div>
                            <label>
                                <strong>Nombre:</strong>
                            </label>{" "}
                            {currentDireccion.persona.nombre}
                        </div>
                        <div>
                            <label>
                                <strong>Fecha:</strong>
                            </label>{" "}
                            {currentDireccion.persona.fecha}
                        </div>

                        <Link
                            to={"/direccion/" + currentDireccion.id}
                            className="badge badge-warning"
                        >
                            Edit
                          </Link>


                        <button className="badge badge-danger mr-2 button-xs" onClick={deleteDireccion}>
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
export default DireccionList;