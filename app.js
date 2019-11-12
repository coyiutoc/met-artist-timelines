const express = require('express');
const app = express();
const csv = require('csv-parser')
const fs = require('fs')

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var results = [];
var dates = [];

fs.createReadStream('data/output-smallimg.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data));

fs.createReadStream('data/dates.csv')
  .pipe(csv())
  .on('data', (data) => dates.push(data));

app.get('/', (req, res) => {
  res.render('index.html', {data: results, datesData: dates});
});

app.listen((process.env.PORT || 8080), () => {
  console.log('====RUNNING ON PORT 8080==== \n')
});