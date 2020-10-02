import React from 'react'
import styled from 'styled-components';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Avatar, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';

import ConversationTile from './components/ConversationTile'
import CurrentConversation from './components/CurrentConversation'

const MessagesContainer = styled.div`
    width: 50%;
    margin: auto;
    background: white;
    display: flex;
    height: 90vh;
`
const ConversationList = styled.div`
    width: 33%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`
const OpenedConversation = styled.div`
    width: 67%;
    display: flex;
    flex-direction: column;

`

const PaneTitle = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const conversations = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]

const Messages = () => {
    return (
        <MessagesContainer>
            <ConversationList>
                <PaneTitle>
                    <span>
                        {" "}
                    </span>
                    <span>
                        Direct
                    </span>
                    <IconButton
                        id="messages">
                        <SendIcon />
                    </IconButton>
                </PaneTitle>
                {conversations && conversations.map((item, index) => {
                    return (
                        <ConversationTile>
                        </ConversationTile>
                    )
                })}
            </ConversationList>
            <OpenedConversation>
                <PaneTitle>
                    <span style={{display: "flex", alignItems: "center"}}>
                        <Avatar>
                        </Avatar>
                        <span>parkcoop</span>
                    </span>

                    <IconButton
                        id="messages"
                    >
                        <SendIcon />
                    </IconButton>
                </PaneTitle>
                <CurrentConversation>
                    
                </CurrentConversation>
            </OpenedConversation>
        </MessagesContainer>
    )
}

export default Messages