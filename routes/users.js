var express = require('express');
var router = express.Router();

var request = require('request');
var fx = require("money");


var url = 'https://api.fixer.io/latest';


/* GET users listing. */
router.get('/:id', function(req, res, next) {

  request(url, function (error, response, body) {

    console.log('error:', error); // Print the error if one occurred 
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    console.log('body:', body); 

    if (error){
      res.send('error: '+ error);
    }
    else {
      var result = JSON.parse(body);
      fx.rates = result.rates;
      var id = req.params.id;
      var shekels = Math.round(fx(id).from('ILS').to('RUB'));
      var dollars = Math.round(fx(id).from('USD').to('RUB'));
      var euros = Math.round(fx(id).to('RUB'));
      res.send(id+' shekel(s) = '+ shekels + '  ruble(s)<br>'+
               id+' dollar(s) = '+ dollars + '  ruble(s)<br>'+
               id+' euro(s) = '+ euros + '  ruble(s)<br>');
             
    }

  }).end();

});

module.exports = router;
