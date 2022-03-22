class RecentlyAdded extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: []
        }
        this.get_movies = this.get_movies.bind(this);  
        this.get_movies()
    }

	async get_movies()
	{
        const response = await fetch('/api/movies');
        if ( response.status != 200 )
		{
		  const err = await response.text();
		  alert( err );
		}
        let data = await response.json();
        if(data.length > 3)
            data = data.slice(data.length-3,data.length)

        this.setState( {movies : data} );
	}

    render() {
        return (
            <form onSubmit={(e)=>this.get_movies(e)}>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Recently Added</label><br/>   
                {this.state.movies.map( (movie, index) => <Movie movie={movie} />)}
            </div>
        </form>
        )
    }
}