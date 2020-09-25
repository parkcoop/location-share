import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UserContext } from '../context'
import Authentication from '../screens/Authentication'
import Dashboard from '../screens/Dashboard'
import Profile from '../screens/Profile'
import NavBar from "../components/NavBar";
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";


const validNavBarPaths = ["/", "/register", "/login"];

const AppRouter = () => {
  const user = useContext(UserContext);
  const [token, setToken] = useState(null)
//   const [user, setUser] = useState(null)
  useEffect(()=> {
      async function getToken() {
          const token = await Cookies.get('token')
          setToken(token)
          if (token) {
          console.log("DECODED", jwt_decode(token))
          console.log("PLERASE", token)

          }
      }
      getToken()
  }, [])
//   debugger;
    return (
    <Router>
        {(token || user) && <NavBar />}
        <React.Fragment>
        {(token || user) ? (
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