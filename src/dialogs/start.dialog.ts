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
        let section: string;

        let app = apiai(process.env.APIAI_CLIENT_ACCESS_TOKEN || "");

        app.textRequest(this.result.response, { 
            sessionId: uuid()
        })
        .on('response', (resp) => console.log('rESPONSE :\n' + resp.result) )
        .on('error', (err) => console.log(err))
        .end();

        section = '004007000';

        this.session.beginDialog('/guide', section);

    }
}