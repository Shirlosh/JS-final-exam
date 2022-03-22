class PostMovie extends React.Component {
    constructor(props) {
        super(props);
        this.add = this.add_movie.bind(this);
    }

    async add_movie(event) {
        event.preventDefault();
        const email = event.target[0].value;
        const movie_name = event.target[1].value;
        const img = event.target[2].value;

        const response = await fetch('/api/movie', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ email: email, name: movie_name, image_url: img })
        });
        if (response.status == 200) {
            const data = await response.json();
            alert("secret " + data.secrets);
        } else {
            const err = await response.text();
            alert(err);
        }
    }

    render() {
        return React.createElement(
            'form',
            { onSubmit: e => this.add_movie(e) },
            React.createElement(
                'div',
                { 'class': 'form-group' },
                React.createElement(
                    'label',
                    { 'for': 'exampleFormControlTextarea1' },
                    'Add Movie:'
                ),
                React.createElement('br', null),
                React.createElement('input', { type: 'email', className: 'form-control1', id: 'SearchInput', placeholder: 'email' }),
                React.createElement('input', { type: 'text', className: 'form-control2', id: 'SearchInput', placeholder: 'movie name' }),
                React.createElement('input', { type: 'text', className: 'form-control2', id: 'SearchInput', placeholder: 'image url' }),
                React.createElement(MySubmitButton, { text: 'Submit' })
            )
        );
    }
}