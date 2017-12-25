'use strict'

//lib
var m_express = require('express');
var m_app = m_express();
var m_cors = require('cors')
var m_bodyParser = require('body-parser');
var m_routePage = require('./route/routepage');
var m_robotapi = require('./route/robotapi');
//var m_googleapi = require('./route/googleapi');
//var m_awsapi = require('./route/awsapi');
//end lib

//for setting
m_app.use( m_cors() );
m_app.use( '/static', m_express.static('public') );
m_app.use( m_express.static('public') );
m_app.use( m_bodyParser.json() );
m_app.use( m_bodyParser.urlencoded({ extended: false }) );
m_app.use( "/robotapi", m_robotapi );
//m_app.use("/googleapi", m_googleapi);
//m_app.use("/awsapi", m_awsapi);

const m_nPort = 8000;

//templates
m_app.get( '/templates/top', m_routePage.templateTop );
m_app.get( '/templates/footer', m_routePage.templateFooter );

//pages
m_app.get( '/', m_routePage.index );
m_app.get( '/index', m_routePage.index );
m_app.get( '/vegebot', m_routePage.vegebot );

m_app.listen(m_nPort, function(){
	console.log('Example app listening on port ' + m_nPort + '!');
});