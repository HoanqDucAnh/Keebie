# Keebie
* [Build project on local devices](#build-project-on-local-devices)
* [Build project on platform](#build-project-on-platform)


## Build project on local devices

### I. Install dependencies:
* Make sure that **Node.js** has been installed by running `npm -v`. If not successfully, please checkout https://nodejs.org/en/download to install **Node.js**.
* Run `npm install -g yarn` to install `yarn`.
* Run in terminal:
```bash
$ cd frontend
$ yarn
$ cd ../backend
$ pip install -r requirements.txt
```

### II. Set up backend:
* Create a file named `.env` includes:
```
MYSQL_USER=root
MYSQL_PASSWORD=4444
MYSQL_SERVICE_HOST=localhost
MYSQL_SERVICE_PORT=3306
MYSQL_DATABASE=keebie
```

### III. Run project:
#### 1. Option 1:
* Build frontend:
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

#### 2. Option 2:
* Run backend:
```bash
$ cd backend
$ python main.py
```
* Run frontend:
```bash
$ cd frontend
$ yarn start
```
* When finished, open http://localhost:3000/ to view the website.

## Build project on platform
### I. Build frontend
* Make sure there is no `.env*.local` file in the `frontend/` directory.
* Build frontend:
```bash
$ cd frontend
$ yarn build
```
* Upload `build/` to the `frontend/` directory on platform.

### II. Run server
* On the platform, run backend:
```bash
$ cd backend
$ python main.py
```
* Expose port 8000 on the platform:
```bash
/etc/jupyter/bin/expose 8000
```
* Go to http://fall2324w20g1.int3306.freeddns.org/ to view the website.


