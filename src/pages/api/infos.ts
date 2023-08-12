import { MongoClient } from 'mongodb';


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
export default async function handler(req: any, res: any) {
    const last_update = new Date()
    if (req.method === 'POST') {
        // const { step, data } = req.body;
        const data = req.body;

        const client = new MongoClient(uri, options);
        try {
            await client.connect();

            const database = client.db(databaseName);
            const collection = database.collection(collectionName as any);

            await collection.insertMany([data])
            // res.json(myPost.ops[0]);
            const savedData = await collection.find({}).toArray()
            res.status(201).json(savedData)
            console.log(savedData)
            res.status(200).json({ message: 'data data saved successfully' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}












// if (!process.env.MONGODB_URI) {
//     throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
// }

// const uri = process.env.MONGODB_URI;
// const databaseName = process.env.MONGODB_DATABASE
// const collectionName = process.env.MONGODB_COLLECTION
// const options: any = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// };

// export default async function handler(req: any, res: any) {
//     const client = new MongoClient(uri, options);
//     // const db = client.db(databaseName);
//     await client.connect();
//     const database = client.db(databaseName);
//     const collection = database.collection(collectionName as any);
//     switch (req.method) {
//         case "POST":
//             let {bodyObject} = req.body
//             let data = await collection.insertOne(bodyObject);
//             res.json({ status: 200, data });
//             break;
//         case "GET":
//             const getData = await collection.find({}).toArray();
//             res.json({ status: 200, getData });
//             break;
//     }
// }