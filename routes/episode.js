import express from 'express'

import {db} from '../config/mongo.js'

const router = express.Router();

const dbCollection = 'episodes'
const episodes = db.collection(dbCollection)

router.get('/', () => {
    console.log("Fais pas ca gros")
})

<<<<<<< HEAD
router.get('/:number', async (req, res, error) => {
    //res.send(`Number : ${req.params.number}`);
    const episode = await findEpisode(req.params.number)
    console.log("res : " + episode)
    res.status(200)
    res.send(episode)
    
=======
router.get('/:number', async (req, res) => {
    const episode = await findEpisode(req.params.number)
    console.log("Episode : " + JSON.stringify(episode) )
    res.send(JSON.stringify(episode));
>>>>>>> 44253726fecf0e168abd0327c1e0b2b18f18ff48
});

async function findEpisode(number) {
    const episodeNumber = parseInt(number);
    
    const episode = await episodes.findOne({episodeNumber});
<<<<<<< HEAD
    try {
        console.log("Episode : " + episode.fileName)
        return JSON.stringify(episode)
    } catch (e) {
        console.log("souci : " + e)
=======
    if (episode) {
        console.log('Ce que tu veux : ', episode);
        return episode;
    } else {
        console.log("On a pas cet ep khouilla")
        //insérer un ep qu'on a pas
        //insertEpisode(episodeNumber)
>>>>>>> 44253726fecf0e168abd0327c1e0b2b18f18ff48
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