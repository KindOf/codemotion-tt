export class Customer {
  constructor(
    public name: string,
    public address: string,
    public phone: string,
    readonly id?: number
  ) { }
}
