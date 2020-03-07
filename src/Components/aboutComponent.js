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
                        <Link to="/about/">Basics Knowledge</Link>
                        <Link to="/about/creator">About the creator</Link>
                        <Link to="/about/project">About the project</Link>
                        <Link to="/about/contact">Contact</Link>
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