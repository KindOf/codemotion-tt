export class InvoiceItem {
  constructor(
    public invoice_id: number,
    public product_id: number,
    public quantity: number = 1,
    readonly id?: number
  ) { }
}
