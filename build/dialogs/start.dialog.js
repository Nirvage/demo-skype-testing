"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var builder = require("botbuilder");
var apiai = require("apiai");
var uuid = require('uuid/v1');
var StartDialog = (function () {
    function StartDialog(session, result, next) {
        this.session = session;
        this.result = result || null;
        this.next = next || null;
    }
    StartDialog.prototype.promptMenu = function () {
        builder.Prompts.text(this.session, "Que puis-je faire pour vous ?");
    };
    StartDialog.prototype.userResponse = function () {
        var _this = this;
        var app = apiai(process.env.APIAI_CLIENT_ACCESS_TOKEN || "");
        app.textRequest(this.result.response, {
            sessionId: uuid()
        })
            .on('response', function (resp) {
            switch (resp.result.action) {
                case "askingGuide":
                    {
                        var section = resp.result.parameters['guide-category'];
                        _this.session.beginDialog('/guide', section);
                    }
                    break;
                case "searchProduct":
                    {
                        // TODO
                    }
                    break;
                default:
                    _this.session.endDialog('Désolé, je ne comprends pas vraiment ce que vous me demandez...');
            }
        })
            .on('error', function (err) {
            console.error(err);
            _this.session.endConversation('Oups, on dirait qu\'il y a eu un petit problème... (startdialog)');
        })
            .end();
    };
    return StartDialog;
}());
exports.StartDialog = StartDialog;
