import express from 'express'
import {db} from '../config/mongo.js'
import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

const router = express.Router();

const dbCollection = process.env.MONGODB_COLLECTION
const episodes = db.collection(dbCollection)

router.use(express.json());

router.get('/', (req, res) => {
    res.status(200)
    res.send("unknown")
    console.log("Fais pas ça gros (/)")
})

router.get('/all', async (req, res) => {
    res.send('Tout');
    console.log("Fais pas ça (all)");
});


router.get('/:number', async(req, res) => {
    const episode = await findEpisode(req.params.number);
    if(episode) {
        res
        .status(200)
        .json(episode);
        console.log("Ep ok : " + episode.fileName);
    } else {
        res
        .status(500)
        .send({"msg" : "error"});
        console.log(`Impossible de trouver l'épisode ${req.params.number}`);
    }
});

router.post('/:number', async(req, res) => {
    const episode = await findEpisode(req.params.number);
    if(!episode) {
        insertEpisode(req.params.number);
        res
        .status(200)
        .send({"msg" : "ok"});
    } else {
        res
        .status(500)
        .send({"msg" : "error"});
        console.log(`Impossible d'ajouter l'épisode ${req.params.number}`);
    }
})

async function findEpisode(number) {
    const episodeNumber = parseInt(number);
    const episode = await episodes.findOne({episodeNumber});
    if(episode) {
        return episode;
    } else {
        console.log("On a pas cet ep khouilla");
        return null;
    }
}

async function insertEpisode(number) {
    if(number) {
        const title = "episode " + number;
        const episodeNumber = parseInt(number)
        const episodeURL = "https://ianime-fr.com/voir-one-piece-episode-" + episodeNumber + "-vostfr/";
        const fileName = "One Piece " + number;
        await db.collection('episodes').insertOne({
        title,
        episodeNumber,    
        episodeURL,
        fileName
        });
        console.log(`Episode ${episodeNumber} ajouté`);
    } else {
        console.log(`Episode ${episodeNumber} impossible à ajouter`);
    }
}

export default router;