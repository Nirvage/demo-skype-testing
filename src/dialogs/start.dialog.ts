import * as restify from 'restify';
import * as builder from 'botbuilder';
import * as apiai from 'apiai';

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
            sessionId: '110e8400-e29b-11d4-a716-446655440000'
        })
        .on('response', (resp) => null )
        .on('error', (err) => console.log(app))
        .end();

        section = '004007000';

        this.session.beginDialog('/guide', section);

    }
}