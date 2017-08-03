import * as restify from 'restify';
import * as builder from 'botbuilder';

export class QuestionDialog {

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
        let select: string[] = [];

        for(let criterion in this.session.userData.guide.filters[this.session.userData.filterIndex].criterions){

            answers.push(
                builder.CardAction.postBack(
                    this.session, 
                    criterion, 
                    this.session.userData.guide.filters[this.session.userData.filterIndex].criterions[criterion].name
                )
            );

            select.push(criterion);
        }

        let msg = new builder.Message(this.session)
            .textFormat(builder.TextFormat.xml)
            .attachments([
                new builder.HeroCard(this.session)
                    .text(this.session.userData.guide.filters[this.session.userData.filterIndex].name)
                    .buttons(answers)
            ]);

        // let msg = new builder.Message(this.session)
        //     .text(this.result.guide.filters[this.result.filterIndex].name)
        //     .suggestedActions(
        //         builder.SuggestedActions.create(
        //                 this.session, 
        //                 answers
        //             ));

        builder.Prompts.choice(this.session, msg, select);
    }

    getResponse(){
        console.log(this.session.userData);
        this.session.endDialog('oui vous avez choisi : ' + this.result.response.index);
    }

}