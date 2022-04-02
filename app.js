import express from 'express'
import routerEpisode from './routes/Episode.js'


const PORT = 8080;
const app = express();

//Connection to DB + err mgmt

app.get('/', (req, res) => {
    res.send('Serveur OPDL');
    
});

app.use('/episode', routerEpisode);

app.listen(PORT, () => {
    console.log(`On écoute bien sur le port : ${PORT}.`);
});