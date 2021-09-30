# HiddenCabin

By: Jonathan Chan -Live site: *[HiddenCabin](https://hiddencabin.herokuapp.com/)*

## Installation

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/cheeyongjc/hiddencabin.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

6. Start your backend in the root ```/``` directory
   ```bash
   flask run
   ```
7. Start your frontend in your ```/react-app``` directory
   ```bash
   npm start
   ```

*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***
# Technologies used
- Python
- Javascript
- React
- Redux
- Flask
- SQL Alchemy
- PosgreSQL
- GoogleMaps JavaScript API
- Heroku
- Git
- Docker
