import express from 'express'
import routerEpisode from './routes/Episode.js'
import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import


const PORT = process.env.NODE_PORT;
const app = express();

app.get('/', (req, res) => {
    res.send('Serveur OPDL');
    
});

app.use('/episode', routerEpisode);

app.listen(PORT, () => {
    console.log(`On écoute bien sur le port : ${PORT}.`);
});