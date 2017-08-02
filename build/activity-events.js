"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var builder = require("botbuilder");
var ActivityEvents = (function () {
    function ActivityEvents() {
    }
    ActivityEvents.prototype.conversationUpdate = function (message, bot) {
        // Check for group conversations
        if (message.address.conversation.isGroup) {
            // Send a hello message when bot is added
            if (message.membersAdded) {
                message.membersAdded.forEach(function (identity) {
                    if (identity.id === message.address.bot.id) {
                        var reply = new builder.Message()
                            .address(message.address)
                            .text("Hello everyone!");
                        bot.send(reply);
                    }
                });
            }
            // Send a goodbye message when bot is removed
            if (message.membersRemoved) {
                message.membersRemoved.forEach(function (identity) {
                    if (identity.id === message.address.bot.id) {
                        var reply = new builder.Message()
                            .address(message.address)
                            .text("Goodbye");
                        bot.send(reply);
                    }
                });
            }
        }
    };
    ActivityEvents.prototype.contactRelationUpdate = function (message, bot) {
        if (message.action === 'add') {
            var name_1 = message.user ? message.user.name : null;
            var reply = new builder.Message()
                .address(message.address)
                .text("Hello %s... Thanks for adding me. Say 'hello' to see some great demos.", name_1 || 'there');
            bot.send(reply);
        }
        else {
            // delete their data
        }
    };
    ActivityEvents.prototype.deleteUserData = function (message, bot) {
        // User asked to delete their data
    };
    return ActivityEvents;
}());
exports.ActivityEvents = ActivityEvents;
