const { update_json_file } = require("../data/json_file_handling")
const Review = require("./review")
const gi = require('../generate_id')

const json_reviews = 'data/reviews.json'

class ReviewsList {
    constructor(json)
    {
        if(json != null)
        {
            json.forEach(data => {
                this.reviews_array.push(new Review(data.creator_id, data.movie_id, data.review_text, data.star_rank))});
        }
    }

    reviews_array = [];

    add_review(review_text, star_rank, movie_id, creator_id)
    {
        const new_review = new Review(creator_id, movie_id, review_text, star_rank)
        this.reviews_array.push(new_review)
        update_json_file(this.reviews_array,json_reviews)
        return new_review
    }

    get_list()
    {
        return this.reviews_array
    }

    delete_movie_reviews(movie_id)
    {
        const len = this.reviews_array.length
        for (let i = 0, j = 0; i < len ; i++, j++)
        {
            if(this.reviews_array[j].movie_id === movie_id)
            {
                this.reviews_array.splice(j, 1)
                j --
            }
        }
        update_json_file(this.reviews_array,json_reviews)
    }
}

module.exports = ReviewsList