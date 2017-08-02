"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var builder = require("botbuilder");
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
        // let app = apiai(process.env.APIAI_CLIENT_ACCESS_TOKEN || "");
        // console.log(this.result);
        // app.textRequest(this.result.response, { 
        //     sessionId: '110e8400-e29b-11d4-a716-446655440000'
        // })
        // .on('response', (resp) => console.log(resp)).end();
        var section = '004007000';
        this.session.beginDialog('/guide', section);
    };
    return StartDialog;
}());
exports.StartDialog = StartDialog;
