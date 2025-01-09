export class QuantifiedIngredient {
    ingredient: number;
    quantity: number;

    constructor(data: Partial<QuantifiedIngredient>) {
        Object.assign(this, data);
    }
}
