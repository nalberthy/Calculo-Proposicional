

var antlr4 = require('../../antlr4/index'); 
var GramLogicLexer = require('../parser_entrada/GramLogicLexer'); 
var GramLogicParser = require('../parser_entrada/GramLogicParser'); 
var GramLogicListener = require('../parser_entrada/GramLogicListener').GramLogicListener;
var error = require('../../antlr4/error/ErrorListener'); 

HtmlGramLogicListener = function () { 
    GramLogicListener.call(this);
    this.xmlDoc = null;
    return this; 
    } 

HtmlGramLogicListener.prototype = Object.create(GramLogicListener.prototype);

HtmlGramLogicListener.prototype.constructor = HtmlGramLogicListener; 


HtmlGramLogicListener.prototype.enterForm = function (ctx) { 


}; 

HtmlGramLogicListener.prototype.exitForm = function (ctx) { 
   
}; 

HtmlGramLogicListener.prototype.enterArg = function (ctx) {

}; 

HtmlGramLogicListener.prototype.exitArg = function (ctx) {
    
   
}; 

exports.HtmlGramLogicListener = HtmlGramLogicListener;  