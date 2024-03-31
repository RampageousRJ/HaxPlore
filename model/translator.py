from googletrans import Translator
translator = Translator()

text = "Can you please cancel my ticket?"
print(translator.translate(text, dest='en').text)