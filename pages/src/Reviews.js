class Reviews extends React.Component
{
    constructor(props){
        super(props);
        this.handle_new_review = this.new_review.bind(this)

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
        const reviews = this.state.reviews
        return <div>
                    <h3>Reviews</h3>
                    {reviews.map( (post,index) => 
                    {
                        return <Review
                                    handle_delete={this.props.handle_delete}
                                    review={post}  
                                    key={index}
                                />  
                    })}
                        <br/>
                        <PostReview />
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

		return 	<div style={{fontSize: '1.5rem'}} className='UserItem'>				
                    {' '}<span>From {review.creator_id} | Rate {review.star_rank}: <strong>{review.review_text}</strong> </span>
                    
				</div>
	}
}
