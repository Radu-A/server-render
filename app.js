const express = require('express');
const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home');
})
app.get('/film/?', async (req, res) => {
    try {
        let response = await fetch(`https://www.omdbapi.com/?t=${req.query.title}&apikey=a2ddeb51`);
        let film = await response.json();
        let filmCard = {
            title: film.Title,
            director: film.Director,
            casting: film.Actors,
            plot: film.Plot,
            awards: film.Awards,
            poster: film.Poster
        }
        console.log(filmCard)
        // res.status(200).json({
        //     'Título': film.Title,
        //     'Director': film.Director,
        //     'Actores': film.Actors,
        //     'Sinópsis': film.Plot,
        //     'Premios': film.Awards,
        //     'Póster': film.Poster
        // });
        res.render('film', {filmCard});
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
})

// Mensaje con url
app.listen(port, function () {
    console.log(`http://localhost/${port}`)
    })