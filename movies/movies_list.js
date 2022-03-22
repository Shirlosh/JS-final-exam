const { update_json_file } = require("../data/json_file_handling")
const Movie = require("./movie")
const gi = require('../generate_id')

const json_movies = 'data/movies.json'

class MoviesList {
    constructor(json)
    {
        if(json != null)
        {
            json.forEach(data => {
                this.movies_array.push(new Movie(data.id, data.name, data.creator_id, data.image_url, data.secrets))});
        }
    }

    movies_array = [];

    add_movie(name, creator_id, image_url, secrets)
    {
        const new_movie = new Movie(gi.create_unique_id(this.movies_array), name, creator_id, image_url, secrets)
        this.movies_array.push(new_movie)
        update_json_file(this.movies_array,json_movies)
        return new_movie
    }

    delete_movie(movie, secrets)
    {
        let success = false
        if(movie.secrets === secrets)
        {
            const index = this.get_index(movie.id)
            this.movies_array.splice(index, 1)
            update_json_file(this.movies_array,json_movies)
            success = true
        }

        return success;
    }

    get_movie(id)
    {
        const index = this.get_index(id)
        return this.movies_array[index]
    }

    find_movie(name)
    {
        let index = this.movies_array.findIndex(e => e.name === name)
        let movie = null

        if (index < 0)
        {
            index = this.movies_array.findIndex(e => e.name.includes(name))
            if (index < 0)  return null 
        }        

        let e = this.movies_array[index]
        movie = {name:e.name, creator_id: e.creator_id, id:e.id, image_url: e.image_url}

        return movie
    }

    get_safe_list()
    {
        let ret =[]
        this.movies_array.forEach(e => {
        ret.push({name:e.name, creator_id: e.creator_id, image_url: e.image_url})
    });
        return ret
    }
    
    is_exist(id)
    {
        return this.get_index(id) != -1 ? true:false
    }

    get_index(id)
    {
        return this.movies_array.findIndex(e => e.id === id)
    }
}

module.exports = MoviesList