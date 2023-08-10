import { MongoClient, ObjectId } from 'mongodb';

// const uri = process.env.MONGODB_URI
// const options:any = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// }

// let client
// let clientPromise

// if (!process.env.MONGODB_URI) {
//   throw new Error('Add Mongo URI to .env.local')
// }

// if (process.env.NODE_ENV === 'development') {
// Replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }

// export default clientPromise


if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DATABASE
const collectionName = process.env.MONGODB_COLLECTION
const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// let clientPromise
export async function insertData(data: any) {
    const client = new MongoClient(uri, options);
    try {
        await client.connect();
        const database = client.db(databaseName);
        const collection = database.collection(collectionName as any);

        await collection.insertOne(data);
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
    } finally {
        await client.close();
    }
}

export async function updateData(newData: any, id: any) {
    const client = new MongoClient(uri, options);
    try {
        await client.connect();
        const database = client.db(databaseName);
        const collection = database.collection(collectionName as any);

        // await collection.find({userId:'999'}).removeAllListeners()
        // await collection.deleteMany({data?.userId:'999'})
        // await database.dropDatabase({})

        await collection.updateOne(
            { _id: id },
            { $set: newData }

            // { returnOriginal: false } // Return the updated document
        );
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
    } finally {
        await client.close();
    }
}

