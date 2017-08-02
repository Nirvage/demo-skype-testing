"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var builder = require("botbuilder");
var RootDialog = (function () {
    function RootDialog(session, result, next) {
        this.session = session;
        this.result = result || null;
        this.next = next || null;
    }
    RootDialog.prototype.sendGreetingShowHelp = function () {
        var card = new builder.HeroCard(this.session)
            .text("Bonjour, je suis le bot lyreco.")
            .images([
            builder.CardImage.create(this.session, "https://s3-eu-west-1.amazonaws.com/th-prod/booth/0001/17/d055d3ba7fbba4a824379e75c56f88f3c97ae058.jpeg")
        ]);
        var msg = new builder.Message(this.session).attachments([card]);
        this.session.send(msg);
        this.next();
    };
    RootDialog.prototype.displayStarter = function () {
        this.session.beginDialog('/start');
    };
    RootDialog.prototype.alwaysSayGoodbye = function () {
        this.session.send("Ok... See you later!");
    };
    return RootDialog;
}());
exports.RootDialog = RootDialog;
