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
- 100 - Provided data did not pass the validation proccess
- 101 - Token has already expired or is invalid
- 102 - Provided user does not match the decoded user
- 103 - You must log out before performing this action
- 104 - Detected action performed by an unknown identity
- 105 - Token has not expired yet or is invalid
- 106 - Location has already been added to trusted
- 200 - Invalid email or password
- 201 - Detected login attempt from a different location
- 202 - Invalid password
- 203 - You do not have required permissions to perform this action
- 300 - User does not exist
- 301 - Username already exists
- 302 - Email already exists
- 303 - Email has already been confirmed
- 304 - Email has not been confirmed yet
