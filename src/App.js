import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './App.css';
import PersonaList from './components/PersonaList';
import Persona from './components/Persona';
import AddPersona from './components/AddPersona';

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
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;