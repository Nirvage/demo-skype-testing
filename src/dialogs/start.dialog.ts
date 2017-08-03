import * as restify from 'restify';
import * as builder from 'botbuilder';
import * as apiai from 'apiai';
var uuid = require('uuid/v1');

export class StartDialog {

    private session: builder.Session;
    private result: any;
    private next: any;

    constructor(session: builder.Session, result?: any, next?: any) {
        this.session = session;
        this.result = result || null;
        this.next = next || null;
    }

    promptMenu(){
        builder.Prompts.text(this.session, "Que puis-je faire pour vous ?");
    }

    userResponse(){
        let app = apiai(process.env.APIAI_CLIENT_ACCESS_TOKEN || "");

        app.textRequest(this.result.response, { 
            sessionId: uuid()
        })
        .on('response', (resp: any) => {

            switch(resp.result.action) {

                case "askingGuide": {
                    let section: string = resp.result.parameters['guide-catagory'];
                    this.session.beginDialog('/guide', section);
                }
                break;

                case "searchProduct": {
                    // TODO
                }
                break;

                default:
                    this.session.endDialog('Désolé, je ne comprends pas vraiment ce que vous me demandez...')
            }

        })
        .on('error', (err: Error) => {
            console.error(err);
            this.session.endConversation('Oups, on dirait qu\'il y a eu un petit problème...');
        })
        .end();

    }
}