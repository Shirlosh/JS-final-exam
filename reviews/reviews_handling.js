const StatusCodes = require('http-status-codes').StatusCodes;
const global_scope = require('../global_consts')


function get_review_list(req, res) 
{
    const reviews = global_scope.reviews_list.get_list()
    res.status(StatusCodes.OK)
    res.send(JSON.stringify(reviews))
}

function create_review(req, res) 
{
    const email = req.body.email
    const user_name =  req.body.user_name
    const movie_id = parseInt(req.body.movie_id)
    const star_rank = parseInt(req.body.star_rank)
    const review_text =  req.body.review_text
    
    
    if (isNaN(movie_id) || email === '' || isNaN(star_rank))
    {
        res.status(StatusCodes.BAD_REQUEST)
		res.send("one of the required field is missing")
		return	 
    }

    if( star_rank > 5 || star_rank < 1)
    {
        res.status(StatusCodes.BAD_REQUEST)
		res.send("star rank must be in range of 1-5")
		return
    }

    if (global_scope.movies_list.is_exist(movie_id) === false)
    {
        res.status(StatusCodes.BAD_REQUEST)
		res.send("movie id doesnt exist")
		return	
    }

    creator_id = global_scope.users_list.get_creator_id(email, user_name)
    new_review = global_scope.reviews_list.add_review(review_text, star_rank, movie_id, creator_id)
    
    res.status(StatusCodes.OK)
	res.send(JSON.stringify(new_review))
}

module.exports = {get_review_list, create_review}