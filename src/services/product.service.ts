var Client = require('node-rest-client').Client;

export class ProductService {

    constructor() {
    }

    getProducts(categoryId: string): Promise<any> {
        let client = new Client();
        const get = () => new Promise(resolve => client.get(process.env.API_GUIDE_URL + '/products/filter?categoryId=' + encodeURI(categoryId), {}, resolve));

        return get();
    }

    filterProducts(products: any[], criterions: any[]): any[] {
        let selectedAttributes: any[] = [];
        criterions.forEach((criterion) => {
            selectedAttributes = selectedAttributes.concat(criterion.selectedAttribute);
        });

        let productsF = products.filter((product) => {
            return selectedAttributes.every((attribute: any) => {
                return product.attributes.some((productAttribute: any) => {
                    return attribute.att_id === productAttribute.id && attribute.values.some((value: any) => {
                        return productAttribute.values.includes(value)
                    })
                })
            })
        });
        return productsF;
    }

}