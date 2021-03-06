const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./routes').routes;
const db = require('./models');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));

app.use((req, res, next) => {
  console.log(req.header)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api/user', indexRouter.User);
app.use('/api/estimate', indexRouter.Estimate);

app.get('/*', (req,res) => {
	res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

db.sequelize.sync()
  .then(
    app.listen(process.env.PORT || 3000, () => {
	   console.log("Server is running at http://localhost:3000");
    })
  );

module.exports = app;
