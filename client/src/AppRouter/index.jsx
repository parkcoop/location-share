import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UserContext } from '../context'
import Authentication from '../screens/Authentication'
import Dashboard from '../screens/Dashboard'


const validNavBarPaths = ["/", "/register", "/login"];

const AppRouter = () => {
  const user = useContext(UserContext);
//   debugger;
    return (
    <Router>
        <React.Fragment>
        {user ? (
            <React.Fragment>
                <Route path="/" render={() => <Dashboard />} />
                {/* <Route path="/dashboard" render={() => <Dashboard />} /> */}
            </React.Fragment>

        ) : (
            <React.Fragment>
                <Route path="/" render={() => <Authentication />} />
                <Route path="/login" render={() => <Authentication />} />
            </React.Fragment>
        )}
        </React.Fragment>
    </Router>
    )
}

export default AppRouter;