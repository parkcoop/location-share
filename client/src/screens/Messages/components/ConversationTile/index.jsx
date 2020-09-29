import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

const TileContainer = styled.div`
    width: 100%;
    border: 0.5px solid red;
    padding: 5px;
    height: 60px;
    display: flex;

`

const ConversationPreview = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
`

const ConversationTile = () => {
    return (
        <Link>
            <TileContainer>
                <Avatar />
                <ConversationPreview>
                    <span>userhey</span>
                    <span>
                        <span>And yea that sounds good...</span>
                        <span>12s</span>
                    </span>
                </ConversationPreview>
            </TileContainer>
        </Link>
    )
}

export default ConversationTile