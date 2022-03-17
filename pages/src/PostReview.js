class PostReview extends React.Component
{
    constructor(props){
        super(props);
        this.new_review = this.new_review.bind(this)
    }

    async new_review(event)
    {
        event.preventDefault()
        const email = event.target[0].value
        const star_rank = event.target[1].value
        const review_text = event.target[2].value
        const movie_id =this.props.movie_id
        const response = await fetch('/api/review',{
			headers: {
            	'Content-Type':'application/json',
        	},
			method:'POST',
			body: JSON.stringify({movie_id:movie_id,star_rank:star_rank,email:email,review_text :review_text}),
		});
        
        if ( response.status != 200 )
		{
		  const err = await response.text();
		  alert( err );
		}
    }

    render() {
        return( <div>
                        <br/>
                        <form onSubmit={this.new_review}>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Add Review:</label><br/>   
                                <input type="email" className="form-control1" id="SearchInput" placeholder="email"/>
                                <input type="number" className="form-control2" id="SearchInput" placeholder="1-5"/>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                <MySubmitButton text={'Submit'}/>
                            </div>
                        </form>
                </div>);
         } 
}