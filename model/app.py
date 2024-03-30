from flask import Flask, request, jsonify
from resources import *

app = Flask(__name__)

@app.route('/', methods=['POST'])
def chat():
    payload = request.get_json(force=True)
    print(payload)
    if payload['queryResult']['intent']['displayName']=='Book':    
        return book_handler(payload)
    elif payload['queryResult']['intent']['displayName']=='History':    
        return history_handler(payload)
    elif payload['queryResult']['intent']['displayName']=='Location':
        return location_handler(payload)
    else:
        return fallback_handler(payload)

if __name__=='__main__':
    app.run(debug=1)