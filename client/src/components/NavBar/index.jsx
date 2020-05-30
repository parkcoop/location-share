import React, { useState, useContext } from "react";
import styled from 'styled-components';
// import Menu from '@material-ui/core/Button';
import { Menu, MenuItem, Badge } from '@material-ui/core';
import { Mail } from '@material-ui/icons'
import { UserContext } from '../../context'
import { AuthContext } from '../../context';

const NavContainer = styled.div`
    background: #CDCDCD;
    width: 100vw;
    height: 75px;
    position: sticky;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;
const AvatarContainer = styled.button`
    display: flex;
    align-items: center;
    border: none;
    background: none;
`;
const Avatar = styled.img`
    width: 30px;  
    height: 30px;
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
    const user = useContext(UserContext)
    return (
        <NavContainer>
            <p>Location Share</p>
            {user ? (
                <React.Fragment>
                    <AvatarContainer
                        onClick={handleMenuClick}
                    >
                        <Avatar src={user.avatar} alt="" />
                        <p>{user.username}</p>
                    </AvatarContainer>
                    <Menu
                        onClose={handleCloseMenu}
          open={Boolean(menuAnchor)}
          variant="menu"
          transformOrigin={{ vertical: -50 }}
          anchorEl={menuAnchor}
                    >
                        <MenuItem onClick={handleCloseMenu}>
                            <Badge badgeContent={4} color="primary">
                                <Mail />
                            </Badge>
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                        <MenuItem onClick={()=>dispatch({type: 'LOGOUT'})}>signOut</MenuItem>
                    </Menu>
                </React.Fragment>

            ) : (
                    <div>Gotta log in</div>
                )}
        </NavContainer>
    )
}

export default NavBar