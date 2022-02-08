class Review {
    constructor(creator_id, movie_id, review_text, star_rank)
    {
        this.creator_id = creator_id
        this.movie_id = movie_id
        this.review_text = review_text //1000 chars limit
        this.star_rank = star_rank //1-5
    }
}

module.exports = Review