const {create_json_file} = require('./data/json_file_handling')
const UsersList = require('./users/users_list')
const ReviewsList = require('./reviews/reviews_list')
const MoviesList = require('./movies/movies_list')

const json_users = 'data/users.json'
const json_movies = 'data/movies.json'
const json_reviews = 'data/reviews.json' 

dict = create_json_file(json_users)
const users_list = new UsersList(dict)

dict = create_json_file(json_movies)
const movies_list = new MoviesList(dict)

dict = create_json_file(json_reviews)
const reviews_list = new ReviewsList(dict)

module.exports = {users_list, reviews_list, movies_list}// ,json_users}