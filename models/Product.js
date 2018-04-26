export class Product {
    constructor() {
        console.log('Product module');
    }

    walk() {
        return "I walk: " + this.name;
    }

    write5() {
        const arr1 = [1,2];
        const arr2 = [2,3];
        let arrMerged = [...arr1, ...arr2]
        console.log(arrMerged[3]);
    };
}