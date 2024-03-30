from flask import make_response,jsonify
import numpy as np
import random
from sentence_transformers import SentenceTransformer, util
model = SentenceTransformer("all-MiniLM-L6-v2")

def calculate_similarity(sentence1,sentence2):
  sentence1_embedding = model.encode(sentence1, convert_to_tensor=True)
  sentence2_embedding = model.encode(sentence2, convert_to_tensor=True)
  return util.cos_sim(sentence1_embedding, sentence2_embedding)[0][0].item()

history = [
    "The history of the Ayodhya Ram Mandir is centuries-old. The temple is built on the site believed to be the birthplace of Lord Ram, one of the most revered Hindu deities. The temple was demolished by the Mughal emperor Babur in the 16th century and a mosque was built in its place. The mosque, known as the Babri Masjid, stood on the site for centuries until it was demolished in 1992 by Hindu nationalists, triggering widespread violence and communal tensions in the country.\nThe Ayodhya dispute has been a contentious issue in Indian politics for decades. The dispute revolved around the ownership of the site where the Babri Masjid stood and whether it was the birthplace of Lord Ram. The dispute was finally settled by the Indian Supreme Court in 2019, which ruled in favor of the construction of a Ram Janmabhoomi temple on the site. The construction of the temple was undertaken by the Shri Ram Janmabhoomi Teerth Kshetra, a trust formed by the Indian government to oversee the construction of the temple.\nRead More: https://www.trimbakeshwar.org/articles/Ayodhya-Ram-Mandir-Lord-Ram-Temple-Ram-Janmabhoomi-Hindu-temple-in-Ayodhya",
    
    "The Ayodhya Ram Mandir holds deep significance for Hindus, believed to be the birthplace of Lord Rama, a central figure in the Ramayana, a revered Hindu epic. The site's history, however, is layered.\n In the 16th century, a mosque known as the Babri Masjid was constructed on the land. This mosque stood for centuries until its demolition in 1992 by Hindu nationalists, sparking religious tensions.\n For decades, the ownership of the site and its religious significance remained a contentious issue in Indian politics. The Supreme Court of India delivered a landmark verdict in 2019, paving the way for the construction of a Ram temple at the birthplace of Lord Rama.\n The Shri Ram Janmabhoomi Teerth Kshetra, a trust established by the Indian government, is overseeing the construction of this monumental temple.\nRead More: https://www.trimbakeshwar.org/articles/Ayodhya-Ram-Mandir-Lord-Ram-Temple-Ram-Janmabhoomi-Hindu-temple-in-Ayodhya",
    
    "Steeped in mythology and marked by historical shifts, the Ayodhya Ram Mandir is a site of immense importance for Hindus. Revered as the birthplace of Lord Rama, a central figure in the epic Ramayana, the land holds a special place in their hearts.\nCenturies ago, in the 16th century, a mosque known as the Babri Masjid was built on the site. It stood for a significant period until 1992, when its demolition by Hindu nationalists ignited religious tensions.\nThe ownership of the land and its religious significance became a focal point of debate in Indian politics for decades. Finally, in 2019, a landmark verdict by the Supreme Court of India paved the way for the construction of a Ram temple at the birthplace of Lord Rama.\nThe construction of this monumental temple is being overseen by the Shri Ram Janmabhoomi Teerth Kshetra, a trust established by the Indian government.\nRead More: https://www.trimbakeshwar.org/articles/Ayodhya-Ram-Mandir-Lord-Ram-Temple-Ram-Janmabhoomi-Hindu-temple-in-Ayodhya"
]

similarity = {
    "Booking":{
        "What is the procedure of booking a darshan tocket for the Ayodhya mandir?":np.nan
    },
    "History":{
        "What is the history of the Ayodhya Ram Mandir?":np.nan
    },
    "Availability":{
        "What is the availability of darshan tickets for the Ayodhya Ram Mandir?":np.nan
    },
    "Location":{
        "Can you guide me with where the mandir is located for a smooth travel expeirence?":np.nan
    },
    "Cancel":{
        "How can I cancel my darshan ticket for the Ayodhya Ram Mandir?":np.nan
    },
    "About":{
        "Can you explain more and give details about the mandir?":np.nan
    }
}

def book_handler(payload):  
    return make_response(jsonify({'fulfillmentText':'You can view the FAQ section in our website for more information!'}))

def history_handler(payload):
    result = random.choice(history)
    return make_response(jsonify({'fulfillmentText':result}))

def location_handler(payload):
    if payload['queryResult']['parameters']['location']:
        result = "The Ayodhya Ram Mandir is located in Ayodhya, Uttar Pradesh, India. The exact address is Ayodhya, Uttar Pradesh 224123, India. You can use the following coordinates to reach the temple: 26.7925° N, 82.1944° E\n You can refer the location using https://maps.app.goo.gl/J6SV1gbMqCjgXxYC6"
    else:
        result = "Some of the best ways to reach the temple can be by road, rail or air. The nearest airport is the Chaudhary Charan Singh International Airport in Lucknow, which is approximately 140 km away from Ayodhya. The nearest railway station is the Ayodhya Junction, which is well-connected to major cities in India. You can also reach Ayodhya by road via the National Highways. For more information, you can visit https://tinyurl.com/travel-methods"
    return make_response(jsonify({'fulfillmentText':result}))

def fallback_handler(payload):
    highest_intent = ""
    highest_score = -5
    for intent in similarity:
        for query in similarity[intent]:
            similarity[intent][query] = calculate_similarity(payload['queryResult']['queryText'],query)
            print(intent, ' -> ', similarity[intent][query])
            if highest_score<similarity[intent][query]:
                highest_score = similarity[intent][query]
                highest_intent = intent
    if highest_score>0.3:
        if highest_intent=='Booking':    
            return book_handler(payload)
        elif highest_intent=='History':    
            return history_handler(payload)
    return make_response(jsonify({'fulfillmentText':'I am sorry, I do not understand your query!'}))