"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var restify = require("restify");
var builder = require("botbuilder");
var activity_events_1 = require("./activity-events");
var root_dialog_1 = require("./dialogs/root.dialog");
var start_dialog_1 = require("./dialogs/start.dialog");
var guide_dialog_1 = require("./dialogs/guide.dialog");
var conversation_dialog_1 = require("./dialogs/conversation.dialog");
var Bot = (function () {
    function Bot() {
        this.setupRestifyServer();
        this.createChatBot();
        this.mapActivityEvents();
        this.bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));
        this.bot.endConversationAction('goodbye', 'Goodbye :)', { matches: /^goodbye/i });
        // this.bot.beginDialogAction('help', '/help', { matches: /^help/i });
        this.bot.dialog('/', [function (session, args, next) { return new root_dialog_1.RootDialog(session, args, next).sendGreetingShowHelp(); },
            function (session, result) { return new root_dialog_1.RootDialog(session, result).displayStarter(); },
            function (session, result) { return new root_dialog_1.RootDialog(session, result).alwaysSayGoodbye(); }]);
        this.bot.dialog('/start', [
            function (session) { return new start_dialog_1.StartDialog(session).promptMenu(); },
            function (session, result) { return new start_dialog_1.StartDialog(session, result).userResponse(); }
        ]);
        this.bot.dialog('/guide', [
            function (session, args, next) { return new guide_dialog_1.GuideDialog(session, args, next).getGuide(); }
        ]);
        this.bot.dialog('/conv', [
            function (session, result) { return new conversation_dialog_1.ConversationDialog(session, result).doQuestion(); }
        ]);
    }
    Bot.prototype.setupRestifyServer = function () {
        var _this = this;
        this.server = restify.createServer();
        this.server.listen(process.env.port || process.env.PORT || 3978, function () {
            console.log('%s listening to %s', _this.server.name, _this.server.url);
        });
    };
    Bot.prototype.createChatBot = function () {
        this.connector = new builder.ChatConnector({
            appId: process.env.MICROSOFT_APP_ID,
            appPassword: process.env.MICROSOFT_APP_PASSWORD
        });
        this.bot = new builder.UniversalBot(this.connector);
        this.server.post('/api/messages', this.connector.listen());
    };
    Bot.prototype.mapActivityEvents = function () {
        var _this = this;
        this.bot.on('conversationUpdate', function (message) { return new activity_events_1.ActivityEvents().conversationUpdate(message, _this.bot); });
        this.bot.on('contactRelationUpdate', function (message) { return new activity_events_1.ActivityEvents().contactRelationUpdate(message, _this.bot); });
        this.bot.on('deleteUserData', function (message) { return new activity_events_1.ActivityEvents().deleteUserData(message, _this.bot); });
    };
    return Bot;
}());
exports.Bot = Bot;
