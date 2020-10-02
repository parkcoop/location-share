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
import { Link } from 'react-router-dom';
// let { feed } = require('../../../../screens/Authentication/data.json');

const PostContainer = styled.div`
    background: white;
    border: 1px solid rgba(var(--ce3,239,239,239),1);
    width: 90%;
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
const displayNameStyles = {display: "flex", alignItems:'center'};
const Avatar = styled.img`
    width: 30px;  
    height: 30px;
    border-radius: 25%;
    margin-right: 7.5px;
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


    const {loading, error, data} = useQuery(posts.GET_POSTS);

    // if (loading)
    let feed = data && [...data?.getPosts].reverse()
 

    return (
        <div>
            <NewPost></NewPost>

            {feed && feed.map((post, index)=> {
                return (
                    <PostContainer className="standard-page-module" key={index}>
                        <PostHeader>
                            <Link style={displayNameStyles} to={"/profile/" + post.postedBy.username}>
                                <Avatar src={post.postedBy.avatar} alt=""/>
                                {post.postedBy.username}
                            </Link>
                            <IconButton>
                                <MoreHorizIcon />
                            </IconButton>
                        </PostHeader>
                        <PostImage
                            src={post.image}
                        />
                        <p>{post.likes} likes</p>
                        <p>{post.body}</p>
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