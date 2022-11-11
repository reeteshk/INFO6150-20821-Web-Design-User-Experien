
1. Creatd a user which takes 3 parameters full name, email and password. Enforce strong password rule and add validation for email and full name.
API Endpoint:

POST: /user/create 

2. Update the user details (full name and password only). Email is not updated at any point. Proper error msg is thrown if user is not present in the database.
API Endpoint:

PUT: /user/edit – Add validations for full name and password

3. Delete the user by taking the user's email as input
Api Endpoint:

DELETE: /user/delete

4. Get all the user's full name, email addresses and passwords stored in the database
API Endpoint:

GET: /user/getAll

Added Validation for Name, email and password.

The bcrypt npm package is one of the most used packages to work with passwords in JavaScript.
This is security 101, but it’s worth mentioning for new developers: you never store a password in plain text in the database or in any other place. You just don’t.
