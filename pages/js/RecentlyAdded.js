class RecentlyAdded extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        };
        this.get_movies = this.get_movies.bind(this);
        this.get_movies();
    }

    async get_movies() {
        const response = await fetch('/api/movies');
        if (response.status != 200) {
            const err = await response.text();
            alert(err);
        }
        let data = await response.json();
        if (data.length > 3) data = data.slice(data.length - 3, data.length);

        this.setState({ movies: data });
    }

    render() {
        return React.createElement(
            "form",
            { onSubmit: e => this.get_movies(e) },
            React.createElement(
                "div",
                { "class": "form-group" },
                React.createElement(
                    "label",
                    { "for": "exampleFormControlTextarea1" },
                    "Recently Added"
                ),
                React.createElement("br", null),
                this.state.movies.map((movie, index) => React.createElement(Movie, { movie: movie }))
            )
        );
    }
}