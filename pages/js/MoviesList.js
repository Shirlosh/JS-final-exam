class MoviesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.movie === null) return React.createElement(
            'div',
            null,
            ' '
        );

        return React.createElement(
            'div',
            null,
            React.createElement(Movie, { movie: this.props.movie }),
            ' ',
            React.createElement('br', null),
            React.createElement(Reviews, { movie_id: this.props.movie.creator_id })
        );
    }
}

class Movie extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const movie = this.props.movie;
        return React.createElement(
            'div',
            null,
            ' ',
            React.createElement(
                'span',
                null,
                React.createElement(
                    'strong',
                    null,
                    'Movie name: '
                ),
                ' ',
                movie.name
            ),
            ' ',
            React.createElement('br', null),
            React.createElement(
                'span',
                null,
                React.createElement(
                    'strong',
                    null,
                    'Creator id: '
                ),
                ' ',
                movie.creator_id
            ),
            ' ',
            React.createElement('br', null),
            React.createElement('span', { style: { fontSize: '1rem' } })
        );
    }
}