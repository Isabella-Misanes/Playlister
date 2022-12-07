import React, { useContext, useState } from 'react'
import { Box } from '@mui/system';

function PublishedSongCard(props) {
    const { song, index } = props;

    let cardClass = "list-card unselected-list-card";
    return (
        <Box
            sx={{p: 1, marginLeft: 2}}
            style={{fontSize: '12pt'}}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
        </Box>
    );
}

export default PublishedSongCard;