require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

mongoose.connect(MONGODB_URI);
mongoose.connection.on("connected", () => {   
    console.log("Connected to MongoDB");
    });

const Fruit = require('./models/fruit');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.render('index');
    });

app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/", { fruits: allFruits });
  });

app.get('/fruits/new', (req, res) => {
    res.render('fruits/new');
    });

app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
  });
      
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits");
  });

app.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });