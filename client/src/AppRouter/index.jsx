import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UserContext, AuthContext } from '../context'
import Authentication from '../screens/Authentication'
import Dashboard from '../screens/Dashboard'
import Messages from '../screens/Messages'
import Profile from '../screens/Profile'
import NavBar from "../components/NavBar";
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";

const AppRouter = () => {
    let user = useContext(UserContext);
    const dispatch = useContext(AuthContext);
    const [token, setToken] = useState(null)

  useEffect(()=> {
      checkToken()
  }, [])

    const checkToken = async () => {
        const token = await Cookies.get('token')
        setToken(token)
        let validatedUser
        if (token) {
            validatedUser = jwt_decode(token).user
            if (!user) {
                dispatch({
                    user: {
                        id: validatedUser._id,
                        username: validatedUser.username,
                        password: validatedUser.password,
                        avatar: validatedUser.avatar,
                        token: token
                    },
                    type: "CHECK_TOKEN"
                })

            }
        }
    }

    return (
        <Router >
            {(token || user) && <NavBar />}
            <React.Fragment>
                {(token || user) ? (
                    <React.Fragment>
                        <Route path="/" render={() => {
                            checkToken()
                            return <AuthenticatedRoutes />
                        }} />
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

function AuthenticatedRoutes() {
    return (
        <React.Fragment>
            <Route exact path="/" render={() => <Dashboard />} />
            <Route path="/profile/:username" render={() => <Profile />} />
            <Route path="/messages" render={() => <Messages />} />
            <Route path="/explore" render={() => <Dashboard />} />
        </React.Fragment>
    )
}

export default AppRouter;