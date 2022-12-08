import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

import { Box } from '@mui/system'
import { Paper, Tabs } from '@mui/material'
import { Tab } from '@mui/material'
import Grid from '@mui/material'
import { TextField } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import YouTubeToolbar from './YouTubeToolbar'
import CommentCard from './CommentCard'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
function PageTabs() {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [value, setValue] = React.useState("one");
  const buttonStyle = {
      margin: 0,
      top: 'auto',
      right: '60%',
      bottom: '5.5%',
      left: 'auto',
      position: 'fixed',
  };
  const textStyle = {
      margin: 0,
      top: 'auto',
      right: '40%',
      bottom: '4%',
      left: 'auto',
      position: 'fixed',
  };
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function checkValue() {
    if(value === "one") {
      return 'visible';
    }
    else return 'hidden';
  }
  function checkComment() {
    if(value === "two") {
      return 'visible';
    }
    else return 'hidden';
  }

  function checkStatus() {
    if(store.currentList != null && store.currentList.isPublished) {
      return false;
    }
    else return true;
  }
  function handleKeyPress(event) {
    console.log("in handlekeypress");
    if(event.code === 'Enter') {
      console.log("Pressed enter");
      addComment(event.target.value);
    }
  }
  async function addComment(comment) {
    
    let bool = await store.postComment(auth.user.username, comment);
    if(bool) {
      console.log("Post comment success!");
      async function waitRefresh() {
        await store.setCurrentList(store.currentList._id);
      }
      waitRefresh();
    }
    
  }
  
  if(value === "one") {
    return (
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="youtube-player"
        >
          <Tab value="one" label="Player"></Tab>
          <Tab 
            value="two" 
            label="Comments">
            disabled={checkStatus}
          </Tab>
        </Tabs>
        <Box component="div" sx={{ visibility: {checkValue}}}>
          <YouTubeToolbar />
        </Box>
        
      </Box>
    );
  }
  else {
    if(store.currentList != null && store.currentList.isPublished) {
      return (
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="youtube-player"
          >
            <Tab value="one" label="Player"></Tab>
            <Tab value="two" label="Comments" disabled={checkStatus}></Tab>
          </Tabs>
          <Box component="div" sx={{ visibility: {checkComment}}}>
            <List 
              id="playlist-cards" 
              sx={{ width: '100%', bgcolor: 'background.paper' }}
            >
              
            </List>
          </Box>
          <Box sx={{paddingLeft: 4}}>
            <TextField 
              sx={{ width: '90%' }}
              id="outlined-basic" 
              label="Add comment" 
              variant="outlined" 
              inputProps={{min: 0, style: { textAlign: 'center'}}}
              onKeyDown={handleKeyPress}
            />
          </Box>
        </Box>
      );
    }
    else {
      return (
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="youtube-player"
          >
            <Tab value="one" label="Player"></Tab>
            <Tab value="two" label="Comments" disabled={checkStatus}></Tab>
          </Tabs>
        </Box>
      );
    }
  }
}
export default PageTabs;