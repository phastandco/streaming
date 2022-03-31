import Koa from 'koa'
import {extname, resolve} from 'path'
import {createReadStream, stat} from 'fs'
import {promisify} from 'util'

const app = new Koa()

app.use(async ({request, response}, next) => {
    if (!request.url.startsWith('/verify')) {
        console.log("on verify pas")
    }
    
    console.log("on est dedans")
    response.body = "je suis alive";
    return next()
})

app.use(async (ctx, next) => {
    const request = ctx.request;
    const response = ctx.response;
    if (!request.url.startsWith('/episode')) {
        console.log("pas d'épisode");
        return next()
    }
    
    console.log("Episode"  + request);
    response.body = "mon episode ";
    return next();
})

app.use(async ({request, response}, next) => {
    
    if (
        !request.url.startsWith('/api/onepiece') ||
        !request.query.video
    ) {
        console.log("On ne rentre pas dans la pièce");
        return next();
    }

    //on récupère vidéo et soit on le met en dur soit on le resolve pour être surs
    //ici on récupère le chemin de la vidéo en dur :
    //const video = request.query.video
    //url = localhost:3000/api/onepiece?video=D:/1PEP/One%20Piece%20725.mp4
    //avec resolve notre url devient :
    //url = http://localhost:3000/api/onepiece?video=One%20Piece%20725.mp4

    const video = resolve("D:/1PEP/", request.query.video)
    const range = request.header.range

    if (!range) {
        console.log("No Range")
        response.type = extname(video)
        response.body = createReadStream(video)
        return next()
    }

    console.log("url : ", request.url)
    
    const parts = range.replace('bytes=', '').split('-')
    const start = parseInt(parts[0], 10)
    const videoStat = await promisify(stat)(video)
    const end = parts[1] ? parseInt(parts[1], 10) : videoStat.size - 1
    console.log("stats : ", videoStat)
    response.set('Content-Range', `bytes ${start}-${end}/${videoStat.size}`)
    response.set('Accept-Range', `bytes`)
    response.set('Content-Length', end - start + 1)
    response.status = 206
    response.body = createReadStream(video, {start, end})
    
    //return next(); ??
})

app.on('error', (err, ctx) => {
    console.log("err classique ", err)
    //return Koi ?
})

app.listen(3000)