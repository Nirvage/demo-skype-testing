import * as restify from 'restify';
import * as builder from 'botbuilder';

export class RootDialog {

    private session: builder.Session;
    private result: any;
    private next: any;

    constructor(session: builder.Session, result?: any, next?: any) {
        this.session = session;
        this.result = result || null;
        this.next = next || null;
    }

    sendGreetingShowHelp(){
        let card = new builder.HeroCard(this.session)
            .subtitle("Bonjour, je suis le bot lyreco.")
            .images([
                 builder.CardImage.create(this.session, "https://s3-eu-west-1.amazonaws.com/th-prod/booth/0001/17/d055d3ba7fbba4a824379e75c56f88f3c97ae058.jpeg")
            ]);
        let msg = new builder.Message(this.session).attachments([card]);
        this.session.send(msg);
        this.next();
    }

    displayStarter(){
       this.session.beginDialog('/start');
    }

    alwaysSayGoodbye(){
        this.session.send("J'espère vous avoir rendu service, à la prochaine.");
    }

}