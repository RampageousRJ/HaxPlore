from googletrans import Translator
translator = Translator()

text = "can you explain the cancellation scheme for the darshan?"
translated = translator.translate(text, dest='hi').text
print(translated)
print(translator.translate(translated, dest='en').text)

# from transformers import pipeline
# generator = pipeline('text-generation', model='EleutherAI/gpt-neo-2.7B')
# prompt = "The current stock market"
# res = generator(prompt, max_length=50, do_sample=True, temperature=0.9)
# print(res[0]['generated_text'])