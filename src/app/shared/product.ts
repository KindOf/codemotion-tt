export class Product {
  constructor(
    public name: string,
    public price: number,
    readonly id?: number
  ) { }
}
