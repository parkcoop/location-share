import React, { useState, useReducer, useContext } from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { useQuery, useMutation } from '@apollo/client';
import { UserContext } from '../../../../context'
import posts from '../../../../utils'



const AboutMeBanner = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    border: 1px solid red;
    justify-content: space-between;
`

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;

`
const Avatar = styled.img`
    border-radius: 25%;
    width: 140px;
    margin: 25px 50px;

`

const UserLine = styled.div`
    display: flex;
    width: 50%;
    justify-content: space-between;
`

const AboutSection = ({profile}) => {
    const user = useContext(UserContext)
    return (
        <AboutMeBanner>
            {(profile && user) && (
                <React.Fragment>
                    <Avatar
                        src={profile?.avatar}>
                    </Avatar>
                    <ProfileInfo>
                        <UserLine>
                            <p>{profile?.username}</p>
                            <button>
                                {user.username === profile.username ? "Edit Profile" : "Follow"}
                            </button>
                            <IconButton
                                id="home">
                                <HomeIcon />
                            </IconButton>
                        </UserLine>
                    </ProfileInfo>
                </React.Fragment>
            )}
        </AboutMeBanner>
    )
}

export default AboutSection