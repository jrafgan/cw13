import React, {Fragment} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Main from "./containers/Main";
import AddInstitution from "./containers/AddInstitution";
import Register from "./components/Register";
import Login from "./components/Login";
import Institution from "./containers/Institution";

const ProtectedRoute = ({isAllowed, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/login"/>
};

const Routes = ({user}) => {
    return (
        <Fragment>
            <Switch>
                <Route path="/" exact component={Main} />
                <ProtectedRoute
                    isAllowed={user}
                    path="/add_institution"
                    exact
                    component={AddInstitution}
                />
                <Route path="/institution/:id" exact component={Institution} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
            </Switch>
        </Fragment>
    );
};

export default Routes;