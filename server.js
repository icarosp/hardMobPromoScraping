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

	    //console.log(body);

        var $ = cheerio.load(body,{ decodeEntities: false });

        $("a").each(function(i,elem){
            if(/thread_title.*/.test($(this).attr('id'))){

            	//console.log("entrou onde deveria");

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


/*cloudscraper.get('http://www.hardmob.com.br/promocoes/', function(error, response, body) {
  if (error) {
    console.log('Error occurred');
  } else {

  	fs.writeFile('teste.html', body, function(err) {
			console.log('Written html to ');
		});

  	//console.log(body);

  	

  	var $ = cheerio.load(body);

  	var threads = [];

            $(".threadtitle_unread").each(function(i,elem){
            	console.log("teste");
            	//threads.push({})
            	//var thread = {'title':null,'link':null}
            	//thread.title = $(this).text().trim();
            	//thread.link = $(this).attr('href');
            	//threads[i] = thread;
            });

    
  }
});*/

/*
   url = '';

            var result = [];
            var $ = cheerio.load(fs.readFileSync('teste.html'));

            $("a").each(function(i,elem){
            	if(/thread_title..test($(this).attr('id'))){

            		result.push({thread: $(this).text().trim(),
            					 link: $(this).attr('href')});
            	}
            });

            //console.log(result);


            //console.log(count);

            //console.log($("*").text());
            //var print = ;
           //console.log($(".threadtitle_unread").text());

            

            //console.log(parsedHTML);

            // Finally, we'll define the variables we're going to capture

            //parsedHTML('.threadtitle_unread').map(function(index,node){
            	//console.log($(index).attr('id').html());
            //})

        //}
        //else{
        	//console.log("deu ruim:"+ error);
        //}
    //})



//})*/

app.listen('8081')

//console.log('Magic happens on port 8081');

exports = module.exports = app;