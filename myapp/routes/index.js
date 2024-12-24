var express = require('express');
const axios = require('axios');
var router = express.Router();
let records = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', records });
});

router.post('/api/random-user-add', async function(req, res, next) {
  try{
    let response = await axios.get('https://randomuser.me//api');
    const data = response.data;
    const name = data.results[0].name.title +' '+ data.results[0].name.first +' '+ data.results[0].name.last

    let newRecorde = {
      id: records.length + 1,
      name : name,
      gender: data.results[0].gender,
      email: data.results[0].email,
    }

    records.push(newRecorde);
    res.redirect('/');

  } catch (err) {
    console.error(err);
    return null;
  }
});

router.post('/api/delete-recored/:id', async function(req, res, next) {
  const id = parseInt(req.params.id);
  records = records.filter(record => record.id !== id);
  res.redirect('/');
});

module.exports = router;
