const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    posterId: { type: String, required: true },
    message: { type: String, trim: true },
    picture: { type: String },
    //video: { type: String },
    likers: { type: {String}, required: true },
    comments: { type: [{
            commenterId: String,
            commenterPseudo: String,
            text: String,
            timestamps: Number,
        }],
        required: true
        },
    },
    {
        timestamps: true,
    }
)

exports = mongoose.model('post', postSchema)