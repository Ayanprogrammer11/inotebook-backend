require("dotenv").config();
const connectToMongo = require('./db'); // Connects the Mongodb atlas
const express = require('express')
const cors = require("cors");
connectToMongo(); // Connecting to Mongodb atlas
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


// Available Routes
app.use(`/api/v1/auth`, require('./routes/auth'))
app.use('/api/v1/notes', require('./routes/notes'))
app.use('/api/v1/contact', require("./routes/contact"))




app.listen(port, () => {
  console.log(`iNotebook listening at http://localhost:${port}`)
})
