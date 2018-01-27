'use strict'

//library
var m_express = require('express');
var m_app = m_express();
var m_router = m_express.Router();
var m_MobileDetect = require('mobile-detect');
var m_path = require('path');

//local var
var m_szHtmlPath = __dirname + "/../html";
m_app.set( 'views', m_szHtmlPath );

function fnGetDeviceName( request ){
	var md = new m_MobileDetect(request.headers['user-agent']);
	return (md.mobile() == null) ? "DESKTOP" : "MOBILE";
}

//route
m_app.index = function(req,res){
	res.render( fnGetDeviceName( req ) + '_index', {title:"首頁"} );
}
m_app.vegebot = function(req,res){
	res.render( fnGetDeviceName( req ) + '_vegebot', {title:"機器人"} );
}

module.exports = m_app;