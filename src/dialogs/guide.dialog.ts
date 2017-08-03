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
        .then((data) => {
            this.session.send("J'ai trouvé ce guide pour vous aider a choisir : " + data[0].name)

            // Dailogue guide
        })
        .catch(err => console.log(err));
    }
}