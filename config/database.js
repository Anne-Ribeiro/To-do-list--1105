const mongoose = require('mongoose')

const conn = async()=>{
    //mongoAtlas
    const atlas = await mongoose.connect('mongodb+srv://userNovo:A.2006@fiaptecnico.ld5mw.mongodb.net/todo_list')
}

module.exports = conn