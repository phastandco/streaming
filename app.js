import express from 'express'
import routerEpisode from './routes/episode.js'
import { MongoClient } from 'mongodb'

const PORT = 8080;

//Pour l'instant en dur dans le code
const dbURL = 'mongodb://localhost:8000'
const dbName = 'dataOPDL';
const dbCollection = 'episodes'

const client = new MongoClient(dbURL);
const db = client.db(dbName);
const collection = db.collection(dbCollection)

//Start mongo service
//"C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data\db" --port="8000"

const app = express();

async function connection() {
    //fonction fléchée ? Je crois pas
    await client.connect();

    const findResult = await collection.find({"_id":"0001"}).toArray();
    console.log('Tous mes documents : ', findResult);
}

function insertEpisode() {
        db.collection('episodes').insertOne({
        _id:"0003",
        title: "episode 3",
        episodeNumber: 3,
        episodeURL: "https://ianime-fr.com/voir-one-piece-episode-3-vostfr/",
        fileName: "One Piece 1"
      })
      .then(function(result) {
        console.log("Episode ajouté" + result)
      })
}

app.get('/', (req, res) => {
    res.send('Serveur OPDL');
    
});

app.get('/db', (req, res) => {
    console.log("DB route");
    
    connection();
    insertEpisode();

})
app.use('/episode', routerEpisode);

app.listen(PORT, () => {
    console.log(`On écoute bien sur le port : ${PORT}.`);
});