from flask import Flask, request, jsonify
from sqlalchemy import create_engine, text
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure database connection
db_engine = create_engine('mssql+pyodbc://localhost/[DATABASE NAME]?driver=ODBC+Driver+17+for+SQL+Server')
table_name = 'Users'

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/insert_data', methods=['POST'])
def insert_data():
    data = request.json
    print(f"Received data: {data}")  # Print the received data
    if data:
        sqlCommand = "INSERT INTO " + table_name + " (Name, Email) VALUES (:name, :email)"
        try:
            with db_engine.connect() as connection:
                for user in data:
                    dataToInsert = {'name': user['Name'], 'email': user['Email']}
                    connection.execute(text(sqlCommand), dataToInsert)
                connection.commit()
                return jsonify({'message': 'Data inserted successfully'})
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'No data provided'}), 400
    
@app.route('/get_data', methods=['GET'])
def get_data():
    try:
        sqlCommand = "SELECT * FROM " + table_name
        with db_engine.connect() as connection:
            result = connection.execute(text(sqlCommand))
            data = []
            for row in result:
                data.append({'UsersId': row[0], 'Name': row[1], 'Email': row[2]})
            return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/delete_data', methods=['POST'])
def delete_data():
    data = request.json
    print(f"Received data: {data}")  # Print the received data
    if data:
        sqlCommand = "DELETE FROM " + table_name + " WHERE UsersId = :id"
        try:
            with db_engine.connect() as connection:
                dataToDelete = {'id': data[0]['UsersId']}
                connection.execute(text(sqlCommand), dataToDelete)
                connection.commit()
            return jsonify({'message': 'Data deleted successfully'})
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'No data provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)