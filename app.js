'use strict'

//lib
var m_express = require('express')
	, m_app = m_express()
	, m_cors = require('cors')
	, m_bodyParser = require('body-parser')
	, m_routePage = require('./route/routepage')
	, m_logger = require('morgan')
	, m_methodOverride = require('method-override')
	, m_multer = require('multer')
	, m_errorHandler = require('errorhandler')
//end lib

//for setting (set)
m_app.set( 'domain name', "10.96.22.182" );
m_app.set( 'port', process.env.PORT || 8000 );
m_app.set( 'view engine', 'jade');

//for setting (use)
m_app.use( m_cors() );
m_app.use( m_logger('dev') );
m_app.use( m_methodOverride() );
m_app.use( m_multer() );
m_app.use( '/static', m_express.static('public') );
m_app.use( m_express.static('public') );
m_app.use( m_bodyParser.json() );
m_app.use( m_bodyParser.urlencoded({ extended: false }) );

if ('development' == m_app.get('env')) {
	m_app.use(m_errorHandler());
}

//pages routes
m_app.get( '/', m_routePage.index );
m_app.get( '/index', m_routePage.index );
m_app.get( '/vegebot', m_routePage.vegebot );
m_app.get( '/order', m_routePage.order );

m_app.listen( m_app.get('port'), function(){
	console.log('Example app listening on port ' + m_app.get('port') + '!');
});