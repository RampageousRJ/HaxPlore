from googletrans import Translator
translator = Translator()

text = "क्या आप संक्षेप में मंदिर के इतिहास की व्याख्या कर सकते हैं?"
print(translator.translate(text, dest='en').text)