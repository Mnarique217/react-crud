import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
 
import './App.css';
import PersonaList from './components/PersonaList';
 
function App() {
 return (
 <Router>
 
 <Switch>
 <Route exact path={["/", "/personas"]} component={PersonaList}/>
 </Switch>
 </Router> 
 );
}
 
export default App;