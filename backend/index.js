const connectToMongo = require("./db");
const express = require('express');
const cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

app.use(cors())
app.use(express.json()); // it is used to pass json to the body

// applying avaliable routes
app.use("/api/user", require("./routes/user"));
app.use("/api/notes", require("./routes/note"));

app.get('/', (req, res) => {
  res.send('Hello Suraj!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})