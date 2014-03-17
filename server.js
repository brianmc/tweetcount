var express = require('express');
var twit = require('twit') 


var app = express();
 
app.get('/tweets', function(req, res) {
    console.log('Counting tweets about : '+req.query.topic);
    console.log('In the last : '+req.query.period);
    var d = new Date();
    if (req.query.period == 'week')
    {
        d.setDate(d.getDate() - 7);
    }

    var todayString = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();

    var t = new twit({
      consumer_key: process.env.CON_KEY,
        consumer_secret: process.env.CON_SECRET,
        access_token: process.env.ACC_KEY,
  access_token_secret: process.env.ACC_SECRET
})
    console.log('since : '+todayString);

    t.get('search/tweets', { q: req.query.topic+' since:'+todayString, count: 100 }, function(err, reply) {

    var tweetCount = 0;
    if(reply)
    {
    	 console.log('Count : '+reply.statuses.length);
	     tweetCount = reply.statuses.length;

    	 if(req.query.period == 'hour')
   	    { 
       		tweetCount = 0;
       		for (var i = 0; i < reply.statuses.length; i++) {

                var status = reply.statuses[i];
                console.log('Tweet Time : '+status.created_at);
      		    	var twDate = new Date(Date.parse(status.created_at)).toLocaleString().substr(0, 16);
                console.log('Tweet Local Time : '+twDate);
      		    	// get the two digit hour //
      		    	var twHour = twDate.substr(-5, 2);
                console.log('Tweet Local Hour : '+twHour);

                console.log('Current Local Hour : '+d.getHours());

          			if(twHour==d.getHours() || twHour==d.getHours()-1 )
          			{
          				tweetCount++;
          			}
                else
                {
                  break;
                }
      		}
   	    }
       
      }
      else
      {
          console.log('Nothing returned from Twitter :'+err);
      }

      res.header("Access-Control-Allow-Origin", "*");

      if(req.query.full=='true')
      {
        res.send(reply);
      }
      else
      {
        res.send({ count: tweetCount });
      }
})
  });


var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

