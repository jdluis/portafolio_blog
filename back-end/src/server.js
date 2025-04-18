import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import admin from 'firebase-admin';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const credential = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'));

const PORT = process.env.PORT || 8000;

admin.initializeApp({
    credential: admin.credential.cert(credential)
});

const app = express();
app.use(express.json());

// ConnectTO MongoDB
let db;
const connectToDB = async () => {
    const uri = process.env.MONGODB_USERNAME
        ? `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.2ro1giy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        : 'mongodb://localhost:27017';

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
    );

    await client.connect();

    db = client.db('blog_fullstack');
}


app.get('/api', (req, res) => {
    res.send('Welcome to my Blog Api!');
});

app.get('/api/articles', async (req, res) => {
    try {
        const articlesCollection = db.collection('articles');
        const allArticles = await articlesCollection.find().toArray();

        res.json(allArticles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.use(express.static(path.join(__dirname, '../dist')));

app.get(/^(?!\/api).+/, async (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/api/article/:title', async (req, res) => {
    try {
        if (!req.params) {
            return res.status(400).send('Bad Request: No params provided');
        }
        const { title } = req.params;

        const articlesCollection = db.collection('articles');
        const articleFound = await articlesCollection.findOne({ title });
        res.json(articleFound);
    } catch (error) {
        res.sendStatus(500).send('Internal Server Error');
    }

});

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;

    if (authtoken) {
        try {
            const user = await admin.auth().verifyIdToken(authtoken);
            req.user = user;

            next();
        } catch (error) {
            console.error('Error verifying token:', error);
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
});

app.post("/api/article", async (req, res) => {
    const { uid } = req.user;

    const article = await db.collection('articles').insertOne({ ...req.body, upvoteIds: [], comments: [] });

    const upvoteIds = article.upvoteIds || [];
    const canUpvtoe = uid && !upvoteIds.includes(uid);

   
});

app.post("/api/article/:title/upvote", async (req, res) => {
    const { title } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ title });

    const upvoteIds = article.upvoteIds || [];
    const canUpvtoe = uid && !upvoteIds.includes(uid);

    if (canUpvtoe) {
        const updatedArticle = await db.collection('articles').findOneAndUpdate(
            { title },
            {
                $inc: { upvotes: 1 },
                $push: { upvoteIds: uid }
            },
            { returnDocument: 'after' }
        );
        return res.json(updatedArticle);
    } else {
        return res.status(403).send('Forbidden: User already upvoted this article');
    }
});

app.post("/api/article/:title/comment", async (req, res) => {
    const { title } = req.params;
    const { text, postedBy } = req.body;

    const commentToAdd = { text, postedBy }

    const updateArticle = await db.collection('articles').findOneAndUpdate({ title }, {
        $push: { comments: commentToAdd }
    },
        {
            returnDocument: 'after'
        });

    res.json(updateArticle);
});


connectToDB();

async function start() {
    await connectToDB();
    console.log('Connected to MongoDB');
    // Start the server after connecting to the database
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

start();