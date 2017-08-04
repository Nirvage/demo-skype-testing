var Client = require('node-rest-client').Client;

export class ProductService {

    constructor() {
    }

    getProducts(categoryId: string): Promise<any>{
        let client = new Client();
        const get = () => new Promise(resolve => client.get(process.env.API_GUIDE_URL+'/products/filter?categoryId='+ encodeURI(categoryId), {}, resolve));

        return get();
    }

    filterProducts(categoryId: string, criterions: any[]): Promise<any> {
        return this.getProducts(categoryId)
        .then((products: any[]) => {

            let selectedAttributes: any[] = [];
            criterions.forEach((criterion) => {
                selectedAttributes = selectedAttributes.concat(criterion.selectedAttribute);
            });

            let productsF = products.filter((product) => {
                return true;
                // return selectedAttributes.every( (attribute: any) => {
                //     return product.attributes.some( (productAttribute: any) => {
                //         console.log(productAttribute);
                //         return attribute.att_id === productAttribute.id && attribute.values.some((value: any) => {
                //             return productAttribute.values.includes(value)
                //         })
                //     })
                // })
            });

            return productsF;
        });
    }

}