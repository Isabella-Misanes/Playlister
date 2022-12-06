import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import HomeBanner from './HomeBanner';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import YouTubePlayer from './YouTubePlayer';

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
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
            </Grid>
        )
    else
        return <SplashScreen />
}