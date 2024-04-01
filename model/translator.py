from googletrans import Translator
translator = Translator()

text = "Can you explain the cancellation policy?"
translated = translator.translate(text, dest='hi').text
print(translated)
print(translator.translate(translated, dest='en').text)