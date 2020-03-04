import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Basics from '../Elements/AboutBasics'
import '../Style/about.css'

class aboutComponent extends React.Component{
    render(){
        return(
            <>
                <Router>
                    <div className="float-left d-grid">
                        <Link to="/">Basics Knowledge</Link>
                        <Link to="/creator">About the creator</Link>
                        <Link to="/project">About the project</Link>
                        <Link to="/contact">Contact</Link>
                    </div>

                    <Switch>
                        <Route exact path="/about/">
                            <Basics/>
                        </Route>
                    </Switch>
                </Router>

            </>
        )
    }
}

export default aboutComponent