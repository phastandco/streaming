import express from 'express'
import { MongoClient } from 'mongodb'

//Pour l'instant en dur dans le code
//Start mongo service
//Win : "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath='C:/Users/user/Desktop/New Learn/OPDL/data/db' --port="8000"
//Mac : mongod --dbpath /Users/hugo/Desktop/OPDL/data/db/ --port 8000

const dbURL = 'mongodb://localhost:27017'

const dbURLpi = 'mongodb://192.168.0.4:27017'

const client = new MongoClient(dbURLpi);
const dbName = 'dataOPDL';
export const db = client.db(dbName);

try {
await client.connect();
console.log('DB OK url : ' + dbURLpi)
} catch (err) {
    console.log('DB KC : ' + err)
}
