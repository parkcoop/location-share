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
        console.log(postBody)
    }

    const submitPost = async () => {
        console.log({variables: {username: user.username, body: postBody, image: postBody.image}})
        try {
            const newPost = await createPost({variables: {username: user.username, body: postBody.body, image: postBody.image}})
            console.log(newPost)
        }
        catch(err) {
            console.log('shit')
            // notify.error('LOGIN', err.message)
        }
    }


    return (
        <div>
            <TextField
                value={postBody.body}
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