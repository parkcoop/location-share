import React, { useState, useReducer, useContext } from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { useQuery, useMutation } from '@apollo/client';
import {UserContext} from '../../../../context'
import posts from '../../../../utils'


const FeedContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    border: 1px solid red;
`

const PostSquare = styled.img`
    width: 33%;
    border: 1px solid black;
`


const Feed = () => {
    const user = useContext(UserContext)

    const {loading, error, data} = useQuery(posts.GET_POSTS,
        {
            variables: {
                username: user.username
            }
        }
    );

    if (loading) console.log("loading")
    console.log(data?.getPosts)
    let userPosts = data && [...data?.getPosts].reverse()

    return (
        <FeedContainer>
            {userPosts && userPosts.map((post, index)=> (
                <PostSquare
                    src={post.image}
                    key={index}
                />
            ))}
        </FeedContainer>
    )

}

export default Feed