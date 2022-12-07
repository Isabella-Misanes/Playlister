import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import YouTubePlayer from './YouTubePlayer';
import YoutubeEmbed from './YouTubeEmbed';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { Box } from '@mui/system';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function YouTubeToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handlePrevious(event) {
        event.stopPropagation();

    }
    function handleStop(event) {
        event.stopPropagation();

    }
    function handlePlay(event) {
        event.stopPropagation();

    }
    function handleForward(event) {
        event.stopPropagation();

    }

    function handleFetchId() {
        if(store.currentList!=null) {
            let songList = store.currentList.songs;
            if(songList.length !=0) {
                return songList[0].youTubeId;
            }
            else return "";
        }
        else return "";
    }
    return (
        <Box m="auto">
            <div id="youtube-player">
                <YoutubeEmbed embedId={handleFetchId()} />
            </div>
            <div id="youtube-toolbar">
                <Button
                    disabled={store.isModalOpen()}
                    id='previous-song-button'
                    onClick={handlePrevious}
                    variant="contained">
                    <FastRewindIcon />
                </Button>
                <Button
                    disabled={store.isModalOpen()}
                    id='stop-song-button'
                    onClick={handleStop}
                    variant="contained">
                    <StopIcon />
                </Button>
                <Button
                    disabled={store.isModalOpen()}
                    id='play-song-button'
                    onClick={handlePlay}
                    variant="contained">
                    <PlayArrowIcon />
                </Button>
                <Button
                    disabled={store.isModalOpen()}
                    id='forward-song-button'
                    onClick={handleForward}
                    variant="contained">
                    <FastForwardIcon />
                </Button>
            </div>
        </Box>
    )
}

export default YouTubeToolbar;