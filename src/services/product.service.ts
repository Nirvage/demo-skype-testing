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

        let i = 0;
        let productsF = products.filter((product) => {
            
            let matched: boolean;
            matched = selectedAttributes.every((selectedAttribute: any) => {
                return product.attributes.some((productAttribute: any) => {
                    return selectedAttribute.att_id == productAttribute.id && selectedAttribute.values.some((value: string) => {
                        return productAttribute.values.includes(value)
                    })
                })
            });
            if (matched) {
                console.log(product);
                i++;
            }
            return matched;
        });
        console.log(`${i} produits ont matchés.`);
        return productsF;
    }

}