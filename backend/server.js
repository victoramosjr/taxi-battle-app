const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./routes').routes;
const db = require('./models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));

app.use('/api/user', indexRouter.User)

app.get('/*', (req,res) => {
	res.sendFile(path.join(__dirname, '../frontend/index.html'))
})

db.sequelize.sync()
  .then(
    app.listen(process.env.PORT || 3000, () => {
	   console.log("Server is running at http://localhost:3000")
    })
  )

module.exports = app;