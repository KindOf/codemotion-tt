export class InvoiceItem {
  constructor(
    public product_id: number,
    public quantity: number = 1,
    public invoice_id?: number,
    readonly id?: number
  ) { }
}
