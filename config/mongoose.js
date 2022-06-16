import mongoose from 'mongoose';

const { Schema, model } = mongoose;

//const url = 'mongodb://localhost:27017';
const url = 'mongodb://ssh.opdl.tech:27017'

try {
    await mongoose.connect(url);
    console.log('DB OK url : ' + dbURLpi);
    } catch (err) {
        console.log('DB KC : ' + err);
}

const episodeScheme = new Schema ({
    title : String,
    episodeNumber : Number,
    episodeURL : String,
    fileName : String,
});

const Episode = mongoose.model('Episode', episodeScheme);

export default Episode;