import express from 'express'

import {db} from '../config/mongo.js'

const router = express.Router();

const dbCollection = 'episodes'
const episodes = db.collection(dbCollection)

router.get('/', () => {
    console.log("Fais pas ca gros")
})

router.get('/:number', async (req, res, error) => {
    //res.send(`Number : ${req.params.number}`);
    const episode = await findEpisode(req.params.number)
    console.log("res : " + episode)
    res.status(200)
    res.send(episode)
    
});

async function findEpisode(number) {
    const episodeNumber = parseInt(number);
    const episode = await episodes.findOne({episodeNumber});
    try {
        console.log("Episode : " + episode.fileName)
        return JSON.stringify(episode)
    } catch (e) {
        console.log("souci : " + e)
    }
}

async function insertEpisode(episodeNumber) {
    const title = "episode " + episodeNumber;
    const episodeURL = "https://ianime-fr.com/voir-one-piece-episode-" + episodeNumber + "-vostfr/";
    const fileName = "One Piece " + episodeNumber;

    await db.collection('episodes').insertOne({
    title,
    episodeNumber,
    episodeURL,
    fileName
  })
  console.log(`Episode ${episodeNumber} ajouté`)
}

export default router;