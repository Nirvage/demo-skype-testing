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

        console.log('selected attributes : ');
        console.log(selectedAttributes);

        let i = 0;
        let productsF = products.filter((product) => {
            let matched: boolean;
            matched = selectedAttributes.every((attribute: any) => {
                return product.attributes.some((productAttribute: any) => {
                    return attribute.att_id === productAttribute.id && attribute.values.some((value: any) => {
                        return productAttribute.values.includes(value)
                    })
                })
            });
            if (matched) {
                i++;
                console.log(product);
            }
            return matched;
        });
        console.log(`${i} produits ont matchés.`);
        return productsF;
    }

}