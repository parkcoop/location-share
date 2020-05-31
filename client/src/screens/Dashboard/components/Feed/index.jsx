import React from 'react';
import styled from 'styled-components';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SendIcon from '@material-ui/icons/Send';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

let { feed } = require('../../../../screens/Authentication/data.json');

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
    return (
        <div>
            {feed.map(post=> {
                return (
                    <PostContainer>
                        <PostHeader>
                            <div>
                                <Avatar src={post.user.avatar} alt=""/>
                                {post.user.username}
                            </div>
                        </PostHeader>
                        <PostImage
                            src={post.img}
                        />
                        <ActionBar>
                            <div>
                                <FavoriteBorderIcon />
                                <ChatBubbleOutlineIcon />
                                <SendIcon />
                            </div>
                            <BookmarkBorderIcon />
                        </ActionBar>
                        <PostBody>
                            {post.comments.map(comment => {
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