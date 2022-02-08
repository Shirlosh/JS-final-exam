class Logo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return React.createElement(
			'div',
			{ style: { backgroundColor: '#F5F5F5', padding: '0.5rem', textAlign: 'center' } },
			React.createElement('img', { src: 'http://localhost:5001/components/js/download.png' })
		);
	}
}