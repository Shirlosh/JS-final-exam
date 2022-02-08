class MoviePage extends React.Component 
{
	constructor(props) 
	{
		super(props);
        this.state = {
            movie: ''
        }
	}

	async componentDidMount() 
	{
        const search = location.search
        const params = new URLSearchParams(search)
        const name = params.get('movie')

        const movie = await this.fetch_movie(name)
        this.setState( {movie : movie} )
	}

    async fetch_movie(id)
    {
        let data = ''
		const response = await fetch('/movie',{
			headers: {
            	'Content-Type':'application/json',
            	'Accept':'application/json'
        	},
			method:'POST',
			body: JSON.stringify({movie_name:name}),
		})

        console.log(response)
        if(response.status == 200){
            data = await response.json();
        }
        else{
            alert(response.message)
        }

        return data
    }
    

	render() {
		return <div style={{fontFamily: 'calibri light', fontSize: '2rem'}}>
                    <Logo/>
                    <br/>                    
                    <div className='container'>
                        <Movie movie={this.state.movie}/> <br/>
                        <Reviews movie_id = {this.state.movie.creator_id}/>
                    </div>
			   </div>
	}
}

class Movie extends React.Component
{
    constructor(props){
        super(props);
    }

    render() {
        const movie = this.props.movie
		return 	<div style={{fontSize: '1.5rem'}} className='UserItem'>
                    <h1>Movie</h1>
                    <span><img src={movie.image_url}/></span><br/>
                    {' '}<span><strong>Movie name: </strong> {movie.name}</span> <br/>
                         <span><strong>Creator id: </strong> {movie.creator_id}</span> <br/>
                    <span style={{fontSize: '1rem'}}></span>
				</div>
         }
}



class Reviews extends React.Component
{
    constructor(props){
        super(props);
        this.handle_new_review = this.handle_new_review.bind(this)

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
		const response = await fetch('/reviews')
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

    async handle_new_review(event)
    {
        event.preventDefault()
        const email = event.target[0].value
        const star_rank = event.target[1].value
        const review_text = event.target[2].value
        const movie_id =this.props.movie_id
        const response = await fetch('/review',{
			headers: {
            	'Content-Type':'application/json',
        	},
			method:'POST',
			body: JSON.stringify({movie_id:movie_id,star_rank:star_rank,email:email,review_text :review_text}),
		});
        if ( response.status == 200 )
		{
            this.get_posts();
		}
		else 
		{
		  const err = await response.text();
		  alert( err );
		}
    }

    render() {
        const reviews = this.state.reviews
        return <div>
                    <h1>Reviews</h1>
                    {reviews.map( (post,index) => 
                    {
                        return <Review
                                    handle_delete={this.props.handle_delete}
                                    review={post}  
                                    key={index}
                                />  
                    })}
                        <br/>
                        <form onSubmit={this.handle_new_review}>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Add Review:</label><br/>   
                                <input type="email" className="form-control1" id="SearchInput" placeholder="email"/>
                                <input type="number" className="form-control2" id="SearchInput" placeholder="1-5"/>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                <MySubmitButton text={'Submit'}/>
                            </div>
                        </form>
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
