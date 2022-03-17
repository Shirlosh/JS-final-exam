class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.handle_new_review = this.new_review.bind(this);

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

    async new_review(event) {
        event.preventDefault();
        const email = event.target[0].value;
        const star_rank = event.target[1].value;
        const review_text = event.target[2].value;
        const movie_id = this.props.movie_id;
        const response = await fetch('/api/review', {
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
                'h3',
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
                { onSubmit: this.new_review },
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