import * as http from 'http';
var Client = require('node-rest-client').Client;

export class GuideService {

    private optionsProxy = {
        proxy: {
            host: process.env.PROXY_IP,
            port: process.env.PROXY_PORT,
            user: process.env.PROXY_USERNAME,
            password: process.env.PROXY_PASSWORD,
            tunnel: false
        }
    };

    constructor() {
    }

    getGuides(section: string): Promise<any>{

        let client = new Client();

        const get = () => new Promise(resolve => client.get(process.env.API_GUIDE_URL+'/guides/filter?section='+ encodeURI(section), {}, resolve));

        return get();
               
    }

}