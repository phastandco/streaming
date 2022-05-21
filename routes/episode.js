import express from 'express'

import {db} from '../config/mongo.js'

const router = express.Router();

const dbCollection = 'episodes'
const episodes = db.collection(dbCollection)

router.get('/', (req, res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json');
    res.send("unknown")
    console.log("Fais pas ca gros")
})

router.get('/all', async (req, res) => {
    res.send('all')
    console.log("all")
});


router.get('/:number', async (req, res) => {
    const episode = await findEpisode(req.params.number);
    
    try {
        res.status(200).setHeader('Content-Type', 'application/json;charset=utf-8');
        res.send(JSON.stringify(episode))
        console.log("Ep ok : " + episode.fileName)
    } catch (e) {
        res.status(500).send({"msg" : "error"});
        console.log("Ep inéxistant : " + e)
    }
    
});

async function findEpisode(number) {
    const episodeNumber = parseInt(number);
    const episode = await episodes.findOne({episodeNumber});
    if
     (episode) {
        return (episode);
    } else {
        console.log("On a pas cet ep khouilla");
        //insérer un ep qu'on a pas
        //insertEpisode(episodeNumber)
        return null;
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