from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS



load_dotenv() #load environment variables from .env


app = Flask(__name__)
CORS(app)  #  CORS middleware


    

@app.route("/")
def hello_world(): 
    return "<p>Hello</p>"

@app.route("/login", methods=['POST'])
def login(): 

    data = request.json
    if data:
        username = data.get('username')
        password = data.get('password')
        print('got', username, password)

    return jsonify({"success": True})

