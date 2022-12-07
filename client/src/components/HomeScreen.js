import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import MUIEditSongModal from './MUIEditSongModal'
import SongCard from './SongCard'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const buttonStyle = {
        margin: 0,
        top: 'auto',
        right: '55%',
        bottom: '5.5%',
        left: 'auto',
        position: 'fixed',
    };
    const textStyle = {
        margin: 0,
        fontSize: '30pt',
        top: 'auto',
        right: '40%',
        bottom: '4%',
        left: 'auto',
        position: 'fixed',
    };

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    function checkSearchType() {
        if(store.searchType === store.isHome()) {
            return "false";
        }
        else {
            return "true";
        }
    }

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '97.5%', height: '100%', left: '2.5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    >
                    </ListCard>
                ))
            }
            </List>;
    }
    
    if(store.searchType === "BY_TITLE") {
        return (
            <div id="playlist-selector">
            <div id="list-selector-heading">
                <Typography 
                    style={textStyle}
                    >
                        All Lists
                </Typography>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>
        );
    }
    else if(store.searchType === "BY_USER") {
        return (
            <div id="playlist-selector">
            <div id="list-selector-heading">
                <Typography 
                    style={textStyle}
                    >
                        Lists by 
                </Typography>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>
        );
    }

    return (
        <div id="playlist-selector">
            <div id="list-selector-heading">
            <Fab 
                style={buttonStyle}
                color="primary" 
                aria-label="add"
                aria-hidden={checkSearchType()}
                id="add-list-button"
                onClick={handleCreateNewList}
                disabled={store.isModalOpen() || !store.isHome() || store.currentList != null }
            >
                <AddIcon />
            </Fab>
                <Typography 
                    style={textStyle}
                    >
                        Your Lists
                </Typography>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </div>
        </div>
    );
    
    
}

export default HomeScreen;