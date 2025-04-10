import express from 'express';

const articlesInfo = [
    {name: "NodeJS", upvotes: 0},
    {name: "ReactJS", upvotes: 0},
    {name: "JavaScript", upvotes: 0},
    {name: "CSS", upvotes: 0},
]

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post("/article/:name/upvote", (req, res) => {
    const { name } = req.params;

    const articleFound = articlesInfo.find((article) => article.name === name);

    if (!articleFound) {
        return res.status(404).send('Article not found');
    }

    articleFound.upvotes += 1;
    res.send(`Thank you for the upvote on ${articleFound.name} now has ${articleFound.upvotes}!`);
});

app.get('/hello/:name', (req, res) => {

    if (!req.params) {
        return res.status(400).send('Bad Request: No params provided');
    }
    
    const { name } = req.params;
    res.send(`Hello ${name} from Get params request!`);
});

app.post('/', (req, res) => {

    if (!req.body) {
        return res.status(400).send('Bad Request: No body provided');
    }
    
    console.log(req.body)
    const { name } = req.body;
    res.send(`Hello ${name} from POST request!`);
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});