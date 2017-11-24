import { InvoiceService } from './../invoice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoices;
  showModal = false;

  constructor(
    private invoiceService: InvoiceService
  ) { }

  ngOnInit() {
    this.invoiceService.getInvoices()
      .subscribe(invoices => {
        this.invoices = invoices;
      });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
