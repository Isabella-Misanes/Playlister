import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkspaceScreen from './WorkspaceScreen';
import { Grid } from '@mui/material';

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

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function handleToggleExpand(event) {
        event.stopPropagation();
        toggleExpand();
    }

    function toggleExpand() {
        let newExpand = !expandActive;
        if(newExpand) {
            store.setIsListExpandedActive();
        }
        setExpandActive(newExpand);
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
                <Grid item xs={6}>
                    <Box sx={{}}>
                        <IconButton 
                            onClick={handleToggleExpand} 
                            aria-label='edit'>
                            <ExpandMoreIcon style={{
                                fontSize:'24pt'
                            }} 
                            />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </ListItem>;
    

    if(expandActive) {
            cardElement =
                <ListItem
                    id={idNamePair._id}
                    key={idNamePair._id}
                    sx={{ marginTop: '10px', display: 'flex', p: 1 }}
                    style={{ width: '100%', fontSize: '24pt' }}
                    /*
                    button
                    onClick={(event) => {
                        handleLoadList(event, idNamePair._id)
                    }}
                    */
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
                        <Grid item xs={6}>
                            <Box sx={{}}>
                                <IconButton 
                                    onClick={handleToggleExpand} 
                                    aria-label='edit'
                                    disabled={store.isModalOpen()}>
                                    <ExpandMoreIcon style={{
                                        fontSize:'24pt'
                                    }} 
                                    />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Box sx={{}}>
                            <IconButton 
                                onClick={handleToggleEdit} 
                                aria-label='edit'
                                disabled={store.isModalOpen()}>
                                <EditIcon style={{fontSize:'24pt'}} />
                            </IconButton>
                        </Box>
                        <Box sx={{}}>
                            <IconButton 
                                onClick={(event) => {
                                    handleDeleteList(event, idNamePair._id)
                                }} 
                                aria-label='delete'
                                disabled={store.isModalOpen()}>
                                <DeleteIcon style={{fontSize:'24pt'}} />
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
    return (
        cardElement
    );
}

export default ListCard;