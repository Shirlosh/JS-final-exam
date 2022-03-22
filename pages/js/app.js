
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movie: null
		};
		this.update_movies = this.update_movies.bind(this);
	}

	update_movies(movie) {
		this.setState({ movie: movie });
	}

	render() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"header",
				null,
				React.createElement(Logo, null)
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"main",
					null,
					React.createElement(Search, { update_movies: this.update_movies }),
					React.createElement(MoviesList, { movie: this.state.movie })
				),
				React.createElement(
					"aside",
					null,
					React.createElement(PostMovie, null),
					React.createElement(RecentlyAdded, null)
				)
			)
		);
	}
}