const express = require('express');

const app = express(); 

const PORT = 3000;
app.use(express.json());


app.get('/', (req, res) => {

    res.json({ message: "hey, I am the blog API" });

});
app.get('/about', (req, res) => {
    res.json({
        application: 'Blog API',
        student: 'Mohamed Ncib',
        version: '1.0.0'
    });
});


const articles = [

    { id: 1, title: 'Welcome to the blog', author: 'Admin' },

    { id: 2, title: 'first Express server', author: 'Ncib' },

    { id: 3, title: 'Testing an API with Postman', author: 'Ncib' }

];
const users = [
    { id: 1, name: 'Ncib', email: 'Ncib@example.com' },
    { id: 2, name: 'ali', email: 'ali@example.com' },
    { id: 3, name: 'med', email: 'med@example.com' }
];
app.get('/api/users', (req, res) => {

    const { name } = req.query;

    let result = users;

    if (name) {
        result = users.filter(user => user.name === name);
    }

    res.json(result);

});

app.get('/api/users', (req, res) => {

    const { name } = req.query;

    let result = users;

    if (name) {
        result = users.filter(user => user.name === name);
    }

    res.json(result);

});

app.get('/api/users/:id', (req, res) => {

    const id = Number(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({ error: `User ${id} not found` });
    }

    res.json(user);

});
app.post('/contact', (req, res) => {

    const { email, message } = req.body;

    if (!email || !message) {
        return res.status(400).json({ error: 'Email and message are required' });
    }

    res.status(200).json({
        message: 'Thank you, your message has been received'
    });

});


app.get('/api/articles', (req, res) => {

    const { author } = req.query;

    let result = articles;

    if (author) { 
        result = articles.filter(a => a.author === author);
    }

    res.json({ total: result.length, articles: result });

});
let nextId = 4; 
app.post('/api/articles', (req, res) => {

    const { title, author } = req.body; 

    if (!title || !author) {
        return res.status(400).json({ error: "Title and author are required" });
    }

    const newArticle = { id: nextId, title: title, author: author };

    nextId = nextId + 1;

    articles.push(newArticle);

    res.status(201).json({ message: 'Article created', article: newArticle });

});
app.get('/about', (req, res) => {

    res.json({
        application: 'My Blog API',
        student: 'Mohamed Ncib',
        version: '1.0.0'
    });

});


app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});
app.get('/api/articles/:id', (req, res) => {

    const id = Number(req.params.id);

    const article = articles.find(a => a.id === id);

    if (!article) {
        return res.status(404).json({ error: `Article ${id} not found` });
    }

    res.json(article);

});