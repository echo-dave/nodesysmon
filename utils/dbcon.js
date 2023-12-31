import { MongoClient } from 'mongodb'
import '../utils/dotEnvConfig.js'
const { nssmCollection, MONGO_DB, MONGO_URI } = process.env
const uri = MONGO_URI
const client = new MongoClient(uri)

const findCollection = async (collections) => {
  const { default: chalk } = await import('chalk')
  const info = (string) => console.log(chalk.yellowBright.bgBlack(string))

  info('\nMongo collection found and continuing startup \n')
  collections.map((el) => {
    el.name === nssmCollection ? console.dir(el, { depth: null }) : null
  })
  return 'done'
}

const initializeDBTimeseries = async (newCollection) => {
  try {
    const { default: chalk } = await import('chalk')
    const info = (string) => console.log(chalk.yellowBright.bgBlack(string))

    info("\nMongo collection not found, we'll make one now! \n")
    await client.db(MONGO_DB).createCollection(newCollection, {
      timeseries: {
        timeField: 'time',
        metaField: 'meta',
        //   bucketMaxSpanSeconds: 2,
        //   bucketRoundingSeconds: 2,
        granularity: 'seconds',
      },
      expireAfterSeconds: 259200,
    })
    ping()
  } catch (e) {
    console.error(e)
  }
}

const initializeDB = async (newCollection) => {
  try {
    await client.db(MONGO_DB).createCollection(newCollection)
    await client
      .db(MONGO_DB)
      .collection(newCollection)
      .createIndex(
        { time: 1 },
        { name: 'timeIndex', expireAfterSeconds: 60 * 60 * 72 }
      )
  } catch (e) {
    console.error(e)
  }
}

const ping = async () => {
  try {
    const collections = await client.db(MONGO_DB).listCollections().toArray()

    const exists = collections.some((el) => el.name === nssmCollection)
    exists === true ? findCollection(collections) : initializeDB(nssmCollection)
  } catch (e) {
    console.error(e)
  }
}

const db = (dbCollection) => client.db(MONGO_DB).collection(dbCollection)
const telemetry = db(nssmCollection)
export { telemetry, db, client, ping }
