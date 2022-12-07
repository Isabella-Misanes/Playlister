import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
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
  const [value, setValue] = React.useState("one");
  
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

  function addComment(comm) {

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
              {
                store.currentList.comments.map((user, comment) => (
                  <CommentCard
                    user={user}
                    comment={comment}
                  />
                )) 
              }
            </List>
          </Box>
          <Box sx={{paddingLeft: 4}}>
            <TextField 
              sx={{ width: '90%' }}
              id="outlined-basic" 
              label="Add comment" 
              variant="outlined" 
              inputProps={{min: 0, style: { textAlign: 'center'}}}
              onChange={(newValue) => addComment(newValue.target.value)}
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