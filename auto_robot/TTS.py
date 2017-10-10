from gtts import gTTS

def response_speech(response):
	tts = gTTS(text=response, lang='zh-tw')
	tts.save("speech/response.mp3")


import pyaudio
import wave
import speech_recognition as sr

def speech2text():

	CHUNK = 1024
	FORMAT = pyaudio.paInt16
	CHANNELS = 2
	RATE = 44100
	RECORD_SECONDS = 5
	WAVE_OUTPUT_FILENAME = "speech/input.wav"

	p = pyaudio.PyAudio()

	stream = p.open(format=FORMAT,
	                channels=CHANNELS,
	                rate=RATE,
	                input=True,
	                frames_per_buffer=CHUNK)

	print("* recording")

	frames = []

	try:
		while True:
			data = stream.read(CHUNK)
			frames.append(data)
	except KeyboardInterrupt:
		pass

	# for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
	#     data = stream.read(CHUNK)
	#     frames.append(data)

	print("* done recording")

	stream.stop_stream()
	stream.close()
	p.terminate()

	wf = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
	wf.setnchannels(CHANNELS)
	wf.setsampwidth(p.get_sample_size(FORMAT))
	wf.setframerate(RATE)
	wf.writeframes(b''.join(frames))
	wf.close()


	r = sr.Recognizer()
	with sr.WavFile("speech/input.wav") as source:              # use "test.wav" as the audio source
	    audio = r.record(source)                        # extract audio data from the file

	try:
	    print("Transcription: " + r.recognize_google(audio, language='zh-tw'))   # recognize speech using Google Speech Recognition
	    return r.recognize_google(audio, language='zh-tw')
	except:                                 # speech is unintelligible
	    print("Could not understand audio")
	    return '我聽不懂你在說什麼'


# speech2text()

