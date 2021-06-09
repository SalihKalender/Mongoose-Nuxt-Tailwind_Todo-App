const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://localhost/node-app',{ useNewUrlParser: true , useUnifiedTopology: true});

const Schema = mongoose.Schema;

const Todo_Schema = Schema({       
    description: {
        required: true,
        type: String
    },
    date: {
        type: Date,
        required: true,
        default: new Date(),
    }
});

const Todo_db = mongoose.model('Todo',Todo_Schema);   


app.get('/todo-list', async (req,res,next) => {
    const Todos = await Todo_db.find();
    return res.json({
        data: Todos
    })
});

app.post('/add-todo-item', async (req,res,next) => {
    const todo_Item = new Todo_db({
        description: req.body.description, 
    });
    await todo_Item.save();
    return res.status(200).json({
        result: 'Gonderildi',
       data: todo_Item
    })
})


app.post('/delete-todo-item', async (req,res,next) => {
    await Todo_db.findByIdAndDelete(req.body.id)
    return res.status(200).json({ result: 'Silme Islemi Basariyla Gerceklestirildi' });
})

app.post('/edit-todo-item',async (req,res,next) => {
    await Todo_db.updateOne({_id: req.body.id},{ $set: { description: req.body.description }});
    return res.json({result: 'Updated' , data: {
        description: req.body.description,
        date: req.body.date
    }})
})

module.exports =  {     
    handler: app,
    path: '/api'
}
