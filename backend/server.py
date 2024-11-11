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
CORS(app)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_KEY')
jwt = JWTManager(app)


def get_db_connection():
    conn = psycopg2.connect(
        host= os.getenv('CHORES_HOST'),
        database= os.getenv('CHORES_DATABASE'),
        user= os.getenv('CHORES_USER'), 
        password= os.getenv('CHORES_DATABASE_PASSWORD') 
    )
    return conn


    

@app.route("/")
def hello_world(): 
    return "<p>Hello</p>"


@app.route("/mark-finished", methods=['OPTIONS', 'POST'])
def mark_finished():
    if request.method == 'OPTIONS':
        return '', 204  # CORS preflight response
    

    @jwt_required()
    def mark_finished_post():
    
        current_user = get_jwt_identity()
        print(current_user) 
        
        data = request.json
        conn = get_db_connection() 
        cursor = conn.cursor()
        cursor.execute("""UPDATE assignments SET completed_at = NOW()
                       WHERE user_id = (SELECT user_id from users WHERE username = %s)
                       AND chore_id = (SELECT chore_id FROM chores WHERE description = %s)
                       AND date_assigned = %s
                       AND date_due = %s
                       AND completed_at IS NULL"""
                       , (current_user, data.get('chore'), data.get('assigned'), data.get('due')))

        conn.commit()
        cursor.close()
        conn.close()
        response =  jsonify({"success": True, "message": "Chore marked as finished"})
       
        return response
    return mark_finished_post()



@app.route("/mark-unfinished", methods=['OPTIONS', 'POST'])
def mark_unfinished():
    if request.method == 'OPTIONS':
        return '', 204  # CORS preflight response
    

    @jwt_required()
    def mark_unfinished_post():
    
        current_user = get_jwt_identity() 
        data = request.json
        
        conn = get_db_connection() 
        cursor = conn.cursor()
        cursor.execute("""UPDATE assignments SET completed_at = NULL
                       WHERE user_id = (SELECT user_id from users WHERE username = %s)
                       AND chore_id = (SELECT chore_id FROM chores WHERE description = %s)
                       AND date_assigned = %s
                       AND date_due = %s
                       AND completed_at IS NOT NULL"""
                       , (current_user, data.get('chore'), data.get('assigned'), data.get('due')))

        conn.commit()
        cursor.close()
        conn.close()
        response =  jsonify({"success": True, "message": "Chore marked as unfinished"})
        return response
    
    return mark_unfinished_post()




@app.route("/login", methods=['POST'])
def login(): 
    data = request.json
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection() 
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE username = %s AND password = %s'
                   , (username, password))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if user:
        token = create_access_token(identity=username)
        return jsonify({"success": True, "token": token})
    else:
        return jsonify({"success": False})


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
                    WHERE completed_at IS NULL
                   """)
    data = cursor.fetchall()

    
    cursor.close()
    conn.close()

    return(jsonify(data))

@app.route("/get-leaderboard", methods=['GET'])
def get_leaderboard():
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT
            users.username,
            SUM(
                CASE
                    WHEN assignments.completed_at IS NULL THEN 0
                    WHEN assignments.completed_at <= assignments.date_due THEN 10
                    ELSE 5
                END
            ) AS score
        FROM users LEFT JOIN assignments ON users.user_id = assignments.user_id
        WHERE assignments.date_due >= NOW() - INTERVAL '30 days' OR assignments.completed_at IS NULL
        GROUP BY users.user_id
        ORDER BY score DESC;
    """) 
    results = cursor.fetchall()
    print(results)
    return jsonify({'results': results})



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
                   WHERE username = %s AND completed_at IS NULL
                   """
                   , (current_user,))
    data = cursor.fetchall()

    
    cursor.close()
    conn.close()


    return(jsonify(data))





@app.route("/get-my-completed-chores", methods=['Get'])
@jwt_required()
def get_my_completed_chores():
    current_user = get_jwt_identity() 

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""SELECT description, date_assigned, date_due, completed_at
                   FROM assignments LEFT JOIN users 
                   ON assignments.user_id = users.user_id 
                   LEFT JOIN chores 
                   ON chores.chore_id = assignments.chore_id 
                   WHERE username = %s AND completed_at IS NOT NULL
                   """
                   , (current_user,))
    data = cursor.fetchall()

    
    cursor.close()
    conn.close()


    return(jsonify(data))

