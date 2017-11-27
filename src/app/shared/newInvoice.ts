import { Product } from './product';
import { Invoice } from './invoice';
import { InvoiceItem } from './invoice-item';
import { Customer } from './customer';

export class NewInvoice extends Invoice {
  invoiceItems: InvoiceItem[] = [];
  products: Product[] = [];
  customer: Customer;
}
