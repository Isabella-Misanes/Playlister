import { useContext, useState } from 'react';
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import EditToolbar from './EditToolbar'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { TextField } from '@mui/material';

//Icons
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import SortIcon from '@mui/icons-material/Sort';

export default function HomeBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleSortClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSortAlphabetical = () => {
        
        handleMenuClose();
    }

    const handleSortDate = () => {
        
        handleMenuClose();
    }

    const handleSortListens = () => {
        
        handleMenuClose();
    }

    const handleSortLikes = () => {
        
        handleMenuClose();
    }

    const handleSortDislikes = () => {
        
        handleMenuClose();
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleSortAlphabetical}>Name (A - Z)</MenuItem>
            <MenuItem onClick={handleSortDate}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleSortListens}>Listens</MenuItem>
            <MenuItem onClick={handleSortLikes}>Likes</MenuItem>
            <MenuItem onClick={handleSortDislikes}>Dislikes</MenuItem>
        </Menu>        

    let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
        if (store.currentList) {
            editToolbar = <EditToolbar />;
        }
    }
    

    return (
        <Box 
            sx={{ 
                flexGrow: 1 }}
            onKeyDown={store.undoRedoHandling}
            tabIndex="1">
            <AppBar position="static">
                <Toolbar>
                    <IconButton aria-label="home">
                        <HomeIcon />
                    </IconButton>
                    <IconButton aria-label="user">
                        <PersonIcon />
                    </IconButton>
                    <IconButton aria-label="users">
                        <GroupsIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <TextField 
                        sx={{
                            width: 400
                        }}
                        id="outlined-basic" 
                        label="Search" 
                        variant="outlined" 
                        inputProps={{min: 0, style: { textAlign: 'center'}}}
                    />
                    <Box sx={{ flexGrow: 0.5 }}></Box>
                    Sort By
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="sort"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleSortClick}
                            color="inherit"
                        >
                            <SortIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}