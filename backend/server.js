const express = require('express')
const {MongoClient} = require('mongodb')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const cors = require ('cors')

//connection Url
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

//db name
const dbName = 'passop'
const app = express()
const port = 3000
app.use(cors())
app.use(bodyparser.json())


 client.connect()

 //get passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const findResult = await collection.find({}).toArray()

  res.send(findResult)
})

// save password
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password)
  res.send({success: true, result: findResult})
});
// delete password by id
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password)
  res.send({success: true, result: findResult})
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
