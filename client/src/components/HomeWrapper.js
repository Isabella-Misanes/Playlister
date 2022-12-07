import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import HomeBanner from './HomeBanner';
import { Grid } from '@mui/material';
import YouTubePlayer from './YouTubePlayer';
import GlobalStoreContext from '../store';
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';

export default function HomeWrapper() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    
    if (auth.loggedIn)
        return (
            <Grid container>
                <HomeBanner/>
                <Grid item xs={6}>
                    <HomeScreen />
                </Grid>
                <Grid item xs={6}>
                    <YouTubePlayer />
                </Grid>
                {modalJSX}
            </Grid>
        )
    else
        return <SplashScreen />
}