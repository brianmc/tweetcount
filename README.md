tweetcount
==========

VERY simple REST API for twitter totals reporting.

I created this API because I wanted a simple count of tweets on a particular topic over a specific period of time to feed a simple javascript dashboard control.  The standard Twitter widgets did not give me that and unfortunately the Twitter API is now pretty much unusable from javascript in the browser (due to the auth requirements).

I decided to host a simple API myself that could talk server-to-server with the Twitter API.  On the backend there is a registered Twitter app, etc.  I used the popular Twit client for Node to make the API calls and then added my specific period functionality. 


##Usage

***Request:***  http://www.bmg-tech.com/tweets?topic=#github&period=day

***Response: ** *{ "count": 1 }


##Parameters

`topic`		Pretty self-explanatory, this is the topic you are interested in. **Required**

`period`	week, day or hour. **Required**

`full`		If `true` response will contain the raw twitter search API response.  **Optional**

##Notes
This is not a search API, there is no paging or parsing functionality.  This is purely to feed a dashboard that twitter activity is increasing/decreasing/etc.


##Credits
I was very fortunate to find the twit project https://github.com/ttezel/twit by Tolga Tezel.  Simple & effective.
