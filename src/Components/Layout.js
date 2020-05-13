import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./homeComponent";
import Meals from "./foodComponent";
import Exercises from "./exerciseComponet";
import Evaluation from "./EvaluationComponent";
import '../Style/LayoutStyle.css';

const Layout = ({quotes}) =>
    <div id="Layout">
        <Router >
            <div className="router">
                <Link to="/">Home</Link>
                <Link to="/meals">Meals</Link>
                <Link to="/exercises">Exercises</Link>
                <Link to="/evaluations">Evaluation</Link>
            </div>
            <Switch>
                <Route exact path="/">
                    <Home quotes={quotes} />
                </Route>
                <Route exact path="/meals">
                    <Meals/>
                </Route>
                <Route exact path="/exercises">
                    <Exercises/>
                </Route>
                <Route exact path="/evaluations">
                    <Evaluation/>
                </Route>
                <Route exact path="/register">
                </Route>
            </Switch>
        </Router>

        <footer className="page-footer font-small blue">
            <div className="footer-copyright text-center py-3">@Tarcsa Tamás</div>
        </footer>
    </div>


export default Layout;