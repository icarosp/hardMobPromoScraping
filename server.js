var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var cloudscraper = require('cloudscraper');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/promos', function (request, response) {

	var json = [];
	var teste;

	//DOWNLOAD PAGE TO BE SCRAPED
	cloudscraper.get('http://www.hardmob.com.br/promocoes/', function(error, response, body) {
	  if (error) {
	    console.log('Error occurred');
	  } else {
	    //GOT PAGE

        var $ = cheerio.load(body,{ decodeEntities: false });

        $("a").each(function(i,elem){
            if(/thread_title.*/.test($(this).attr('id'))){

            json.push({thread: $(this).text().trim(),
             		   link: $(this).attr('href')});
           	}
        });

        result(json)
	  }
	});

	function result(resp){
		response.json(resp);
	}
})

var port = Number(process.env.PORT || 8081);

app.listen(port)

exports = module.exports = app;