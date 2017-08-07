import * as restify from 'restify';
import * as builder from 'botbuilder';
import { ProductService } from "../services/product.service";

export class QuestionDialog {

    private productService: ProductService;

    private session: builder.Session;
    private result: any;
    private next: any;

    constructor(session: builder.Session, result?: any, next?: any) {
        this.session = session;
        this.result = result || null;
        this.next = next || null;

        this.productService = new ProductService();
    }

    doQuestion(){
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
                    .text(`#### ${this.session.userData.guide.filters[this.session.userData.currentFilter].name}`)
                    .buttons(answers)
            ]);

        builder.Prompts.choice(this.session, msg, select);
    }

    getResponse(){
        console.log(this.result.response);
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
            this.next();
        }
    }

    displayResults(){
        let categoryId: string = this.session.userData.guide.categoryId;
        let criterions: any[] = this.session.userData.criterions;

        this.productService.getProducts(categoryId)
        .then((products) => {
            return this.productService.filterProducts(products, criterions)
        })
        .then((products: any[]) => {

            if (products.length>0) {

                let cards: builder.HeroCard[] = [];
                cards = products.map((product: any) => {
                    let codeProductString = "" + product.code;
                    let pad = "000000000000000000";
                    let codeProductUrl = pad.substring(0, pad.length - codeProductString.length) + codeProductString;
            
                    let buttonUrl = "https://www.lyreco.com/webshop/FRFR/" + product.name.trim().replace(/ /g, '-')
                        .replace(/[+]/g, '')
                        .toLowerCase() + "-product-" + codeProductUrl + ".html";

                    return new builder.HeroCard(this.session)
                        .title(product.name)
                        .images([
                            builder.CardImage.create(this.session, `http://assets.lyreco.com/is/image/lyrecows/2016-${product.code}?fit=constrain,1&wid=250&hei=250&fmt=jpg&locale=FR_fr`)
                        ])
                        .buttons([
                            builder.CardAction.openUrl(this.session, buttonUrl, "Aller à")
                        ]);
                });
                let msg = new builder.Message(this.session)
                    .textFormat(builder.TextFormat.xml)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(cards);

                this.session.send("Voici les résultats que j'ai trouvé pour vos critères de recherche : ( " + products.length + " )")
                    .send(msg)

                let card = new builder.HeroCard(this.session)
                    .text('#### Voulez-vous prendre rendez-vous avec un membre du service client ?')
                    .buttons([
                        builder.CardAction.postBack(this.session, 'oui', 'Oui'),
                        builder.CardAction.postBack(this.session, 'non', 'Non')
                    ]);

                let confirmMessage = new builder.Message(this.session)
                    .textFormat(builder.TextFormat.xml)
                    .attachments([card])
                
                builder.Prompts.choice(this.session, confirmMessage, ['oui', 'non']);
            } else {
                this.session.endDialog("Aucun produit ne correspond à vos critères de recherche.");
            }
        });
    }

    visitResult(){
        if (this.result.response.entity == 'oui'){
            this.session.endDialog('Vous serez recontacté sous peu.');
        }else{
            this.session.endDialog();
        }
    }

}