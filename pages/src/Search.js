class Search extends React.Component {
    constructor(props) {
        super(props)
        this.on_submit = this.on_submit.bind(this);
        this.search_movies = this.search_movies.bind(this);
    }


    async on_submit(event) {
        event.preventDefault();
        const name = event.target[0].value
        const result = await this.search_movies(name);
        this.props.update_movies(result);
    }

    async search_movies(name) {
		const response = await fetch('/api/getmovie',{
			headers: {
            	'Content-Type':'application/json',
            	'Accept':'application/json'
        	},
			method:'POST',
			body: JSON.stringify({movie_name:name}),
		})
		
		if(response.status != 200)
			alert("Movie isnt exist")
        
        const data = await response.json()
        return data			
	}

    render() {
        return (
            <div>
            <h3>Search a movie</h3>
			<form onSubmit={e => this.on_submit(e)}>
		    <input type="text" className="form-control" id="SearchInput" placeholder="movie name"/>
	        <button type="submit" className="btn btn-primary">Search</button>
	    	</form><br/><br/>
            </div>
        )
    }
}