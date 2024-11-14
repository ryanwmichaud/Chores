# Chores
Competetive household chore management system 

### To run the backend development server locally:
- Ensure Python is installed
- `pip install -r requirements.txt` to install python dependencies from the requirements.txt file.
- `cd ./backend` to navigate to the backend folder.
- From the backend folder, create a file called `.env`
    - Add the lines from the template file `/backend/dotenv` filling in your database credentials and jwt key
- `python run.py` to run the start script or  `python run.py --debug` to automatically restart the server on changes to the code.
    - For more control, run the server manually as follows:
        - `flask --app server run --host=0.0.0.0` to  run the server on localhost::5000. 
            - Use the `--port` flag followed by a number to specify a different port. 
            - Use the `--debug` flag to run in development mode


### To run the frontend development server locally:
- `cd ./frontend` to navigate to the frontend folder.
- In the frontend folder, create a file called `.env`
    - Add the lines to this file from the template file `/frontend/dotenv` filling in the ip address and port of your backend server
- `npm run dev` to start the development server locally.

### To set up a database 
- Ensure that postgreSQL is installed and an account is created
- From the root project directory, log in to the psql terminal with `psql -U your_username`
- Create a new database from the psql terminal with `CREATE DATABASE database_name;`
    - You can name the database anything you'd like as long as it is consistent with the .env file in the backend folder. The above command names the new databse "database_name"
- Connect to the new database with `\c database_name`
- Copy the database schema with `\i ./schema.sql`


Create a postgreSQL databse with `psql -U your_username -h your_db_host -c "CREATE DATABASE your_db_name;`
    - Replace your_db_name with the preferred name of your database. Make sure it's consistent in the .env file in the backend folder. Similarly replace your username and host with your own credentials. You will be prompted for your password. 



### To run end to end browser tests
- Start the front end and backend servers as detailed above
- From the root directory, run `pip install -r requirements.txt` to install python dependencies from the requirements.txt file.
- `cd ./tests` to navigate to the tests folder
- From the tests folder, run the command `python test_app.py` 