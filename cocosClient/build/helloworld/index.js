require('libs/weapp-adapter/index');
var Parser = require('libs/xmldom/dom-parser');
window.DOMParser = Parser.DOMParser;
require('libs/wx-downloader.js');
wxDownloader.REMOTE_SERVER_ROOT = "";
wxDownloader.SUBCONTEXT_ROOT = "helloworld";
require('src/settings.8f70a');
require('main.91835');
require('libs/sub-context-adapter');