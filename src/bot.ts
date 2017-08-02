import * as restify from 'restify';
import * as builder from 'botbuilder';
import { ActivityEvents } from "./activity-events";
import { RootDialog } from "./dialogs/root.dialog";
import { StartDialog } from "./dialogs/start.dialog";
import { GuideDialog } from "./dialogs/guide.dialog";

export class Bot {

    //=========================================================
    // Bot Setup
    //=========================================================

    private server: restify.Server;
    private connector: builder.ChatConnector;
    private bot: builder.UniversalBot;

    constructor(){
        this.setupRestifyServer();
        this.createChatBot();
        this.mapActivityEvents();
        
        this.bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));
        this.bot.endConversationAction('goodbye', 'Goodbye :)', { matches: /^goodbye/i });
        // this.bot.beginDialogAction('help', '/help', { matches: /^help/i });
        this.bot.dialog('/', [(session, args, next) => new RootDialog(session, args, next).sendGreetingShowHelp(),
                              (session, result) => new RootDialog(session, result).displayStarter(),
                               (session, result) => new RootDialog(session, result).alwaysSayGoodbye()]);

        this.bot.dialog('/start', [
            (session) => new StartDialog(session).promptMenu(),
            (session, result) => new StartDialog(session, result).userResponse()
        ]);
        this.bot.dialog('/guide', [
            (session, args, next) => new GuideDialog(session, args, next).getGuide()
        ])
    }

    setupRestifyServer(){
        this.server = restify.createServer();
        this.server.listen(process.env.port || process.env.PORT || 3978, () => {
            console.log('%s listening to %s', this.server.name, this.server.url);
        });
    }

    createChatBot(){
        this.connector = new builder.ChatConnector({
            appId: process.env.MICROSOFT_APP_ID,
            appPassword: process.env.MICROSOFT_APP_PASSWORD
        });

        this.bot = new builder.UniversalBot(this.connector);
        this.server.post('/api/messages', this.connector.listen());
    }

    mapActivityEvents(){
        this.bot.on('conversationUpdate', (message) => new ActivityEvents().conversationUpdate(message, this.bot));
        this.bot.on('contactRelationUpdate', (message) => new ActivityEvents().contactRelationUpdate(message, this.bot));
        this.bot.on('deleteUserData', (message) => new ActivityEvents().deleteUserData(message, this.bot));
    }

    

}