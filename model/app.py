from flask import Flask, request, jsonify,render_template
from resources import *

app = Flask(__name__)

@app.route('/', methods=['POST'])
def home():
    payload = request.get_json(force=True)
    print(payload)
    if payload['queryResult']['intent']['displayName']=='Book':    
        return book_handler(payload)
    elif payload['queryResult']['intent']['displayName']=='History':    
        return history_handler(payload)
    elif payload['queryResult']['intent']['displayName']=='Location':
        return location_handler(payload)
    elif payload['queryResult']['intent']['displayName']=='About':
        return about_handler(payload)
    else:
        return fallback_handler(payload)
    
@app.route('/chat', methods=['GET','POST'])
def chat():
    return render_template('iframe_test.html')

if __name__=='__main__':
    app.run(debug=1)