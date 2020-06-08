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

const NavContainer = styled.div`
    background: #FFF;
    border-bottom: 1px solid #CDCDCD;
    width: 50%;
    height: 55px;
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
    const user = useContext(UserContext)
    return (
        <NavContainer>
            <p>Location Share</p>
            <ActionContainer>
                <Link to="/">
                    <IconButton
                        id="home">
                        <HomeIcon />
                    </IconButton>
                </Link>
                <IconButton
                    id="messages">
                    <SendIcon />
                </IconButton>
                <IconButton
                    id="explore">
                    <ExploreIcon />
                </IconButton>
                <IconButton
                    id="favorites">
                    <FavoriteBorderIcon />
                </IconButton>
                <Link to="/profile">
                    <IconButton
                        id="profile"
                    >
                        <Avatar src={user.avatar} alt="" />
                    </IconButton>
                </Link>
            </ActionContainer>
        </NavContainer>
    )
}

export default NavBar