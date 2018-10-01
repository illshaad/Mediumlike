const mongoose =  require('mongoose');
const Schema = mongoose.Schema

let UserSchema = new Schema({
    name : String,
    email: String,
    provider : String,
    provider_id: String,
    token:String,
    provider_pic: String,
    followers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
    ],
    following : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
    ]
})
UserSchema.methods.follow = function(user_id){
    if(this.following.indexOf(user_id) === -1){// -1 il n'est pas present dans le tableau //
        this.following.push(user_id)
    }
    return this.save()
}

UserSchema.methods.addFollower = function(fs){ // paramethre fs = follower//
    this.followers.push(fs) //ajouter un follower//
}

module.exports = mongoose.model('User', UserSchema); 