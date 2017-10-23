import sys
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from chatterbot.trainers import ListTrainer

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

        conversation = [
            "你好",
            "你好，有什麼可以為您服務的",
            "我要喝果汁",
        ]
        self.chatbot.set_trainer(ListTrainer)
        self.chatbot.train(conversation)

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