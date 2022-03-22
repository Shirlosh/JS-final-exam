const StatusCodes = require('http-status-codes').StatusCodes;
const e = require('express');
const global_scope = require('../global_consts')

function get_movies_list(req, res) 
{
    const movies = global_scope.movies_list.get_safe_list()
    res.status(StatusCodes.OK)
    res.send(JSON.stringify(movies))
}

function get_movie(req, res)
{
    const movie_name =  req.body.movie_name
    const movie = global_scope.movies_list.find_movie(movie_name)
    if( movie === null)
    {
        res.status(StatusCodes.BAD_REQUEST)
		res.send("this movie name doesn't exist")
		return	 
    }
    res.status(StatusCodes.OK)
    res.send(JSON.stringify(movie))
}

function create_movie(req, res) 
{
    const movie_name =  req.body.name
    const email = req.body.email
    const image = req.body.image_url
    
    if (movie_name == null || email == null || image == null)
    {
        res.status(StatusCodes.BAD_REQUEST)
		res.send("one of the required field is missing")
		return	 
    }

    const secrets = create_secret()

    creator_id = global_scope.users_list.get_creator_id(email)
    new_movie = global_scope.movies_list.add_movie(movie_name, creator_id, image, secrets)
    
    res.status(StatusCodes.OK)
	res.send(JSON.stringify(new_movie))
}

function delete_movie(req, res)
{
    const id =  parseInt(req.params.id)
    const secrets = req.body.secrets

    movie = global_scope.movies_list.get_movie(id)
    
    if (movie == null)
    {
        res.status(StatusCodes.BAD_REQUEST)
		res.send("the required movie doesn't exist")
		return	
    }
    const ret = global_scope.movies_list.delete_movie(movie,secrets)

    if(ret)
    {
        global_scope.reviews_list.delete_movie_reviews(id)
        res.send( "the movie deleted successfully")
        return
    }

    else 
    {
        res.status(StatusCodes.FORBIDDEN)
		res.send("invalid delete code")
		return	
    }
}

function create_secret()
{
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
}

module.exports = {get_movies_list, get_movie, create_movie, delete_movie}