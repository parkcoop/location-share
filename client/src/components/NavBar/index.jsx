import React, { useState, useContext } from "react";
import styled from 'styled-components';
// import Menu from '@material-ui/core/Button';
import { Menu, MenuItem, Badge } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Mail } from '@material-ui/icons'
import { UserContext } from '../../context'
import { AuthContext } from '../../context';
import { IconButton } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import logo from '../../assets/images/logo.png'

const NavContainer = styled.div`
    background: #282828;;
    border-bottom: 1px solid #CDCDCD;
    width: 50%;
    height: 75px;
    position: sticky;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 25%;
`;
const ActionContainer = styled.div`
    display: flex;
    align-items: center;
    border: none;
    background: none;
    /* width: 210px; */
    justify-content: space-between;
`;
const Avatar = styled.img`
    width: 25px;  
    height: 25px;
    border-radius: 25%;
`;

const navbarIconStyle = {
    color: `rgb(255 255 255 / 90%)`
}

const Logo = styled.img`
    height: 50px;
`
const NavBar = () => {
    const [menuAnchor, setMenuAnchor] = useState(false);
    const dispatch = useContext(AuthContext)
    const handleMenuClick = e => {
        e.stopPropagation();
        setMenuAnchor(e.currentTarget);
    };
    const handleCloseMenu = e => {
        e.stopPropagation();
        setMenuAnchor(false);
    };
    const navigateTo = id => {
        console.log(id)
        window.location.href = `/${id}`
    }

    const logout = () => {
        Cookies.remove('token')
        window.location.href = "/"
    }
    const user = useContext(UserContext)
    return (
        <NavContainer>
            <Link to="/">
                <Logo alt="locationshare" src={logo} />
            </Link>
            <ActionContainer>
                <Link to="/">
                    <IconButton
                        style={navbarIconStyle}
                        id="home">
                        <HomeIcon />
                    </IconButton>
                </Link>
                <IconButton
                    style={navbarIconStyle}
                    id="messages">
                    <SendIcon />
                </IconButton>
                <IconButton
                    style={navbarIconStyle}
                    id="explore">
                    <ExploreIcon />
                </IconButton>
                <IconButton
                    style={navbarIconStyle}
                    onClick={logout}
                    id="favorites">
                    <FavoriteBorderIcon />
                </IconButton>
                <Link to={"/profile/" + user?.username}>
                    <IconButton
                        id="profile"
                    >
                        <Avatar src={user?.avatar} alt="" />
                    </IconButton>
                </Link>
            </ActionContainer>
        </NavContainer>
    )
}

export default NavBar