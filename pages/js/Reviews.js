class Reviews extends React.Component {
    constructor(props) {
        super(props);

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
        const response = await fetch('/api/reviews');
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

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h3',
                null,
                'Reviews'
            ),
            this.state.reviews.map((review, index) => React.createElement(Review, { review: review, key: index })),
            React.createElement(PostReview, { movie_id: this.props.movie_id })
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
            null,
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