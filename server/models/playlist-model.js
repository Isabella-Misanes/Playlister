const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true },
        comments: { type: [{
            user: String,
            comment: String
        }], required: false },
        listens: { type: Number, required: false },
        likes: { type: Number, required: false },
        dislikes: { type: Number, required: false }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
