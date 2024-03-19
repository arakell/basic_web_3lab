import express from 'express';
import AppDAO from './dao.js';

const app = express();
const PORT = process.env.PORT || 3000;

const dao = new AppDAO('D:/Study/basic_web/3laba/server/DATABASE.db');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

  //http://localhost:3000/api/postcomment?login=Арина&comment=Коммент
app.get('/api/postcomment', (req, res) => {
    const login = req.query.login;
    const comment = req.query.comment;

    let sql = 'INSERT INTO comments (name, comment) VALUES (?, ?)';
    dao.db.run(sql, [login, comment], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log(`Comment from ${login} has been saved.`);
            res.status(200).send();
        }
    });
});

//http://localhost:3000/api/comments
app.get('/api/comments', (req, res) => {
    console.log('here`s request')
    let sql = 'SELECT * FROM comments';
    dao.db.all(sql, (error, results) => {
      if (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});