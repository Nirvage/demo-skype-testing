import * as restify from 'restify';
import * as builder from 'botbuilder';
import {GuideService} from '../services/guide.service';

export class GuideDialog {

    private session: builder.Session;
    private result: any;
    private next: any;
    private guideService: GuideService;

    constructor(session: builder.Session, result?: any, next?: any) {
        this.session = session;
        this.result = result || null;
        this.next = next || null;
        this.guideService = new GuideService();
    }

    getGuide(){

        this.guideService.getGuides(this.result)
        .then((data: any[]) => {

            if(data.length>0) {
                this.session.send("J'ai trouvé ce guide pour vous aider a choisir : " + data[0].name)
                
                this.session.userData = {guide: data[0], currentFilter: 0, criterions: []};
                // Dailogue guide
                this.session.beginDialog('/question');
            } else {
                this.session.endDialog('Je n\'ai pas trouvé de guide concernant votre demande...');
            }
        })
        .catch((err: Error) => {
            console.error(err);
            this.session.endConversation('Oups, on dirait qu\'il y a eu un petit problème... (guidedialog)');
        });
    }
}