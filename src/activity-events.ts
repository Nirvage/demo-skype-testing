import * as restify from 'restify';
import * as builder from 'botbuilder';

export class ActivityEvents {

    conversationUpdate(message: any, bot: builder.UniversalBot){
        // Check for group conversations
        if (message.address.conversation.isGroup) {
            // Send a hello message when bot is added
            if (message.membersAdded) {
                message.membersAdded.forEach((identity: any) => {
                    if (identity.id === message.address.bot.id) {
                        let reply = new builder.Message()
                                .address(message.address)
                                .text("Hello everyone!");
                        bot.send(reply);
                    }
                });
            }

            // Send a goodbye message when bot is removed
            if (message.membersRemoved) {
                message.membersRemoved.forEach((identity: any) => {
                    if (identity.id === message.address.bot.id) {
                        let reply = new builder.Message()
                            .address(message.address)
                            .text("Goodbye");
                        bot.send(reply);
                    }
                });
            }
        }
    }

    contactRelationUpdate(message: any, bot: builder.UniversalBot){
        if (message.action === 'add') {
            let name = message.user ? message.user.name : null;
            let reply = new builder.Message()
                    .address(message.address)
                    .text("Hello %s... Thanks for adding me. Say 'hello' to see some great demos.", name || 'there');
            bot.send(reply);
        } else {
            // delete their data
        }
    }

    deleteUserData(message: any, bot: builder.UniversalBot){
        // User asked to delete their data
    }


}