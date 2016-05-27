var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var cloudscraper = require('cloudscraper');

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


//app.listen('8081')

exports = module.exports = app;