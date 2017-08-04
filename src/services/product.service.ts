var Client = require('node-rest-client').Client;

export class ProductService {

    constructor() {
    }

    getProducts(categoryId: string): Promise<any> {
        let client = new Client();
        const get = () => new Promise(resolve => client.get(process.env.API_GUIDE_URL + '/products/filter?categoryId=' + encodeURI(categoryId), {}, resolve));

        return get();
    }

    filterProducts(categoryId: string, criterions: any[]): Promise<any> {
        console.log('1');
        return this.getProducts(categoryId)
            .then((products: any[]) => {
                console.log('2');
                let selectedAttributes: any[] = [];
                criterions.forEach((criterion) => {
                    selectedAttributes = selectedAttributes.concat(criterion.selectedAttribute);
                });
                console.log('3');
                let productsF = products.filter((product) => {
                    return selectedAttributes.every( (attribute: any) => {
                        return product.attributes.some( (productAttribute: any) => {
                            return attribute.att_id === productAttribute.id && attribute.values.some((value: any) => {
                                return productAttribute.values.includes(value)
                            })
                        })
                    })
                });
                console.log('4');
                return productsF;
            });
    }

}