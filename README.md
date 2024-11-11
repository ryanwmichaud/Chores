# Chores
Competetive household chore management system 

### To run the backend development server locally:
- Ensure Python is installed
- `pip install -r requirements.txt` to install python dependencies from the requirements.txt file.
- `cd ./backend` to navigate to the backend folder.
- From the backend folder, create a file called `.env`
    - Add the lines from the template file `/backend/dotenv` filling in your ip address, database credentials, and jwt key
- `python run.py` to run the start script or  `python run.py --debug` to automatically restart the server on changes to the code.
    - For more control, run the server manually as follows:
        - `flask --app server run --host=0.0.0.0` to  run the server on localhost::5000. 
            - Use the `--port` flag followed by a number to specify a different port. 
            - Use the `--debug` flag to run in development mode


### To run the frontend development server locally:
- `cd ./frontend` to navigate to the frontend folder.
- In the frontend folder, create a file called `.env`
    - Add the lines to this file from the template file `/frontend/dotenv` filling in your ip address, database credentials, and jwt key
- `npm start` to start the development server on localhost::3000.

### To run end to end browser tests
- Start the front end and backend servers as detailed above
- From the root directory, run `pip install -r requirements.txt` to install python dependencies from the requirements.txt file.
- `cd ./tests` to navigate to the tests folder
- From the tests folder, run the command `python test_app.py` 