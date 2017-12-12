'use strict'

var express = require('express');
var app = express();
var googletts = require('./../module/google_ttsapi');

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');

//for verify google is logined
/*var google = require('googleapis');	
google.auth.getApplicationDefault(function(err, authClient) {
	if (err) {
		console.log(err);
	}

	console.log("login, suucess");
});*/

// Your Google Cloud Platform project ID
const projectId = 'project ID';

// Creates a client
const client = new speech.SpeechClient({
	projectId: projectId,
});

// The name of the audio file to transcribe
const fileName = './auto_robot/speech/input.flac';
const file = fs.readFileSync(fileName);
const audioBytes = file.toString('base64');

const config = {
	"encoding":"FLAC",
	"sampleRateHertz": 16000,
	"languageCode": "cmn-Hant-TW",
	"enableWordTimeOffsets": false
};
const audio = {
	content: audioBytes,
	//"uri":"gs://cloud-samples-tests/speech/brooklyn.flac"
};
const request = {
	audio: audio,
	config: config,
};


app.route('/test')
	.get(function(req,res,next){
		// Detects speech in the audio file
		client.recognize(request, function(err, response){
			if(err)
				console.error('ERROR:', err);

			//const response = data[0];
			//const transcription = response.results;
			var szResponse = response.results[0].alternatives[0].transcript;
			var szUrl = googletts(szResponse);

			res.json(szUrl);
			res.end();
		});
	});

app.route('/tts')
	.get(function(req,res,next){
		var szQuery = req.query.query;
		res.json( googletts(szQuery) );
		res.end();
	});

module.exports = app;