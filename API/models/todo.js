const mongoose= require('mongoose')
const todoschema= new mongoose.Schema({
    text:{
        type:String,
        required: true
    },
    complete:{
        type:Boolean,
        default: false
    },
    timestamp:{
        type:String,
        default: Date.now()
    },
})

const Todo= mongoose.model('todo', todoschema)

module.exports=Todo