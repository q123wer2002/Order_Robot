'use strict'

//library
var m_express = require('express');
var m_app = m_express();
var m_router = m_express.Router();
var m_MobileDetect = require('mobile-detect');

//local var
var m_szHtmlPath = __dirname + "/../html";
var m_path = require('path');

function fnGetDeviceName( request ){
	var md = new m_MobileDetect(request.headers['user-agent']);
	return (md.mobile() == null) ? "DESKTOP" : "MOBILE";
}

//route
m_app.templateTop = function(req,res){
	var szPath = m_path.join(m_szHtmlPath + '/' + fnGetDeviceName(req) + '/templates/top.html');
	res.sendFile( szPath );
}
m_app.templateFooter = function(req,res){
	var szPath = m_path.join(m_szHtmlPath + '/' + fnGetDeviceName(req) + '/templates/footer.html');
	res.sendFile( szPath );
}
m_app.index = function(req,res){
	var szPath = m_path.join(m_szHtmlPath + '/' + fnGetDeviceName(req) + '/index.html');
	res.sendFile( szPath );
}
m_app.vegebot = function(req,res){
	var szPath = m_path.join(m_szHtmlPath + '/' + fnGetDeviceName(req) + '/vegebot.html');
	res.sendFile( szPath );
}

module.exports = m_app;