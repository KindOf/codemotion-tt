import { ProductService } from './../../product.service';
import { InvoiceService } from './../../invoice.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.css']
})
export class InvoiceItemComponent implements OnInit {
  @Input() invoice;
  invoiceItems;

  constructor(
    private invoiceService: InvoiceService
  ) { }

  ngOnInit() {
    this.invoiceService.getInvoiceItems(this.invoice.id)
      .subscribe(invoiceItems => {
        this.invoiceItems = invoiceItems;
      });
  }

}
