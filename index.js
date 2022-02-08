const express = require('express')
const package = require('./package.json');

const ReviewsHandling = require('./reviews/reviews_handling');
const MoviesHandling = require('./movies/movies_handling');

const path = require('path');

const app = express()
let  port = 5001;
const reExt = /\.([a-z]+)/i;


function content_type_from_extension( url)
{
	const m = url.match( reExt );
	if ( !m ) return 'application/json'
	const ext = m[1].toLowerCase();

	switch( ext )
	{
		case 'js': return 'text/javascript';
		case 'css': return 'text/css';
		case 'html': return 'text/html';
	}

	return 'text/plain'
}

const set_content_type = function (req, res, next) 
{
	const content_type = req.baseUrl == '/api' ? "application/json; charset=utf-8" : content_type_from_extension( req.url)
	res.setHeader("Content-Type", content_type);
	next()
}
app.use( set_content_type );
app.use(express.json());  // to support JSON-encoded bodies
app.use(express.urlencoded( // to support URL-encoded bodies
{  
  extended: true
}));


// Routing
const router = express.Router();

router.get('/movies', (req, res) => {MoviesHandling.get_movies_list(req, res)})
router.post('/movie', (req, res) => {MoviesHandling.get_movie(req, res)})
router.post('/movie', (req, res) => {MoviesHandling.create_movie(req, res)})
router.delete('/movie/(:id)', (req, res) => {MoviesHandling.delete_movie(req, res)})

router.get('/reviews', (req, res) => {ReviewsHandling.get_review_list(req, res)})
router.post('/review', (req, res) => {ReviewsHandling.create_review(req, res)})


app.use('/',router)

app.use(express.static(path.join(__dirname, 'pages'))); //added
app.use('/api',router) //added

// Init 
let msg = `${package.description} listening at port ${port}`
app.listen(port, () => { console.log( msg ) ; })