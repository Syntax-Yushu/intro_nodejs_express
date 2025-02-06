const express = require('express');
const app = express();
const port = 5000;


//Serve static files from "public folder"
app.use(express.static('public'));

app.use (express.json()); //Middleware to parse JSON bodies

//Define a route for the home page
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/about', (req, res)=> {
    res.send('About Us');
});


app.use((req, res, next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});

app.post('/submit', (req, res)=>{
    const data = req.body;
    res.send(`Received: ${JSON.stringify(data)}`);
})

app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const items = ['Apple', 'Banana','Orange'];

app.get('/items', (req, res) =>{
    res.json(items);
});

app.post('/items', (req, res) =>{
    const newItem = req.body.item;
    items.push(newItem);
    res.json(items);
});

//Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});