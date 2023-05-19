const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    author_id:{
        type:Schema.ObjectId,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Blog',BlogSchema);