import * as restify from 'restify';
import * as builder from 'botbuilder';

export class ConversationDialog {

    private session: builder.Session;
    private result: any;
    private next: any;

    constructor(session: builder.Session, result?: any, next?: any) {
        this.session = session;
        this.result = result || null;
        this.next = next || null;
    }

    doQuestion(){
        console.log(this.result);
        this.session.send(this.result.filters[0].name);
    }

}