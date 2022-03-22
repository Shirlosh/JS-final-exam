class MoviesList extends React.Component 
{
	constructor(props) 
	{
		super(props);
	}

	render() {
        if(this.props.movie === null)
            return (<div> </div>);

		return (                  <div> 
                        <Movie movie={this.props.movie}/> <br/>
                        <Reviews movie_id={this.props.movie.id}/>
                        </div> );
	}
}

class Movie extends React.Component
{
    constructor(props){
        super(props);
    }

    render() {
        const movie = this.props.movie
		return (	<div>
                    <span><img src={movie.image_url}/></span><br/>
                    {' '}<span><strong>Movie name: </strong> {movie.name}</span> <br/>
                         <span><strong>Creator id: </strong> {movie.creator_id}</span> <br/>
                    <span style={{fontSize: '1rem'}}></span>
				</div>);
         }
}