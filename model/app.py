from flask import Flask, request, jsonify,render_template
from resources import *
from googletrans import Translator
import spacy
nlp = spacy.load('en_core_web_md')

app = Flask(__name__)

list1 = {'Book': 'I wanted to book a slot for mandir priority darshan.',
         'Cancel': 'I wanted to cancel my slot for darshan.',
         'Availability': 'I wanted to check for slots available on the 13th of April.',
         'Location': 'I wanted to know where the temple is located.',
         'History': 'I wanted to know the history of the temple',
         'About': 'I wanted to know about the deities, customs and rituals'}

def similarity_list(text):
    doc = nlp(text)
    similarity_scores = []
    for intent, value in list1.items():
        similarity_scores.append((intent, doc.similarity(nlp(value))))
    similarity_scores.sort(key=lambda x: x[1], reverse=True)
    return [intent for intent, score in similarity_scores[:3]]    

def detect_intent(text):
    list2 = similarity_list(text)
    if 'Location' in list2 and text.count('location') or text.count('located') or text.count('situated') or text.count('address') or text.count('place') or text.count('where'):
        return 'Location'
    elif 'Availability' in list2 and text.count('availability') or text.count('available') or text.count('free') or text.count('open') or text.count('slot') or text.count('date'):
        return 'Availability'
    elif 'History' in list2 and text.count('history') or text.count('historical') or text.count('past') or text.count('ancient') or text.count('old') or text.count('heritage') or text.count('historical'):
        return 'History'
    elif 'Cancel' in list2 and text.count('cancel') or text.count('cancellation') or text.count('reschedule') or text.count('postpone') or text.count('revoke'):
        return 'Cancel'
    elif 'About' in list2 and text.count('about') or text.count('information') or text.count('details') or text.count('custom') or text.count('ritual') or text.count('deity') or text.count('god') or text.count('goddess'):
        return 'About'
    elif 'Book' in list2 and text.count('book') or text.count('appointment') or text.count('schedule') or text.count('reserve') or text.count('booking') or text.count('time') or text.count('appoint'):
        return 'Book'

@app.route('/', methods=['POST'])
def home():
    payload = request.get_json(force=True)
    language = Translator().detect(payload['queryResult']['queryText']).lang
    if language == 'hi':
        payload['queryResult']['queryText'] = Translator().translate(payload['queryResult']['queryText'], dest='en').text
        payload['queryResult']['intent']['displayName'] = detect_intent(payload['queryResult']['queryText'])
    text = ''
    if payload['queryResult']['intent']['displayName']=='Book':    
        text = book_handler(payload)
    elif payload['queryResult']['intent']['displayName']=='History':    
        text = history_handler(payload)
    elif payload['queryResult']['intent']['displayName']=='Location':
        text = location_handler(payload)
    elif payload['queryResult']['intent']['displayName']=='About':
        text = about_handler(payload)
    elif payload['queryResult']['intent']['displayName']=='Cancel':
        text = cancel_handler(payload)
    elif payload['queryResult']['intent']['displayName']=='Availability':
        text = available_handler(payload)
    else:
        text = fallback_handler(payload)
    print(text)
    if language == 'hi':
        text = Translator().translate(text, dest='hi').text
    return make_response(jsonify({'fulfillmentText':text}))
    
@app.route('/chat', methods=['GET','POST'])
def chat():
    return render_template('iframe_test.html')

if __name__=='__main__':
    app.run(debug=1)