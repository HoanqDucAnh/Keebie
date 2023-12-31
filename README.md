# Keebie

## Instruction

### I. Install dependencies:
* Make sure that Nodejs has been installed by running `npm -v`. If not successfully, please checkout https://nodejs.org/en/download to install Nodejs.
* Run `npm install -g yarn` to install `yarn`.
* Open project in Visual Studio Code and run in terminal:
```bash
$ cd frontend
$ yarn
$ cd ../backend
$ pip install -r requirements.txt
```

### II. Set up backend:
* Create a file named **.env** includes:
```
MYSQL_USER=root
MYSQL_PASSWORD=4444
MYSQL_SERVICE_HOST=localhost
MYSQL_SERVICE_PORT=3306
MYSQL_DATABASE=keebie
```

### III. Set up frontend:
* Create a file named **.env** includes
```bash
REACT_APP_BASE_URL=http://127.0.0.1:8000
```
* Create a file named **.env.production** includes
```bash
REACT_APP_BASE_URL=http://fall2324w20g1.int3306.freeddns.org 
```

### IV. Run project:
* Run frontend:
```bash
$ cd frontend
$ yarn build
```
* Run backend:
```bash
$ cd backend
$ python main.py
```
* When finished, open http://localhost:8000/ to view the website.
