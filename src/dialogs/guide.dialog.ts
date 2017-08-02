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
        this.guideService.getGuides().then(guides => console.log(guides));
    }
}