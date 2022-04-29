import express from 'express'

import {db} from '../config/mongo.js'

const router = express.Router();

const dbCollection = 'episodes'
const episodes = db.collection(dbCollection)

router.get('/', () => {
    console.log("Fais pas ca gros")
})

router.get('/:number', async (req, res) => {
    const episode = await findEpisode(req.params.number)
    console.log("Episode : " + JSON.stringify(episode) )
    res.send(JSON.stringify(episode));
});

async function findEpisode(number) {
    const episodeNumber = parseInt(number);
    
    const episode = await episodes.findOne({episodeNumber});
    if (episode) {
        console.log('Ce que tu veux : ', episode);
        return episode;
    } else {
        console.log("On a pas cet ep khouilla")
        //insérer un ep qu'on a pas
        //insertEpisode(episodeNumber)
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
  console.log("Episode ajouté")
}

export default router;