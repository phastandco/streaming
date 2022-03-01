import Koa from 'koa'
import {extname, resolve} from 'path'
import {createReadStream, stat} from 'fs'
import {promisify} from 'util'

const app = new Koa()

app.use(async ({request, response}, next) => {
    console.log("On recherche le disque avec les eps : /dev/sda1 (à voir comment on le récupère / le monte etc.)")

    if (
        !request.url.startsWith('/api/onepiece') ||
        !request.query.video
    ) {
        console.log("faire la cdt pour quand tout est bon mais on ne resolve pas l'épisode")
        return next()
    }

    //on récupère vidéo et soit on le met en dur soit on le resolve pour être surs
    //ici on récupère le chemin de la vidéo en dur :
    //const video = request.query.video
    //url = localhost:3000/api/onepiece?video=D:/1PEP/One%20Piece%20725.mp4
    //avec resolve notre url devient :
    //url = localhost:3000/api/onepiece?video=One%20Piece%20725.mp4
    const video = resolve("D:/1PEP/", request.query.video)
    const range = request.header.range
    if (!range) {
        console.log("pas de range")
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

})

app.use( ({request, response}, next) => {
    console.log("next ??")
    response.body = 'Yo les voyous'
})

app.on('error', (err, ctx) => {
    console.log("err classique ")
})

app.listen(3000)