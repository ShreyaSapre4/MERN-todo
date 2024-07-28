const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Todo=require('./models/todo')

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/myMERNdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB:", err);
    });

app.get('/todos', async (req, res)=>{
    const todos=await Todo.find();
    res.json(todos)
})

app.post('/newtodo', (req,res)=>{
    const todo =new Todo({
        text: req.body.text,
    })
    todo.save()
    res.json(todo)
})

app.delete('/todoDelete/:id', async(req,res)=>{
    const result= await Todo.findByIdAndDelete(req.params.id)
    res.json(result)
})

app.get('/todoComplete/:id', async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      todo.complete = !todo.complete;
      await todo.save(); 
      res.json(todo);
    } catch (err) {
      console.error("Error:", err);
    }
  });
app.listen(port, () => {
    console.log("Listening on port", port);
});

