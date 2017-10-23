import sys
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

from flask import Flask
from flask import request

# from TTS import response_speech, speech2text

app = Flask(__name__)

class VegetableBOT:
    # create ChatBot
    chatbot = ChatBot(
        "chpplen",
        database = "database/db.sqlite3"  
        # database = "./database/VegetableBOT_DB"    
    )

    def __init__(self):
        self.chatbot.set_trainer(ChatterBotCorpusTrainer)
        # self.chatbot.train("chatterbot.corpus.chinese")

        self.chatbot.train('conversation/conversations.yml')
        self.chatbot.train('conversation/greetings.yml')
        self.chatbot.train('conversation/trivia.yml')
        self.chatbot.train('conversation/vegetables.yml')

    def getResponse(self, message=""):
        return self.chatbot.get_response(message)

bot = VegetableBOT()

@app.route("/")
def api_root():
    return 'welcome to auto robot!'

@app.route("/getResponse/<question>")
def api_response(question):
    response = str(bot.getResponse(question))
    # response_speech(response)
    return 'bot: '+ response

# @app.route("/audio_getResponse/")
# def api_audio_response():
#     question = speech2text()
#     response = str(bot.getResponse(question))
#     response_speech(response)
#     return 'bot: '+ response

if __name__ == "__main__":
    app.run()