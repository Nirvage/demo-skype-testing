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

        let productsF = products.filter((product) => {
            console.log('Product : ');
            console.log(product);
            return selectedAttributes.every((attribute: any) => {
                console.log('> selected attribute :');
                console.log(attribute);
                return product.attributes.some((productAttribute: any) => {
                    console.log('  > product attribute');
                    console.log(productAttribute);
                    return attribute.att_id === productAttribute.id && attribute.values.some((value: any) => {
                        console.log('    > value');
                        console.log(value);
                        if (productAttribute.values.includes(value)) {
                            console.log('      > Le produit contient cette valeur');
                        } else {
                            console.log('      > Le produit ne contient pas cette valeur');
                        }
                        return productAttribute.values.includes(value)
                    })
                })
            })
        });
        return productsF;
    }

}