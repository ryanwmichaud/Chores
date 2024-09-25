# Chores


### To run the backend development server locally:
- Ensure Python is installed
- `cd ./backend` to navigate to the backend folder.
- `conda env create --name chores -f environment.yml` to create a conda environment from the yaml file. You can replace "chores" with the preferred name of your environment.
- `conda activate chores` to activate the environment. Replace "chores" with your environment name if necessary. 
- `python run.py` to run the start script or  `python run.py --debug` to automatically restart the server on changes to the code.
        - For more control, run the server manually as follows:
        - `flask --app server run --host=0.0.0.0` to  run the server on localhost::5000. 
            - Use the `--port` flag followed by a number to specify a different port. 
            - Use the `--debug` flag to run in development mode


### To run the frontend development server locally:
- `cd ./frontend` to navigate to the frontend folder.
- `npm start` to start the development server on localhost::3000.