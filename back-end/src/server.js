import express from 'express';

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
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