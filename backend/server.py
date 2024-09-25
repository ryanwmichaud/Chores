import psycopg2.extras
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import psycopg2
#from flask_bcrypt import Bcrypt





load_dotenv() #load environment variables from .env


app = Flask(__name__)
CORS(app)  #CORS middleware
#bcrypt = Bcrypt(app)


def get_db_connection():
    conn = psycopg2.connect(
        host='localhost',
        database='chores', 
        user='postgres',     
        password='PostgreSQLP@ssw0rd'  
    )
    return conn


    

@app.route("/")
def hello_world(): 
    return "<p>Hello</p>"

@app.route("/login", methods=['POST'])
def login(): 
    data = request.json
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE username = %s AND password = %s', (username, password))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if user:
        return  jsonify({"success": True})
    else:
        return jsonify({"success": False})

    

