import express from 'express'
import { MongoClient } from 'mongodb'

//Pour l'instant en dur dans le code
//Start mongo service
//Win : "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data\db" --port="8000"
//Mac : mongod --dbpath /Users/hugo/Desktop/OPDL/data/db/ --port 8000

const dbURL = 'mongodb://localhost:8000'
const client = new MongoClient(dbURL);
const dbName = 'dataOPDL';
export const db = client.db(dbName);

try {
await client.connect();
console.log('DB OK')
} catch (err) {
    console.log('DB KC : ' + err)
}
