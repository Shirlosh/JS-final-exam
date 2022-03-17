
class App extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.state = {
			movie: null
		}
		this.update_movies = this.update_movies.bind(this)
	}

	update_movies(movie) {
        this.setState({ movie: movie });
    }

	render() {
		return (
		
		<div><header><Logo /></header>
		<div className="row">
		<main>
		<Search update_movies={this.update_movies} />
		<MoviesList movie={this.state.movie} />
		
		</main>
		<aside>
			<PostMovie />
         </aside>

			</div>
		</div>)

	}
}

