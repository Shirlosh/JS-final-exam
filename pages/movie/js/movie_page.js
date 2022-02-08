class MoviePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: ''
        };
    }

    async componentDidMount() {
        const search = location.search;
        const params = new URLSearchParams(search);
        const name = params.get('movie');

        const movie = await this.fetch_movie(name);
        this.setState({ movie: movie });
    }

    async fetch_movie(id) {
        let data = '';
        const response = await fetch('/movie', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ movie_name: name })
        });

        console.log(response);
        if (response.status == 200) {
            data = await response.json();
        } else {
            alert(response.message);
        }

        return data;
    }

    render() {
        return React.createElement(
            'div',
            { style: { fontFamily: 'calibri light', fontSize: '2rem' } },
            React.createElement(Logo, null),
            React.createElement('br', null),
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(Movie, { movie: this.state.movie }),
                ' ',
                React.createElement('br', null),
                React.createElement(Reviews, { movie_id: this.state.movie.creator_id })
            )
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
            { style: { fontSize: '1.5rem' }, className: 'UserItem' },
            React.createElement(
                'h1',
                null,
                'Movie'
            ),
            React.createElement(
                'span',
                null,
                React.createElement('img', { src: movie.image_url })
            ),
            React.createElement('br', null),
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

class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.handle_new_review = this.handle_new_review.bind(this);

        this.state = {
            reviews: []
        };
    }

    async componentDidMount() {
        setInterval(() => {
            this.update_reviews();
        }, 1000);
        this.update_reviews();
    }

    async fetch_reviews() {
        let data = [];
        const response = await fetch('/reviews');
        if (response.status == 200) {
            data = await response.json();
        } else {
            alert(response.message);
        }
        return data;
    }

    async update_reviews() {
        let reviews = await this.fetch_reviews();
        reviews = reviews.filter(r => r.movie_id == this.props.movie_id);
        this.setState({ reviews: reviews });
    }

    async handle_new_review(event) {
        event.preventDefault();
        const email = event.target[0].value;
        const star_rank = event.target[1].value;
        const review_text = event.target[2].value;
        const movie_id = this.props.movie_id;
        const response = await fetch('/review', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ movie_id: movie_id, star_rank: star_rank, email: email, review_text: review_text })
        });
        if (response.status == 200) {
            this.get_posts();
        } else {
            const err = await response.text();
            alert(err);
        }
    }

    render() {
        const reviews = this.state.reviews;
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'Reviews'
            ),
            reviews.map((post, index) => {
                return React.createElement(Review, {
                    handle_delete: this.props.handle_delete,
                    review: post,
                    key: index
                });
            }),
            React.createElement('br', null),
            React.createElement(
                'form',
                { onSubmit: this.handle_new_review },
                React.createElement(
                    'div',
                    { 'class': 'form-group' },
                    React.createElement(
                        'label',
                        { 'for': 'exampleFormControlTextarea1' },
                        'Add Review:'
                    ),
                    React.createElement('br', null),
                    React.createElement('input', { type: 'email', className: 'form-control1', id: 'SearchInput', placeholder: 'email' }),
                    React.createElement('input', { type: 'number', className: 'form-control2', id: 'SearchInput', placeholder: '1-5' }),
                    React.createElement('textarea', { 'class': 'form-control', id: 'exampleFormControlTextarea1', rows: '3' }),
                    React.createElement(MySubmitButton, { text: 'Submit' })
                )
            )
        );
    }
}

class Review extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const review = this.props.review;

        return React.createElement(
            'div',
            { style: { fontSize: '1.5rem' }, className: 'UserItem' },
            ' ',
            React.createElement(
                'span',
                null,
                'From ',
                review.creator_id,
                ' | Rate ',
                review.star_rank,
                ': ',
                React.createElement(
                    'strong',
                    null,
                    review.review_text
                ),
                ' '
            )
        );
    }
}