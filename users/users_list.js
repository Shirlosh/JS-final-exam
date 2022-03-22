const { update_json_file } = require("../data/json_file_handling")
const User = require("./user")
const gi = require('../generate_id')

const json_users = 'data/users.json'

class UsersList {
    constructor(json)
    {
        if(json != null)
        {
            json.forEach(data => {
            if(data.id != 1)
                this.users_array.push(new User(data.id, data.email, data.name))});
        }
        else update_json_file(this.users_array,json_users)
    }

    users_array = [];

    add_user(email, name)
    {
        const new_user = new User(gi.create_unique_id(this.users_array), email, name)
        this.users_array.push(new_user)
        update_json_file(this.users_array,json_users)
        return new_user
    }

    get_creator_id(email, name=null)
    {
        let user_id
        const index = this.users_array.findIndex(user => user.email == email)
        
        if(index !== -1)
            user_id = this.users_array[index].id
        
        else 
            user_id = this.add_user(email, name).id

        return user_id
    }

}
module.exports = UsersList