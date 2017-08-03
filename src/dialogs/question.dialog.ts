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

        for(let criterion in this.session.userData.guide.filters[this.session.userData.currentFilter].criterions){

            answers.push(
                builder.CardAction.postBack(
                    this.session, 
                    criterion, 
                    this.session.userData.guide.filters[this.session.userData.currentFilter].criterions[criterion].name
                )
            );

            select.push(criterion);
        }

        let msg = new builder.Message(this.session)
            .textFormat(builder.TextFormat.xml)
            .attachments([
                new builder.HeroCard(this.session)
                    .text(this.session.userData.guide.filters[this.session.userData.currentFilter].name)
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

        if (this.result.response.index < this.session.userData.guide.filters.length && this.result.response.index >= 0){

            this.session.userData.criterions.push(
                this.session.userData.guide.filters[this.session.userData.currentFilter].criterions[this.result.response.index]
            );

            this.session.userData.currentFilter ++;
        } else {
            this.session.send('Votre réponse ne correspond à aucun des choix proposés, veuillez sélectionner une réponse valide.');
        }

        if( this.session.userData.currentFilter < this.session.userData.guide.filters.length ){
            this.session.replaceDialog('/question');
        } else {
            this.session.send('vous avez répondu a toute les questions.').endDialog();
        }
    }

}