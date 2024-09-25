from flask import Flask
from dotenv import load_dotenv
import os

print("evv",os.getenv("FLASK_APP"))

load_dotenv() #load environment variables from .env


app = Flask(__name__)

    

@app.route("/")
def hello_world(): 
    return "<p>Helo</p>"



