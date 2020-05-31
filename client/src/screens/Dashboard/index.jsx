import React from 'react';
import styled from 'styled-components';

import Feed from './components/Feed'
let { stories } = require('../../screens/Authentication/data.json');

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Container = styled.div`
    /* background: #CDCDCD; */
    /* padding: 10px 0px 0px 10px; */
    margin: auto;
    width: 50%;
    height: 100%;  
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 66%;
  div {
    margin: 10px 0px;
  }

`;

const StoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(var(--ce3,239,239,239),1);
  width: 98%;
  height: 100px;
  background: white;
  height: 115px;
  padding: 0px 1%;
`;

const SideContainer = styled.div`
  width: 33%;

`;
const AllStories = styled.ul`
    display: inline-flex;
    padding: 0px;
    list-style: none;
    width: 100%;
    overflow-x: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
`;
const SingleStory = styled.li`
  width: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 10px;
  p {
    margin: 0px;
    font-size: 0.8em;
  }
`;
const Avatar = styled.img`
    width: 50px;  
    height: 50px;
    border-radius: 25%;
    margin: 5px;
`;
const Stories = () => {
  return (
    <StoryContainer>
      <AllStories>
        {stories.map(story => {
          return (
            <SingleStory>
              <Avatar
                src={story.user.avatar}>
              </Avatar>
                <p>{story.user.username}</p>
            </SingleStory>
          )
        })}
      </AllStories>
    </StoryContainer>
  )
}

const Dashboard = () => {
  // debugger;
  return (
    <Container>
      <FeedContainer>
        <Stories></Stories>
        <Feed></Feed>
      </FeedContainer>
      <SideContainer>

      </SideContainer>
    </Container>
  )
}

export default Dashboard;
  