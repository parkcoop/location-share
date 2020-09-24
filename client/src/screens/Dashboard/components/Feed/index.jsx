import React, { useState, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SendIcon from '@material-ui/icons/Send';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { IconButton, TextField } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import posts from '../../../../utils'
import {UserContext} from '../../../../context'
import Upload from '../NewPost/components/Upload'
import NewPost from '../NewPost'
// let { feed } = require('../../../../screens/Authentication/data.json');

const PostContainer = styled.div`
    background: white;
    border: 1px solid rgba(var(--ce3,239,239,239),1);
    width: 100%;
    /* height: 500px; */
    margin-bottom: 30px !important;
`;

const PostHeader = styled.div`
    div {
        width: 15%;
        display: flex;
        align-items: center;
        * {
            margin: 5px;
        }
    }
    height: 25px;
    padding: 5px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Avatar = styled.img`
    width: 30px;  
    height: 30px;
    border-radius: 25%;
`;
const ActionBar = styled.div`
    /* width: 100%; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 25px;
    padding: 5px 15px;
    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 20%;
    }
`;
const PostImage = styled.img`
    width: 100%;
`;
const PostBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
const CommentOnPost = styled.input`
    width: 100%;

`;
const Feed = () => {
    const user = useContext(UserContext)
    console.log("LOL", user)


    const {loading, error, data} = useQuery(posts.GET_POSTS,
    {
        variables: {
            username: user.username
        }
    });

    if (loading) console.log("loading")
    console.log(data)
    let feed = data && [...data?.getPosts].reverse()
 

    return (
        <div>
            <NewPost></NewPost>

            {feed && feed.map(post=> {
                return (
                    <PostContainer>
                        <PostHeader>
                            <div>
                                <Avatar src={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnSKW5YyoAmetyO8EJgJhhc_-rAQHUOM53PQ&usqp=CAU"} alt=""/>
                                {post.username}
                            </div>
                            <IconButton>
                                <MoreHorizIcon />
                            </IconButton>
                        </PostHeader>
                        <PostImage
                            src={post.image}
                        />
                        <ActionBar>
                            <div>
                                <IconButton>
                                  <FavoriteBorderIcon />
                                </IconButton>
                                <IconButton>
                                    <ChatBubbleOutlineIcon />
                                </IconButton>
                                <IconButton>    
                                    <SendIcon />
                                </IconButton>   
                            </div>
                            <IconButton>
                                <BookmarkBorderIcon />
                            </IconButton>
                        </ActionBar>
                        <PostBody>
                            {post.comments && post.comments.map(comment => {
                                return (
                                    <div>
                                        <p>{comment.user.username}: {comment.content}</p>
                                    </div>
                                )
                            })}
                        </PostBody>
                        <CommentOnPost>
                            
                        </CommentOnPost>
                    </PostContainer>
                )
            })}
        </div>
    )
}

export default Feed;