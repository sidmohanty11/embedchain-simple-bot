import os
from flask import Flask, request, jsonify
from embedchain import App
from utils import allowed_file, get_file_type
from werkzeug.utils import secure_filename
from flask_cors import CORS

UPLOAD_FOLDER = './uploads'

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

bot = App()

@app.route('/')
def index():
    return 'Hello World'

@app.route('/api/v1/source', methods=['POST'])
def post_source():
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        dest = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(dest)
        file_type = get_file_type(filename)
        if file_type == 'pdf':
            bot.add(dest, data_type='pdf_file')
        elif file_type == 'txt':
            with open(dest, 'r') as f:
                data = f.read()
                bot.add(data, data_type='text')
        return jsonify({'message': '{filename} uploaded successfully', 'success': 'true'})
    else:
        return jsonify({'message': 'File not uploaded', 'success': 'false'})

@app.route('/api/v1/chat', methods=['POST'])
def post_chat():
    data = request.get_json()
    if data['message'] == '':
        return jsonify({'message': 'No message', 'success': 'false'})
    else:
        response = bot.query(data['message'])
        return jsonify({'message': response, 'success': 'true'})
