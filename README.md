PULL REQ: https://github.com/yazanbaker94/auth-api/pull/2

DEPLOYMENT: https://auth-api-yazan-yazan.herokuapp.com/

DEPLOYED VERSION ON HEROKU: https://basic-auth-yazann.herokuapp.com/signup



![UML](umlbearer.png "Reverse")



How do I install the app or library?

Clone repo on your local machine
Open terminal, run npm i
Run your postgress server
Create a database called 'testing'
Change the postgress url to /testing
Create an .env file and add your PORT='PORTNUMBER' to run the server on, create a DATABASE_URL with your postgress localhost server, and create a SECRET with your secret word in the .env

Run ThunderBird, add a POST request localhost:PORT/signup with username and password, have it saved in the SQL DB locally. You will receive a token.

After that, go /signin using thunderbird POST, but use the AUTH section and enter the username and password, and let the request compare your user/pass with the ones saved locally. You will see your token.

Then, go to to /users using thunderbird with a GET request, and enter the token generated in the AUTH section of the Bearer Auth. This will view all the users in the DB.

At last, go to /secret using thunderbird with a GET request, using the token in the BEARER AUTH fields of the AUTH section and request it, you will see the secret page.

Also, test GET, POST, DELETE, PUT for both models, which are unathenticated = /api/v1/food and /api/v1/clothes
Also, test GET, POST, DELETE, PUT for both models, which are ATUTHENTICATED = /api/v1/food and /api/v1/clothes

How do I test the app or library? 
cd into the directory, run npm test, you will see both tests for signin/signup/users/secret pass


