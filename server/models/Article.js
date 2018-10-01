const mongoose = require('mongoose');
const Schema = mongoose.Schema

let ArticlesSchema = new Schema({
    text : String,
    title : String,
    Description : String,
    feature_img: String,
    claps : Number, //le claps et un conteur//
    author : {
        type : mongoose.Schema.Types.ObjectId,// liaison entre article et le auteur//
        ref:'User'  // ref : liaison avec le User//
    },
    comments : [
        {
            author : {
            type : mongoose.Schema.Types.ObjectId,// liaison entre article et le auteur//
            ref:'User'
            },
            text : String,
        },
    ]
})

ArticlesSchema.methods.clap = function(){//function pour l'incrémentation du clap//
    this.claps++
    return this.save()
}//creation de methodes pour ce Schema

ArticlesSchema.methods.comment = function(com){ //function pour ajouter un commentaire//
    this.comments.push(com)
    return this.save()

}

ArticlesSchema.methods.addAuthor = function(author_id){ // function pour ajouter un auteur //
    this.author = author_id // on définis l'auteur qui écrie
    return this.save()
}
 
ArticlesSchema.methods.getUserArticle =function(_id){
    Article.find({'author':_id}).then((article)=>{ //Article l'instance de ton objet article//find permet de regarder dans cette auteur qui a id .then fait la liaison avec larticle et lauteur //
        return article 
    }) //
}
module.exports = mongoose.model('Article',ArticlesSchema); 