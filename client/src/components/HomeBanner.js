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
    const [currView, setCurrView] = useState("HOME");
    const [currSearch, setSearch] = useState(null);

    function setSearchCall(search) {

    }

    const handleSortClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    async function handleChangeSearch(search) {
        await store.changeSearchType(search);
        console.log("SearchType Change successful")
    }

    async function handleHomeClick(event) {
        event.stopPropagation();
        await handleChangeSearch("HOME");
        console.log("inside handle home");
        setCurrView("HOME");
        checkView("HOME");
        
    }
    async function handleTitleClick(event) {
        event.stopPropagation();
        await handleChangeSearch("BY_TITLE");
        console.log("inside handle title");
        setCurrView("BY_TITLE");
        checkView("BY_TITLE");
        
    }
    async function handleUserClick(event) {
        event.stopPropagation();
        await handleChangeSearch("BY_USER")
        console.log("inside handle user");
        setCurrView("BY_USER");
        checkView("BY_USER");
        
    }

    function checkView(typeButton) {
        if(currView == typeButton) {
            return 'secondary';
        }
        else {
            return 'default';
        }
    }

    async function handleKeyPress(event) {
        if(event.code === 'Enter') {
            //await store.doSearch(event.target.value);
        }
    }

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
                    <IconButton 
                        aria-label="home" 
                        color={checkView("HOME")}
                        onClick={handleHomeClick}>
                        <HomeIcon/>
                    </IconButton>
                    <IconButton 
                        aria-label="by-title" 
                        color={checkView("BY_TITLE")}
                        onClick={handleTitleClick}>
                        <GroupsIcon />
                    </IconButton>
                    <IconButton 
                        aria-label="by-user" 
                        color={checkView("BY_USER")}
                        onClick={handleUserClick}>
                        <PersonIcon />
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
                        onKeyDown={handleKeyPress}
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