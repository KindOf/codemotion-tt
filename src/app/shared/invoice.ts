export class Invoice {
  constructor(
    public customer_id: number,
    public discount: number = 0,
    public total: number = 0,
    readonly id?: number,
  ) { }
}
