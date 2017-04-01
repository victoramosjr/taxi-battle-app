const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../frontend/public')));

app.get('/*', (req,res) => {
	res.sendFile(path.join(__dirname, '../frontend/index.html'))
})

/*
	process.env.PORT means = whatever is in the environment variable PORT, or 3000 if there's nothing there.
*/
app.listen(process.env.PORT || 3000, () => {
	console.log("Server is running on Port 3000")
})

module.exports = app;