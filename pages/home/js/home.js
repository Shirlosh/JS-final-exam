
class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handle_add_movie = this.handle_add_movie(this);
	}

	async handleSubmit(event) {
		event.preventDefault();
		const name = event.target[0].value;

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
			const data = await response.json();
			window.location.replace('/movie/index.html?movie=' + name);
		} else {
			alert(response.message);
		}
	}

	async handle_add_movie(event) {

		event.preventDefault();
		const email = event.target[0].value;
		const movie_name = event.target[1].value;
		const img = event.target[2].value;

		const response = await fetch('/movie', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ email: email, name: movie_name, image_url: img })
		});
		if (response.status == 200) {
			const data = await response.json();
			alert("secret" + data.secret);
		} else {
			const err = await response.text();
			alert(err);
		}
	}

	render() {
		return React.createElement(
			'div',
			null,
			React.createElement(Logo, null),
			React.createElement('br', null),
			React.createElement(
				'form',
				{ onSubmit: e => this.handleSubmit(e) },
				React.createElement('input', { type: 'text', className: 'form-control', id: 'SearchInput', placeholder: 'movie name' }),
				React.createElement(
					'button',
					{ type: 'submit', className: 'btn btn-primary' },
					'Search'
				)
			),
			React.createElement('br', null),
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
						'Add Movie:'
					),
					React.createElement('br', null),
					React.createElement('input', { type: 'email', className: 'form-control1', id: 'SearchInput', placeholder: 'email' }),
					React.createElement('input', { type: 'text', className: 'form-control2', id: 'SearchInput', placeholder: 'movie name' }),
					React.createElement('input', { type: 'text', className: 'form-control2', id: 'SearchInput', placeholder: 'image url' }),
					React.createElement(MySubmitButton, { text: 'Submit' })
				)
			)
		);
	}
}