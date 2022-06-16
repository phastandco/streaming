import { MongoClient } from 'mongodb'
import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

//Pour l'instant en dur dans le code
//Start mongo service
//Win : "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath='C:/Users/user/Desktop/New Learn/OPDL/data/db' --port="8000"
//Mac : mongod --dbpath /Users/hugo/Desktop/OPDL/data/db/ --port 8000

const dbURL = 'mongodb://' 
            + process.env.CONNECTION_URL
            + ':'
            + process.env.MONGODB_PORT;
const dbName = process.env.MONGODB_DATABASE;

const client = new MongoClient(dbURL);
export const db = client.db(dbName);

try {
await client.connect();
console.log('DB OK url : ' + dbURL)
} catch (err) {
    console.log('DB KC : ' + err)
}
