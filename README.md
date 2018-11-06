Instructions:
   The following instructions explain how to setup a local server to test the endpoints.
   All data is stored in memory, thus it isn't persistent.

Prerequisites:
  -  Node 6.11 or beyond (this project was coded in node 6.11.5)
  -  Postman 2


1- To start the local server, navigate into the folder and run the following command:
     node index.js  (if running 8.11 or beyond)

     Note: if running node 6.11, run it with the --harmony flag, to allow Object.entries()

     node --inspect --harmony index.js

2- After you have the server running, we can start hitting the endpoints as follows:

  2.1 To create new request, select the "POST" method and enter the following url:
        http://127.0.0.1:3000/trips/requests
       - Then, click on the Body tab, select "Raw" and from the dropdown menu select JSON(application/json)
       and copy and paste the following request right below:
       {
         "startTime":"2018-11-06T10:30:46.042",
         "mode":"passanger"
       }

       - Hit "Send"
       - Add as many requests as you wish

  2.2 To fetch the requests, create a new tab in Postman, but this time the method has to be type  "GET".
      Enter the above url and hit "Send". We shall receive an array containing all the requests we created

  2.3 To update a request, create a new type, but this time the method would be type "PUT"
      Enter the following url: http://127.0.0.1:3000/trips/requests/:requestId
      such as http://127.0.0.1:3000/trips/requests/2018_11_07_am
      and in the body as, explained in 2.1 enter: a different startTime or mode
      We shall receive the response updated;

  2.4 To delete a request, create a new tab, but this time the method would be type "DELETE"
      Enter the following url,
      http://127.0.0.1:3000/trips/requests/:requestId
      such as http://127.0.0.1:3000/trips/requests/2018_11_07_am
      We shall receive an empty object

=========
  To debug the application, we can run it with the --inspect flag

      ex: node --inspect --harmony index.js     

  it will expose a funky debugging url such as:
   - chrome-devtools://devtools/remote/serve_file/@60cd6e859b9f557d2312f5bf532f6aec5f284980/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/8d35db07-d3aa-49d1-a5f3-5e78c2a25cf6    

   or
  - ws://127.0.0.1:9229/da34c8de-aed5-4be5-b1ca-58adce564ff1

  depending on the node version, then we can enter that url into Chrome, press ctrl+P, enter index.js and set a break point wherever
  we want.

====
 If you wish to see this file on Github, please visit
        https://github.com/tuancaraballo/scoop-interview

You may also be able to hit the endpoints live against:
            https://scoop-interview.herokuapp.com/trips/requests
    (pushed it to heroku, but did not test it)
