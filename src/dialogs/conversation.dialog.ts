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

        let answers: any[] = [];

        for(let criterion in this.result.guide.filters[this.result.filterIndex].criterions){

            answers.push(
                builder.CardAction.messageBack(
                    this.session, 
                    criterion, 
                    this.result.guide.filters[this.result.filterIndex].criterions[criterion].name
                )
            );
        }

        let msg = new builder.Message(this.session)
            .text(this.result.guide.filters[this.result.filterIndex].name)
            .suggestedActions(
                builder.SuggestedActions.create(
                        this.session, 
                        answers
                    ));

        this.session.send(msg);
    }

}