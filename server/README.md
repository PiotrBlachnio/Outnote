## Running on docker
__Make sure you createad .env file with corresponding variables__
```
git clone https://github.com/Nv7z2/note-app.git
```

```
cd note-app
```

```
cd server
```

```
docker-compose up
```

## Running on localhost
__Make sure you createad .env file with corresponding variables__
```
git clone https://github.com/Nv7z2/note-app.git
```

```
cd note-app
```

```
cd server
```

```
npm install
```

```
npm run dev
```

## Error codes
 - 0 - Internal server error 

 - 100 - Invalid email or password
 - 101 - Invalid password
 - 102 - Token has already expired or is invalid
 - 103 - Token has not expired yet or is invalid
 
 - 200 - Provided data did not pass the validation proccess
 - 201 - You must log out before performing this action
 - 202 - You do not have required permissions to perform this action 

 - 300 - Detected action performed by an unknown identity
 - 301 - Detected login attempt from a different location
 - 302 - Location has already been added to trusted

 - 400 - User does not exist
 - 401 - Provided user does not match the decoded user

 - 500 - Email has not been confirmed yet
 - 501 - Email has already been confirmed
 - 502 - Email already exists
 - 503 - Username already exists
  
 - 600 - Note does not exist
 - 601 - Category does not exist