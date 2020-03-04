import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import About from '../Components/aboutComponent'
  import Home from '../Components/homeComponent'

class navBarComponent extends React.Component{
    render(){
        return(
            <Router>
                <Link to="/">Home</Link>
                <Link to="/meals">Meals</Link>
                <Link to="/exercises">Exercises</Link>
                <Link to="/eval">Evaluation</Link>
                <Link to="/about">About</Link>

                <Switch>
                    <Route exact path="/about">
                        <About/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default navBarComponent;