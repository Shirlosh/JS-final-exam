class Reviews extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            reviews: []
        }

    }

    async componentDidMount()
    {
        setInterval(() => {
            this.update_reviews()
        }, 1000) 
        this.update_reviews()
    }


    async fetch_reviews()
    {
        let data = []
		const response = await fetch('/api/reviews')
        if(response.status == 200){
            data = await response.json();
        }
        else{
            alert(response.message)
        }
        return data
    }

    
	async update_reviews()
	{
        let reviews = await this.fetch_reviews();
        reviews = reviews.filter(r => r.movie_id == this.props.movie_id)
		this.setState( {reviews : reviews} );
	}

    render() {
        return <div>
                    <h3>Reviews</h3>
                    {this.state.reviews.map( (review, index) => <Review review={review} key={index} />)}
                    <PostReview movie_id={this.props.movie_id}/>
                </div>
         } 
}



class Review extends React.Component 
{
	constructor(props) {
		super(props);
        
	}

	render() {
        const review = this.props.review

		return 	<div>		
                    {' '}<span>From {review.creator_id} | Rate {review.star_rank}: <strong>{review.review_text}</strong> </span>
                    
				</div>
	}
}
