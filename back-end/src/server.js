import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import admin from 'firebase-admin';
import fs from 'fs';
const credential = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'));

admin.initializeApp({
    credential: admin.credential.cert(credential)
});

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// ConnectTO MongoDB
let db;
const connectToDB = async () => {
    const uri = 'mongodb://localhost:27017';
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

const PORT = process.env.PORT || 8000;

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

app.get('/api/article/:name', async (req, res) => {
    try {
        if (!req.params) {
            return res.status(400).send('Bad Request: No params provided');
        }
        const { name } = req.params;

        const articlesCollection = db.collection('articles');
        const articleFound = await articlesCollection.findOne({ name });
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

app.post("/api/article/:name/upvote", async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });
   
    const upvoteIds = article.upvoteIds || [];
    const canUpvtoe = uid && !upvoteIds.includes(uid);
   
    if (canUpvtoe) {
        const updatedArticle = await db.collection('articles').findOneAndUpdate(
            { name },
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

app.post("/api/article/:name/comment", async (req, res) => {
    const { name } = req.params;
    const { text, postedBy } = req.body;

    const commentToAdd = { text, postedBy }

    const updateArticle = await db.collection('articles').findOneAndUpdate({ name }, {
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