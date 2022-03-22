class PostReview extends React.Component {
    constructor(props) {
        super(props);
        this.new_review = this.new_review.bind(this);
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

        if (response.status != 200) {
            const err = await response.text();
            alert(err);
        }
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement('br', null),
            React.createElement(
                'form',
                { onSubmit: e => this.new_review(e) },
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