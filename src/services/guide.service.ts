import * as http from 'http';
import * as promise from 'promise';

export class GuideService {


    constructor() {
    }

    getGuides(){
        return new promise(
            (resolve: any) => {
                // http.get(process.env.API_GUIDE_URL + '/guides').on("data", (data) => {
                //     console.log(data)
                //     resolve(data);
                // }).end();
               
               http.request({
                   hostname: process.env.API_GUIDE_URL,
                   path: '/guides',
                   method: 'GET'
               })
               .on('data', (chunk: any) => {
                   resolve(chunk);
               })
               .end();
            }
        )
               
    }

}