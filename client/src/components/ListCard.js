import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Button } from '@mui/material';
import WorkspaceScreen from './WorkspaceScreen';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import SongCard from './SongCard';
import PublishedSongCard from './PublishedSongCard';
import EditToolbar from './EditToolbar';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [expandActive, setExpandActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    function handleLoadList() {
        console.log(idNamePair._id);
        let id = idNamePair._id;
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function handleToggleExpand(event) {
        event.stopPropagation();
        toggleExpand();
    }

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    function toggleExpand() {
        let newExpand = !expandActive;
        if(newExpand) {
            handleLoadList();
            async function waitLoadList() {
                await timeout(500);
                console.log("What is current list?");
                console.log(store.currentList)
                store.setIsListExpandedActive();
                setExpandActive(newExpand);
            }
            waitLoadList();
        }
        else {
            setExpandActive(newExpand);
            store.closeCurrentList();
        }
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    async function handlePublishList(event, id) {
        event.stopPropagation();
        store.publishPlaylist(id);
    }

    async function handleDuplicateList(event) {
        event.stopPropagation();
        let list = store.currentList;
        const response = await store.duplicateList(list);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let editToolbar = "";
    if (store.currentList) {
        editToolbar = <EditToolbar />;
    }
    
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '10px', display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '24pt' }}
        >
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                </Grid>
                <Grid item xs={12}>
                    <Box 
                        sx={{ paddingLeft: 1.5, flexGrow: 1 }}
                        style={{fontSize: '12pt'}}
                        >
                            by {auth.getUsername()}
                    </Box>
                </Grid>
                        
            </Grid>
            <IconButton 
                onClick={handleToggleExpand} 
                aria-label='edit'
                disabled={store.currentList != null}>
                <ExpandMoreIcon style={{
                    fontSize:'24pt'
                    }} 
                />
            </IconButton>
            
        </ListItem>;
    
    if(expandActive && store.currentList != null && !store.currentList.isPublished) {
        cardElement =
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{ marginTop: '10px', display: 'flex', p: 1 }}
                style={{ width: '100%', fontSize: '24pt' }}
            >
                <Grid container>
                    <Grid item xs={12}>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box 
                            sx={{ paddingLeft: 1.5, flexGrow: 1 }}
                            style={{fontSize: '12pt'}}
                            >
                                by {auth.getUsername()}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <List 
                                id="playlist-cards" 
                                sx={{ width: '100%', bgcolor: 'background.paper' }}
                            >
                                {
                                    store.currentList.songs.map((song, index) => (
                                        <SongCard
                                            id={'playlist-song-' + (index)}
                                            key={'playlist-song-' + (index)}
                                            index={index}
                                            song={song}
                                        />
                                    ))  
                                    
                                }
                            </List>
                        </Box>
                    </Grid>
                    <Box sx={{}}>{editToolbar}</Box>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Box sx={{}}>
                        <Button 
                            onClick={(event) => {
                                handlePublishList(event, idNamePair._id)
                            }} 
                            aria-label='publish'
                            disabled={store.isModalOpen()}>
                            Publish
                        </Button>
                    </Box>
                    <Box sx={{}}>
                        <IconButton 
                            onClick={handleToggleEdit} 
                            aria-label='edit'
                            disabled={store.isModalOpen()}>
                            <EditIcon style={{fontSize:'24pt'}} />
                        </IconButton>
                    </Box>
                    <Box sx={{}}>
                        <Button 
                            onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} 
                            aria-label='delete'
                            disabled={store.isModalOpen()}>
                            Delete
                        </Button>
                    </Box>
                    <Box sx={{}}>
                        <IconButton 
                            onClick={handleToggleExpand} 
                            aria-label='edit'
                            disabled={store.isModalOpen()}>
                            <ExpandLessIcon style={{
                                fontSize:'24pt'
                            }} 
                            />
                        </IconButton>
                    </Box>
                </Grid>
            </ListItem>
    }

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 24}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }

    if(expandActive && store.currentList != null && store.currentList.isPublished) {
        cardElement = 
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{ marginTop: '10px', display: 'flex', p: 1 }}
                style={{ width: '100%', fontSize: '24pt' }}
            >
                <Grid container>
                    <Grid item xs={12}>
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box 
                            sx={{ paddingLeft: 1.5, flexGrow: 1 }}
                            style={{fontSize: '12pt'}}
                            >
                                by {auth.getUsername()}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <List 
                                id="playlist-cards" 
                                sx={{ width: '100%', bgcolor: 'background.paper' }}
                            >
                                {
                                    store.currentList.songs.map((song, index) => (
                                        <PublishedSongCard
                                            id={'playlist-song-' + (index)}
                                            key={'playlist-song-' + (index)}
                                            index={index}
                                            song={song}
                                        />
                                    ))  
                                    
                                }
                            </List>
                        </Box>
                    </Grid>
                    <Box sx={{}}>
                        <Button 
                            onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} 
                            aria-label='delete'
                            disabled={store.isModalOpen()}>
                            Delete
                        </Button>
                    </Box>
                    <Box sx={{}}>
                        <Button 
                            onClick={(event) => {
                                handleDuplicateList(event)
                            }} 
                            aria-label='delete'
                            disabled={store.isModalOpen()}>
                            Duplicate
                        </Button>
                    </Box>
                    <Box sx={{}}>
                        <IconButton 
                            onClick={handleToggleExpand} 
                            aria-label='edit'
                            disabled={store.isModalOpen()}>
                            <ExpandLessIcon style={{
                                fontSize:'24pt'
                            }} 
                            />
                        </IconButton>
                    </Box>
                </Grid>
            </ListItem>
        
    }



    return (
        cardElement
    );
}

export default ListCard;