import psycopg2.extras
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from dotenv import load_dotenv
from flask_cors import CORS
import psycopg2
import os
#from flask_bcrypt import Bcrypt





load_dotenv() #load environment variables from .env


app = Flask(__name__)
CORS(app)  #CORS middleware
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_KEY')
jwt = JWTManager(app)


def get_db_connection():
    conn = psycopg2.connect(
        host= os.getenv('HOST'),
        database= os.getenv('DATABASE'),
        user= os.getenv('USER'), 
        password= os.getenv('DATABASE_PASSWORD') 
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
        token = create_access_token(identity=username)
        return jsonify({"success": True, "token": token})
    else:
        return jsonify({"success": False}), 400


@app.route("/get-active-chores", methods=['GET'])
def get_active_chores():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""SELECT username, description, date_assigned, date_due 
                   FROM assignments 
                   LEFT JOIN users 
                   ON assignments.user_id = users.user_id 
                   LEFT JOIN chores 
                   ON chores.chore_id = assignments.chore_id
                   WHERE status = 'Pending'
                   """)
    data = cursor.fetchall()

    
    cursor.close()
    conn.close()


    return(jsonify(data))


@app.route("/get-my-active-chores", methods=['Get'])
@jwt_required()
def get_my_active_chores():
    current_user = get_jwt_identity() 

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""SELECT description, date_assigned, date_due 
                   FROM assignments LEFT JOIN users 
                   ON assignments.user_id = users.user_id 
                   LEFT JOIN chores 
                   ON chores.chore_id = assignments.chore_id 
                   WHERE username = %s AND status = 'Pending'
                   """
                   , (current_user,))
    data = cursor.fetchall()

    
    cursor.close()
    conn.close()


    return(jsonify(data))

