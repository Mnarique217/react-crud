import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './App.css';
import PersonaList from './components/PersonaList';
import Persona from './components/Persona';
import TelefonoList from './components/TelefonoList';
import Telefono from './components/Telefono';
import AddTelefono from './components/AddTelefono';
import AddPersona from './components/AddPersona';
import DireccionList from './components/DireccionList';
import AddDireccion from './components/AddDireccion';
import Direccion from './components/Direccion';

function App() {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/personas" className="navbar-brand">
                        UNA
    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/personas"} className="nav-link">
                                Lista de personas
                                </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link">
                                Incluir personas
                            </Link>
                        </li>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/personas"]} component={PersonaList} />
                        <Route exact path="/add" component={AddPersona} />                        
                        <Route path="/personas/:id" component={Persona} />  
                        <Route path="/telefonos/:id" component={Telefono} />                      
                        <Route path="/telefonosList/:id" component={TelefonoList} />
                        <Route exact path="/addTelefono/:id" component={AddTelefono} />
                        <Route exact path="/direcciones/:id" component={DireccionList} />                        
                        <Route exact path="/addDireccion/:id" component={AddDireccion} />
                        <Route exact path="/direccion/:id" component={Direccion} />
                        
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;