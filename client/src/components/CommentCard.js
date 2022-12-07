import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { useReducer } from 'react';

function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { user, comment } = props;

    let cardElement =
        <ListItem
            sx={{ marginTop: '10px', display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '24pt' }}
            button
            onClick={(event) => {
                console.log("Hello world");
            }}
        >
            <Box sx={{ p: 1, flexGrow: 1 }}>{user}</Box>
            <Box sx={{ p: 1 }}>{comment}</Box>
        </ListItem>;

    return (
        cardElement
    );
}

export default CommentCard;