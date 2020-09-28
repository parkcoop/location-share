import React, { useState, useContext, createContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import SendIcon from '@material-ui/icons/Send';
import { IconButton, TextField } from '@material-ui/core';
import Upload from './components/Upload'
import { UserContext, PostContext } from '../../../../context'

import posts from '../../../../utils'


const NewPost = () => {
    const user = useContext(UserContext)
    const [postBody, setPostBody] = useState({
        body: null,
        image: null
    })

    const updateImage = (url) => {
        setPostBody(prevState => ({
            ...prevState,
            image: url
        }))
    }

    // const updatePost



    const [createPost] = useMutation(posts.CREATE_POST)

   const handlePostBody = (input) => {
        setPostBody({
            ...postBody,
            body: input.target.value
        })
    }

    const submitPost = async () => {
        try {
            const newPost = await createPost({variables: {userId: user.id, username: user.username, body: postBody.body, image: postBody.image}})
            window.location.reload(); 

        }
        catch(err) {
            console.log('shit', err)
            // notify.error('LOGIN', err.message)
        }
    }


    return (
        <div>
            <TextField
                value={postBody.body}
                style={{width:'100%'}}
                placeholder="What's on your mind?"
                onChange={(e) => handlePostBody(e)}
            ></TextField>
            <Upload
                post={postBody}
                updateImage={updateImage}>

            </Upload>
                <IconButton
                onClick={submitPost}
                >    
                    <SendIcon />
                </IconButton>  
        </div>
    )
}

export default NewPost