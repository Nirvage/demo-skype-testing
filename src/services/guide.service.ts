var Client = require('node-rest-client').Client;

export class GuideService {

    constructor() {
    }

    getGuides(section: string): Promise<any>{
        let client = new Client();
        const get = () => new Promise(resolve => client.get(process.env.API_GUIDE_URL+'/guides/filter?section='+ encodeURI(section), {}, resolve));

        return get();
    }

}