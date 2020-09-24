import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UserContext } from '../context'
import Authentication from '../screens/Authentication'
import Dashboard from '../screens/Dashboard'
import Profile from '../screens/Profile'
import NavBar from "../components/NavBar";


const validNavBarPaths = ["/", "/register", "/login"];

const AppRouter = () => {
  const user = useContext(UserContext);
//   debugger;
    return (
    <Router>
        {user && <NavBar />}
        <React.Fragment>
        {user ? (
            <React.Fragment>
                <Route exact path="/" render={() => <Dashboard />} />
                <Route path="/profile/:username" render={() => <Profile />} />
                <Route path="/messages" render={() => <Dashboard />} />
                <Route path="/explore" render={() => <Dashboard />} />
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